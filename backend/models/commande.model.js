module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      produits: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product'
        }
      ],
      prixTotal: {
        type: String,
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
    },
    // { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  schema.methods.calculerPrixTotal = function() {
    let total = 0;
    for(let i = 0; i < this.produits.length; i++) {
      total += this.produits[i].price;
    }
    this.prixTotal = total;
    return total;
  };

  const Commande = mongoose.model("commande", schema);
  return Commande;
};