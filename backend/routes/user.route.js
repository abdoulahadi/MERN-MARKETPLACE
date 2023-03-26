module.exports = app => {
  const users = require("../controllers/user.controller.js");
  var router = require("express").Router();

  // Créer un Produit....
  router.post("/", users.create);
  

  // C'était cette ligne suivante
  /**
   * Exemple de lien http://localhost:8080/users suivie de la valeur
   * qui est en haut
   */
  app.use("/users", router);
};
