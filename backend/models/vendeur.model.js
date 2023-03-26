module.exports = mongoose => {
  var vendeurSchema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  });
  vendeurSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Vendeur = mongoose.model("vendeur", vendeurSchema);
  return Vendeur;
};
