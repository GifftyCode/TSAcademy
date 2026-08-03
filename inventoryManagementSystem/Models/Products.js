const mongoose = require("mongoose");
const { timeStamp } = require("node:console");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timeStamp: true },
);

// create model from schema
const Product = mongoose.model("product", productSchema);
module.exports = Product;
