const db = require("../models");
const upload = require('../config/multer.config');
const Product = db.products;
const Vendeur = db.vendeurs;

exports.create = async (req, res) => {
  try {
    const name = req.body.name;
    const vendeur = req.body.vendeur;
    const price = req.body.price;
    const description = req.body.description;
    const category = req.body.category;

    if (!name || !vendeur || !category || !price||!req.file ) {
      return res
        .status(400)
        .json({ message: "Veuillez remplir les champs obligatoires." });
    }

    const product = new Product({
      name,
      vendeur,
      image: req.file.path,
      category,
      price,
      description,
    });

    await product.save();
    res.status(200).json({ message: "Produit créé avec succès", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du produit" });
  }
};
exports.create = upload.single('image'), exports.create;

exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des produits" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.idProduct);

    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du produit en fonction de l'id" });
  }
};


/**
 * Ce fonction permet de la récupération de tous les produits par rapport
 * à un catégorie.
 */
exports.getAllProductByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    /**
     * Ici Populate permet de joindre les informations comme nom et
     * email du Vendeur.
     */
    const products = await Product.find({
      category: category,
    }).populate("Vendeur", "name email");
    if (!products) {
      return res
        .status(404)
        .json({ message: "Aucun produit trouvé pour cette catégorie" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Erreur lors de la récupération du produit en fonction de la catégorie",
    });
  }
};

/**
 * Permer de récupérer tous les produits d'un vendeur dont l'id est
 * passé en paramètres
 */
exports.getAllProductByVendeur = async (req, res) => {
    try {
        const idVendeur = req.params.idVendeur;

        const vendeur = await Vendeur.findOne({ user: idVendeur })

        if(!vendeur){
            return res.status(404).json({ message: "Vendeur non trouvé" }); 
        }

        const products = await Product.find({vendeur: vendeur.id}).populate("Vendeur", "name email");
        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: "Erreur lors de la récupération du produit en fonction du Vendeur",
        }); 
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const idProduct = req.params.idProduct;
        const product = Product.findByIdAndUpdate(idProduct,req.body,{new:true});

        if(!product){
            return res.status(404).json({ message: "Produit non trouvé" });
        }
        return res.status(200).json({message:'Mise à jour complète du produit',product});
    } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: "Erreur lors de la mise à jour du produit",
        });
    }
}

exports.deleteProduct = async (req,res) => {
    try {
        const idProduct = req.params.idProduct;
        const product = Product.findByIdAndDelete(idProduct);

        if (!product){
            return res.status(404).json({ message: "Produit non trouvé" });
        }
        return res.status(200).json({message:'Suppression complète du produit',product});
    } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: "Erreur lors de la suppression du produit",
        });
    }
}