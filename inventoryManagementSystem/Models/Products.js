const mongose = require("mongose");
const { timeStamp } = require("node:console");

const productSchema = new mongose.Schema({
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
  timeStamp: true,
});
