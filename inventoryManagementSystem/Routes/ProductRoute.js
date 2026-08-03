const express = require("express");
const router = express.Router();

// Import the product controller
const productController = require("../Controllers/ProductController");

// Define the routes
router.post("/createproduct", productController.createProduct);
router.put("/updateproduct/:id", productController.updateProduct);

module.exports = router;
