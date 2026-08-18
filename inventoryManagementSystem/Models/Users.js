const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
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
    hasAdminAccess: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["superadmin", "storekeeper", "salesperson"],
      default: "salesperson",
    },
  },
  { timestamps: true }, // Date created and date updated
);

// Create Model from schema
const User = mongoose.model("user", userSchema);
module.exports = User;
