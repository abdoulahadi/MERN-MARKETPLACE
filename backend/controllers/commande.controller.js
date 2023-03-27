const db = require("../models");

const Commande = db.commandes;
const Produit = db.products
const User= db.users

// Créer une commande
exports.creerCommande = async (req, res) => {
  const { produits, proprietaire, prixTotal } = req.body;

  try {
    const commande = new Commande({
      produits,
      proprietaire,
      prixTotal
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
  const { idCommande, idProduit } = req.params;

  try {
    const commande = await Commande.findById(idCommande);
    const produit = await Produit.findById(idProduit);

    if (!commande || !produit) {
      return res.status(404).json({ message: 'Commande ou produit introuvable' });
    }

    commande.produits.push(produit._id);

    await commande.save();

    res.json({ commande });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de l\'ajout du produit à la commande' });
  }
};

// Retirer un produit d'une commande existante
exports.retirerProduit = async (req, res) => {
  const { idCommande, idProduit } = req.params;

  try {
    const commande = await Commande.findById(idCommande);
    const produit = await Produit.findById(idProduit);

    if (!commande || !produit) {
      return res.status(404).json({ message: 'Commande ou produit introuvable' });
    }

    commande.produits = commande.produits.filter((p) => p.toString() !== produit._id.toString());

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
