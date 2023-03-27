const mongoose = require('mongoose');

const CommandeSchema = new mongoose.Schema({
  produits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product'
    }
  ],
  prixTotal: {
    type: Number,
    required: true
  },
  proprietaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  paiementEffectue: {
    type: Boolean,
    default: false
  }
});

CommandeSchema.methods.calculerPrixTotal = function() {
  let total = 0;
  for(let i = 0; i < this.produits.length; i++) {
    total += this.produits[i].price;
  }
  this.prixTotal = total;
  return total;
};

const Commande = mongoose.model('Commande', CommandeSchema);



module.exports = Commande;
