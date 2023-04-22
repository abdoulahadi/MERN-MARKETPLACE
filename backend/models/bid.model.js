module.exports = mongoose => {
  const bidSchema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    amount: { type: Number, required: true },
    dateSend: { type: Date, required: true, default: Date.now },
  });

  bidSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  // bidSchema.post('save', function (doc) {
  //   const io = require('../config/socket.config').getIO();
  //   io.emit('newBid', { bid: doc, message: 'Bid created successfully' });
  // });

  const Bid = mongoose.model("bid", bidSchema);
  return Bid;
};
