const db = require("../models");

const Commande = db.commandes;
const Produit = db.products
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
    commande.paiementEffectue = true;
    await commande.save();
    res.json(commande);
  } catch (err) {
    res.status(400).json({ message: err.message });
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
