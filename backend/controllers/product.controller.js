const db = require("../models");
const Product = db.products;

exports.create = async (req, res) => {
  try {
    const { name, vendeur, image, category, price, description } = req.body;

    if(!name || !vendeur || !image || !category || !price){
        return res.status(400).json({ message: "Veuillez remplir les champs obligatoires." });
    }

    const product = new Product({ name, vendeur, image,category, price, description });

    await product.save();
    res.status(201).json({ message: 'Produit créé avec succès', product });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création du produit' });
  }
};
