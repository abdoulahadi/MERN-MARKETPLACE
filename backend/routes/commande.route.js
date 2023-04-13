module.exports = app => {
    const commandes = require('../controllers/commande.controller.js');
    var router = require("express").Router();

    // Créer une commande
    router.post('/', commandes.creerCommande);

    // Ajouter un produit à une commande existante
    router.patch('/ajouter-produit', commandes.ajouterProduit);

    // Retirer des produits d'une commande existante
    router.patch('/retirer-produits', commandes.retirerProduits);

    // Retirer un produit d'une commande existante
    router.patch('/retirer-produit', commandes.retirerProduit);


    // Afficher tous les produits d'une commande
    router.get('/:id/afficher-produits', commandes.afficherProduits);

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
