module.exports = app => {
  const vendeurs = require("../controllers/vendeur.controller.js");
  var router = require("express").Router();
  // Créer un Vendeur....
  router.post("/vendeur", vendeurs.create);
};
