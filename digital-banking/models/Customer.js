const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    kycType: {
      type: String,
      enum: ["bvn", "nin"],
      required: true,
    },
    kycID: {
      type: String,
      required: true,
      unique: true,
    },
    accountNumber: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Customer", customerSchema);
