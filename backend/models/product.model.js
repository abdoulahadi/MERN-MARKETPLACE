module.exports = mongoose => {
  var productSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      /**
      * Vendeur ici fait références au modèle Vendeur.
      */
      vendeur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendeur",
        required: true,
      },
      image:{
        type: String,
        required:true,
      },
      category: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
      },
    },

    /** 
    *Avec timestamp, on a deux attributs de plus qui on comme nom:
    * createdAt, updatedAt
    */
    { timestamps: true }
  );

  productSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Product = mongoose.model("product", productSchema);
  return Product;
};
