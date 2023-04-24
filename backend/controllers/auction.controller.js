const socket = require("../config/socket.config");
const db = require("../models");
const nodemailer = require('nodemailer');


const cron = require('node-cron');
const axios = require('axios');

const Auction = db.auctions;
const Bid = db.bids;

// Contrôleur pour créer une vente aux enchères
exports.createAuction = async (req, res) => {
  try {
    const { product, startingPrice, date,time } = req.body;
    const vendeur = req.params.idVendeur;
    // Récupérer les valeurs des champs date et time
    const auctionDate = new Date(date);
    const auctionTime = time.split(':');

    // Régler l'heure et la minute
    auctionDate.setHours(auctionTime[0], auctionTime[1]);

    const auction = new Auction({
      product,
      vendeur,
      startingPrice,
      auctionEndTime:auctionDate
    });

    await auction.save();
    const io = socket.getIO();
    io.emit("newAuction", {
      message: "Une nouvelle enchère est mise en ligne !!",
    });
    res.status(201).json(auction);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la création de la vente aux enchères.",
    });
  }
};

// Contrôleur pour faire une offre sur une vente aux enchères
exports.placeBid = async (req, res) => {
  try {
    const auctionId = req.params.auctionId;
    const { amount } = req.body;
    const user = req.params.userId;

    const auction = await Auction.findById(auctionId).populate("bids");
    if (!auction)
      return res
        .status(404)
        .json({ message: "La vente aux enchères demandée n'existe pas." });

    if (auction.status !== "active")
      return res.status(400).json({
        message: "La vente aux enchères est terminée ou a été annulée.",
      });

    if (amount <= auction.startingPrice)
      return res.status(400).json({
        message: "Le montant de l'offre doit être supérieur au prix de départ.",
      });
    console.log(auction.bids[auction.bids.length - 1]);
    if (
      auction.bids.length > 0 &&
      amount <= auction.bids[auction.bids.length - 1].amount
    ) {
      return res.status(400).json({
        message:
          "Le montant de l'offre doit être supérieur à toutes les offres précédentes.",
      });
    }

    const bid = new Bid({
      user,
      amount,
    });
    await bid.save();
    auction.bids.push(bid);
    await auction.save();
    const activeAuctions = await Auction.find({ status: "active" })
    const io = socket.getIO();
    io.emit("newPlaceBid", { message: "Une nouvelle enchère est mise à jour!!",activeAuctions});
    res.status(201).json(auction);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la création de l'offre.",
    });
  }
};

// Contrôleur pour annuler une vente aux enchères
exports.cancelAuction = async (req, res) => {
  try {
    const  auctionId  = req.params.auctionId;
    const vendeur = req.params.vendeurId; // L'ID de l'utilisateur connecté est stocké dans req.user

    const auction = await Auction.findOne({ id: auctionId, vendeur });
    if (!auction)
      return res.status(404).json({
        message:
          "La vente aux enchères demandée n'existe pas ou vous n'avez pas l'autorisation de l'annuler.",
      });

    if (auction.status !== "active")
      return res.status(400).json({
        message: "La vente aux enchères est déjà terminée ou a été annulée.",
      });

    auction.status = "cancelled";
    await auction.save();

    res.status(200).json(auction);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Une erreur est survenue lors de l'annulation de la vente aux enchères.",
    });
  }
};

// Contrôleur pour récupérer les ventes aux enchères actives
exports.getActiveAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find({ status: "active" })
    .populate({
      path: "product"
    })
    .populate({
      path: "vendeur"
    })
    .populate({
      path: "bids",
      populate:{
        path: "user",
        model:"user",
      }
    })
     // La méthode populate permet de récupérer les données de l'utilisateur vendeur associé à chaque vente aux enchères
    res.status(200).json(auctions);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des ventes aux enchères.",
    });
  }
};

// Contrôleur pour récupérer les détails d'une vente aux enchères spécifique
exports.getAuctionDetails = async (req, res) => {
  try {
    const auctionId = req.params.auctionId;
    console.log(auctionId)
    const auction = await Auction.findById(auctionId)
      .populate({
        path: "vendeur",
        populate: {
          path: "user",
          model: "user",
        },
      })
      .populate({
        path: "bids",
        populate: {
          path: "user",
          model: "user",
          select: "username",
        },
      }); // La méthode populate permet de récupérer les données de l'utilisateur vendeur et de chaque utilisateur ayant fait une offre associés à la vente aux enchères

    if (!auction)
      return res
        .status(404)
        .json({ message: "La vente aux enchères demandée n'existe pas." });

    res.status(200).json(auction);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des détails de la vente aux enchères.",
    });
  }
};


exports.updateAuctionsStatus = async () => {
  // Trouver toutes les enchères qui ont dépassé la date de fin
  const auctionsToUpdate = await Auction.find({
    status: 'active',
    auctionEndTime: { $lt: new Date() }
  }).populate({
    path: "bids",
    populate: {
      path: "user",
      model: "user"
    },
  }).populate({
    path: "vendeur",
    populate: {
      path: "user",
      model: "user"
    },
  });
  console.log(auctionsToUpdate)
  // Pour chaque enchère expirée, trouver le plus grand bid et son utilisateur associé
  for (const auction of auctionsToUpdate) {
    auction.status = 'expired';
    await auction.save();
    const highestBid = auction.bids[auction.bids.length - 1] || null;
    if (highestBid) {
      // Envoyer un email à l'utilisateur ayant placé le plus grand bid
      const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port:587,
        secure: false,
        tls:{
            ciphers:"SSLv3"
        },
        auth: {
          user: "mernmarketplace@outlook.com",
          pass: "ceciestunmotdepassedeteste@2023",
        },
      });
      const mailOptions = {
        from: 'mernmarketplace@outlook.com',
        to: highestBid.user.mail,
        subject: 'Votre enchère a été remportée',
        html:`<!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Vous avez remporté l'enchère</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #F5F5F5;
                padding: 20px;
              }
              h1 {
                color: #1E90FF;
                font-size: 24px;
              }
              p {
                font-size: 18px;
              }
              .highlight {
                color: #FF8C00;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <h1>Félicitations!</h1>
            <p>Vous avez remporté l'enchère pour <span class="highlight">${auction.id}</span> avec une offre de <span class="highlight">${highestBid.amount} $</span>.</p>
            <p>Nous espérons que vous apprécierez votre achat et n'hésitez pas à nous contacter si vous avez des questions.</p>
            <p>Le vendeur ${auction.vendeur.name} vous contactera dans les plus brefs délais.</p>
            <p>Cordialement,<br>L'équipe de notre site</p>
          </body>
        </html>
        `
      };
      await transporter.sendMail(mailOptions);

      // Envoyer un e-mail au vendeur
    const sellerMail = {
      from: 'mernmarketplace@outlook.com',
      to: auction.vendeur.user.mail,
      subject: `Votre enchère ${auction.title} a été remportée !`,
      html: `
        <p>Bonjour ${auction.vendeur.user.username},</p>
        <p>Votre enchère ${auction.id} a été remportée avec une offre de ${highestBid.amount} $.</p>
        <p>Veuillez contacter l'acheteur ${highestBid.user.mail} pour finaliser la vente.</p>
        <p>Merci d'avoir utilisé notre site.</p>
      `
    };
    await transporter.sendMail(sellerMail);
    }
  }
};



cron.schedule('* * * * *', async () => {
  try {
    const auctions = await Auction.find({ status: 'active' });
    for (const auction of auctions) {
      await axios.post(`http://localhost:8080/auctions/${auction.id}/update-status`);
    }
  } catch (error) {
    console.log(error);
  }
});


