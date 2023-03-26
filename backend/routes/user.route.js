module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
  
    // Créer un Produit....
    router.post("/user", users.create);
  };