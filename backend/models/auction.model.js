module.exports = mongoose => {
  var auctionSchema = new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true
    },
    vendeur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendeur",
      required: true,
    },
    startingPrice: { type: Number, required: true },
    auctionEndTime: { type: Date, required: true },
    bids: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "bid",
    }],
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
  });
  auctionSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Auction = mongoose.model("auction", auctionSchema);
  return Auction;
};
