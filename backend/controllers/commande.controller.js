const db = require("../models");
const Commande = db.commandes;
const Produit = db.products
const nodemailer = require("nodemailer");

// const User= db.users

// Créer une commande
exports.creerCommande = async (req, res) => {
  const { proprietaire } = req.body;
  let verifCommande = await Commande.findOne({ proprietaire: proprietaire, paiementEffectue: false });
  if (verifCommande) {
    return res.status(200).json({commande:verifCommande});
  }
  try {
    const commande = new Commande({
      // produits,
      proprietaire,
      prixTotal:0
    });

    await commande.save();

    res.status(201).json({ commande });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de la création de la commande' });
  }
};

// Ajouter un produit à une commande existante
exports.ajouterProduit = async (req, res) => {
  const { idProduit, idProprietaire } = req.body;

  try {
    const produit = await Produit.findById(idProduit);
    if (!produit) {
      return res.status(404).json({ message: 'Produit introuvable' });
    }

    // Vérifier si une commande existe déjà pour l'utilisateur
    // req.user._id="64208b32e6b4113831dbcc1e";
    // const id = await Commande.findById(idProprietaire);
    let commande = await Commande.findOne({ proprietaire: idProprietaire, paiementEffectue: false });

    if (!commande) {
      // Si aucune commande n'existe, en créer une nouvelle
      commande = new Commande({
        produits: [produit._id],
        proprietaire: idProprietaire,
        prixTotal: produit.price
      });

      await commande.save();
    } else {
      // Ajouter le produit à la commande existante
      commande.produits.push(produit._id);
      commande.prixTotal = parseFloat(commande.prixTotal) + produit.price;
      await commande.save();
    }

    res.json({ commande });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de l\'ajout du produit à la commande' });
  }
};


// Retirer un produit d'une commande existante
exports.retirerProduit = async (req, res) => {
  const { idCommande, idProduit, idProduitCommande } = req.body;

  try {
    const commande = await Commande.findById(idCommande);
    const produit = await Produit.findById(idProduit);

    if (!commande || !produit) {
      return res.status(404).json({ message: 'Commande ou produit introuvable' });
    }

    // commande.produits = commande.produits.filter((p) => p.toString() !== produit._id.toString());
    const index = commande.produits.findIndex((p) => p.toString() === idProduit.toString() && p.idProduitCommande === idProduitCommande);
    if (index === -1) {
      return res.status(404).json({ message: 'Produit introuvable dans la commande' });
    }

    commande.produits.splice(index, 1);
    commande.prixTotal = parseFloat(commande.prixTotal) - produit.price;    // Mettre à jour le prix total

     // Vérifier s'il ne reste plus aucun produit dans la commande
     if (commande.produits.length === 0) {
      await Commande.findByIdAndDelete(idCommande);
      return res.json({ message: 'Commande supprimée car elle ne contient plus aucun produit' });
    }

    await commande.save();

    res.json({ commande });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors du retrait du produit de la commande' });
  }
};
// Retirer des produits d'une même Id d'une commande existante
exports.retirerProduits = async (req, res) => {
  const { idCommande, idProduit, idProduitCommande } = req.body;

  try {
    const commande = await Commande.findById(idCommande);

    if (!commande) {
      return res.status(404).json({ message: 'Commande introuvable' });
    }

    const produitsAvantSuppression = commande.produits.length;

    commande.produits = commande.produits.filter((p) => p.toString() !== idProduit.toString() || p.idProduitCommande !== idProduitCommande);

    const produitsApresSuppression = commande.produits.length;

    if (produitsApresSuppression === produitsAvantSuppression) {
      return res.status(404).json({ message: 'Produit introuvable dans la commande' });
    }

    const produit = await Produit.findById(idProduit);

    if (produit) {
      commande.prixTotal = parseFloat(commande.prixTotal) - produit.price * (produitsAvantSuppression - produitsApresSuppression); // mettre à jour le prix total
    }

    // Vérifier s'il ne reste plus aucun produit dans la commande
    if (commande.produits.length === 0) {
      await Commande.findByIdAndDelete(idCommande);
      return res.json({ message: 'Commande supprimée car elle ne contient plus aucun produit',remove:true });
    }

    await commande.save();

    res.json({ commande });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors du retrait du produit de la commande' });
  }
};
// Effectuer le paiement d'une commande
exports.effectuerPaiement = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id);
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    this.sendEmailToVendeurs(req.params.id)
    commande.paiementEffectue = true;
    await commande.save();
    res.json(commande);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.sendEmailToVendeurs = async (commandeId) => {
  try {
    // Récupérer la commande avec les produits et leurs vendeurs
    const commande = await Commande.findById(commandeId)
      .populate({
        path: "produits",
        populate: {
          path: "vendeur",
          model: "vendeur",
          populate: {
            path: "user",
            model:"user",
            select:"mail"
          },
        },
      })
      .populate("proprietaire", "mail");
      
    if (!commande) {
      throw new Error("Commande non trouvée");
    }

    // Créer un dictionnaire pour stocker les produits de chaque vendeur
    const vendeursDict = {};
    commande.produits.forEach((produit) => {
      const vendeurId = produit.vendeur._id.toString();
      if (vendeursDict[vendeurId]) {
        vendeursDict[vendeurId].produits.push(produit);
      } else {
        vendeursDict[vendeurId] = {
          vendeurMail: produit.vendeur.user.mail,
          produits: [produit],
        };
      }
    });
    // Créer un transporteur nodemailer
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

    // Envoyer un email à chaque vendeur avec la liste de ses produits
    for (const vendeurId in vendeursDict) {
      const vendeur = vendeursDict[vendeurId];
      const produitsList = vendeur.produits
        .map((produit) => `- ${produit.name} (${produit.category}) | ${produit.price} $`)
        .join("\n");

      const mailOptions = {
        from: "mernmarketplace@outlook.com",
        to: vendeur.vendeurMail,
        subject: "Nouvelle commande à valider",
        // text: `Bonjour,\n\nVous avez des produits à valider pour la commande n°${commandeId}:\n\n${produitsList}\n\nVeuillez joindre ${commande.proprietaire.mail} pour valider sa commande et passer à la livraison.\n\nCordialement,\nL'équipe de la boutique MERN-MARKETPLACE.`,
        html:`<!DOCTYPE html>
        <html>
        <head>
          <title>Nouvelle commande à valider</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            /* Ajouter du style au corps de l'email */
            body {
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.5;
              color: #333333;
            }
            
            /* Ajouter du style au conteneur principal */
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f5f5f5;
              border: 1px solid #cccccc;
              border-radius: 5px;
            }
            
            /* Ajouter du style aux liens */
            a {
              color: #007bff;
              text-decoration: underline;
            }
            
            /* Ajouter du style à l'en-tête */
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            
            /* Ajouter du style au titre */
            .title {
              font-size: 24px;
              margin-bottom: 10px;
              color: #007bff;
            }
            
            /* Ajouter du style à la section de commande */
            .order-section {
              margin-bottom: 20px;
            }
            
            /* Ajouter du style à la liste de produits */
            .product-list {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            
            /* Ajouter du style à chaque élément de produit */
            .product-item {
              margin-bottom: 10px;
              border-bottom: 1px solid #cccccc;
              padding-bottom: 10px;
            }
            
            /* Ajouter du style au pied de page */
            .footer {
              text-align: center;
              font-size: 14px;
              color: #999999;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://cdn.pixabay.com/photo/2016/12/20/05/24/store-1919713_960_720.png" width="100px" height="100px" alt="Logo">
              <h1 class="title">Nouvelle commande à valider</h1>
            </div>
            <div class="order-section">
              <p>Bonjour,</p>
              <p>Vous avez des produits à valider sur la commande n°<strong>${commandeId}</strong>:</p>
              <ul class="product-list">
                ${produitsList}
              </ul>
              <p>Veuillez joindre <a href="mailto:${commande.proprietaire.mail}">${commande.proprietaire.mail}</a> pour valider sa commande et passer à la livraison.</p>
              <p>Cordialement,</p>
              <p>L'équipe de la boutique <a href="http://localhost:3000">MERN-MARKETPLACE</a>.</p>
            </div>
            <div class="footer">
              <p>Vous avez reçu cet e-mail car vous êtes membre de la boutique MERN-MARKETPLACE.</p>
              <p>Merci de ne pas répondre à cet e-mail.</p>
            </div>
          </div>
        </body>
        </html>
        `
      };

      await transporter.sendMail(mailOptions);
    }

    // Envoyer un email au propriétaire de la commande
    const proprietaireMail = commande.proprietaire.mail;

    const mailOptions = {
      from: "mernmarketplace@outlook.com",
      to: proprietaireMail,
      subject: "Confirmation de commande",
      // text: `Bonjour,\n\nNous avons bien reçu votre commande n°${commandeId}. Les vendeurs concernés ont été informés et vont vous joindre pour livrer leurs produits.\n\nCordialement,\nL'équipe de la boutique MERN-MARKETPLACE.`,
      html:`<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Confirmation de commande</title>
          <style>
            /* Styles CSS pour l'e-mail */
            body {
              background-color: #f9f9f9;
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.5;
              color: #333;
              margin: 0;
              padding: 0;
            }
      
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
      
            h1 {
              color: #333;
              font-size: 24px;
              font-weight: 700;
              margin-top: 0;
              margin-bottom: 20px;
            }
      
            p {
              margin-top: 0;
              margin-bottom: 20px;
            }
      
            .cta-button {
              display: inline-block;
              background-color: #0070c0;
              color: #fff;
              text-decoration: none;
              font-size: 18px;
              padding: 12px 20px;
              border-radius: 4px;
            }
      
            .cta-button:hover {
              background-color: #005fa0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Confirmation de commande</h1>
            <p>Bonjour,</p>
            <p>Nous avons bien reçu votre commande n°<strong>${commandeId}</strong>. Les vendeurs concernés ont été informés et vont vous joindre pour livrer leurs produits.</p>
            <p>Si vous avez des questions sur votre commande, n'hésitez pas à nous contacter en répondant à cet e-mail.</p>
            <p>Cordialement,</p>
            <p>L'équipe de la boutique MERN-MARKETPLACE.</p>
            <p><a href="#" class="cta-button">Suivre ma commande</a></p>
          </div>
        </body>
      </html>
      `
    };

    await transporter.sendMail(mailOptions);

    return "Emails envoyés avec succès";
  } catch (err) {
    console.error(err);
    throw new Error("Erreur lors de l'envoi des emails");
  }
};
// Afficher tous les produits d'une commande
exports.afficherProduits = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id);
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    const produits = commande.produits;
    const prixTotal = commande.prixTotal
    res.json({produits:produits, prixTotal:prixTotal});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllCommandeByUserId = async (req, res) => {
  try {
    const idUser = req.params.userId;
    const commandes = await Commande.find({proprietaire:idUser});
    if(!commandes){
      return res.status(404).json({message : "Aucun Commande n'est disponible pour l'utilisateur"})
    }
    return res.status(200).json(commandes)
  } catch (error) {
    res.status(400).json({ message: "Une erreur est sourvenue lors de la récupération des commandes de l'utilisateur." });
  }
};

// Supprimer une commande
exports.supprimerCommande = async (req, res) => {
  const { id } = req.params;

  try {
    const commande = await Commande.findByIdAndDelete(id);

    if (!commande) {
      return res.status(404).json({ message: 'Commande introuvable' });
    }

    res.json({ message: 'Commande supprimée' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de la commande' });
  }
};
