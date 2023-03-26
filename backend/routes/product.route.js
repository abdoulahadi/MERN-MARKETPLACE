module.exports = app => {
  const products = require("../controllers/product.controller.js");
  var router = require("express").Router();

  // Créer un Produit....
  router.post("/products", products.create);

  // Avoir la liste de tous produits
  router.get("/products", products.getAllProduct);

  // Avoir le produit en fonction du catégorie
  router.get("/products/:id", products.getProductById);

  // Avoir la liste des produits en fonction du catégorie
  router.get("/products/:category", products.getAllProductByCategory);

  // Avoir la liste des produits en fonction du vendeur
  router.get("/products/:idVendeur", products.getAllProductByVendeur);

  // Faire la mise à jour d'un produit en passant l'id
  router.put("/products/:idProduct", products.updateProduct);

  // Faire la supression d'un produit en passant l'id
  router.delete("/products/:idProduct", products.deleteProduct);


};
