const mongose = require("mongose");
const bcrypt = require("bcryptjs");
const { type } = require("node:os");
const { timeStamp } = require("node:console");

const userSchema = new mongose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  timeStamp: true, // Date created and date updated
});
