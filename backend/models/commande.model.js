const mongoose = require('mongoose');

const CommandeSchema = new mongoose.Schema({
  produits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Produit'
    }
  ],
  prixTotal: {
    type: Number,
    required: true
  },
  proprietaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  paiementEffectue: {
    type: Boolean,
    default: false
  }
});

const Commande = mongoose.model('Commande', CommandeSchema);

module.exports = Commande;
