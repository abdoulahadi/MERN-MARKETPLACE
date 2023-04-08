module.exports = app => {
  const products = require("../controllers/product.controller.js");
  var router = require("express").Router();

  // Créer un Produit....
  router.post("/", products.create);

  // Avoir la liste de tous produits
  router.get("/", products.getAllProduct);

  // Avoir la liste des 10 nouveaux Produits
  router.get("/newProducts",products.getNewProducts);

  // Avoir le produit en fonction du catégorie
  router.get("/:idProduct", products.getProductById);

  // Avoir la liste des produits en fonction du catégorie
  router.get("/category/:category", products.getAllProductByCategory);

  // Avoir la liste des produits en fonction du vendeur
  router.get("/vendeur/:idVendeur", products.getAllProductByVendeur);

  // Faire la mise à jour d'un produit en passant l'id
  router.put("/:idProduct", products.updateProduct);

  // Faire la supression d'un produit en passant l'id
  router.delete("/:idProduct", products.deleteProduct);

    /**
     * Exemple de lien http://localhost:8080/products suivie de la valeur
     * qui est en haut
    */
    app.use("/products", router)
};
