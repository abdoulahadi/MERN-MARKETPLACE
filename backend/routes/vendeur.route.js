module.exports = app => {
  const vendeurs = require("../controllers/vendeur.controller.js");
  var router = require("express").Router();
  // Créer un Vendeur....
  router.post("/", vendeurs.create);

  // Récupérer l'ensemble des vendeurs...
  router.get("/", vendeurs.getAllVendeur);

  // Récupération des nouveaux vendeux... limit(10)
  router.get("/newVendeurs", vendeurs.getNewVendeurs);

  // Récupérer un vendeur en passant son identifiant
  router.get("/:idVendeur", vendeurs.getVendeurById);

  // Suppression d'un produit par rapport à l'id..
  router.delete("/:idVendeur", vendeurs.deleteVendeur);

  // Mise à jour d'un produit par rapport à l'id...
  router.put("/:idVendeur", vendeurs.updateVendeur);

  // C'était cette ligne suivante
  app.use("/vendeurs", router);
};
