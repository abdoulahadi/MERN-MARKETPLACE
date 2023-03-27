// const express = require('express');
// const router = express.Router();
// const commandeController = require('../controllers/commandeController');



// module.exports = router;

module.exports = app => {
    const commandes = require('../controllers/commande.controller.js');
    var router = require("express").Router();

    // Créer une commande
    router.post('/', commandes.creerCommande);

    // Ajouter un produit à une commande existante
    router.patch('/:id/ajouter-produit', commandes.ajouterProduit);

    // Retirer un produit d'une commande existante
    router.patch('/:id/retirer-produit', commandes.retirerProduit);


    // Effectuer le paiement d'une commande
    router.post('/:id/paiement', commandes.effectuerPaiement);

    // Supprimer une commande
    router.delete('/:id', commandes.supprimerCommande);

    /**
     * Exemple de lien http://localhost:8080/products suivie de la valeur
     * qui est en haut
    */
    app.use("/commandes", router)
};