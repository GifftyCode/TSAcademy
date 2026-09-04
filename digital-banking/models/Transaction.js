const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    fromAccount: {
      type: String,
      required: true,
    },
    toAccount: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    ownerAccount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.Model("Transaction", transactionSchema);
