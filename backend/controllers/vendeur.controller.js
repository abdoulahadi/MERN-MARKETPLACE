const db = require("../models");
const Vendeur = db.vendeurs;

exports.create = async (req, res) => {
  try {
    const { user } = req.body;

    if (!user) {
      return res.status(400).json({ message: "Le user n'est pas renseigné" });
    }

    // Vérifier si un vendeur existe déjà pour cet utilisateur
    const existingVendeur = await Vendeur.findOne({ user });
    if (existingVendeur) {
      return res
        .status(400)
        .json({ message: "Un vendeur existe déjà pour cet utilisateur." });
    }

    // Créer un nouveau vendeur
    const newVendeur = new Vendeur({ user, isVerified: true });
    await newVendeur.save();

    res.status(200).json({ message: "Vendeur créé avec succès", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création du vendeur.' });
  }
};
