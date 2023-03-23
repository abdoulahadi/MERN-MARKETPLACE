module.exports = app => {
  const products = require("../controllers/product.controller.js");
  var router = require("express").Router();

  // Créer un Produit....
  router.post("/product/create", products.create);
};
