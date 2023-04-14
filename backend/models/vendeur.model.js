module.exports = mongoose => {
  var vendeurSchema = mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true,
      },
      name: {
        type: String,
        required: true,
        unique: true,
      },
      image: {
        type: String,
      },
      description: {
        type: String,
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );
  vendeurSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Vendeur = mongoose.model("vendeur", vendeurSchema);
  return Vendeur;
};
