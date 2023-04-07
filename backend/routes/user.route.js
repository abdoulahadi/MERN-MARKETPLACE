module.exports = app => {
  const users = require("../controllers/user.controller.js");
  var router = require("express").Router();

  // Créer un utlisateur....
  router.post("/", users.create);

  // Route pour vérifier les informations de connexion de l'utilisateur
  router.post("/login", users.login);

  // Route pour supprimer un utilisateur
  router.delete("/:id", users.deleteUser);

  // Route pour mettre à jour les informations d'un utilisateur
  router.put("/:id", users.updateUser);

  


  app.use("/users", router);
};
