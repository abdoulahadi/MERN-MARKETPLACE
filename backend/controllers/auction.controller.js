const socket = require("../config/socket.config");
const db = require("../models");

const Auction = db.auctions;
const Bid = db.bids;

// Contrôleur pour créer une vente aux enchères
exports.createAuction = async (req, res) => {
  try {
    const { product, startingPrice, auctionEndTime } = req.body;
    const vendeur = req.params.idVendeur;

    const auction = new Auction({
      product,
      vendeur,
      startingPrice,
      auctionEndTime,
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
    const io = socket.getIO();
    io.emit("newPlaceBid", { message: "Une nouvelle enchère est optimisé!!" });
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

    const auction = await Auction.findOne({ _id: auctionId, vendeur });
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
    const auctions = await Auction.find({ status: "active" }).populate(
      "vendeur"
    ); // La méthode populate permet de récupérer les données de l'utilisateur vendeur associé à chaque vente aux enchères
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
