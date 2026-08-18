const express = require("express");

const { protect } = require("../Middleware/auth");

const router = express.Router();

// Import the product controller
const productController = require("../Controllers/ProductController");

// Define the routes
router.post("/createproduct", protect, productController.createProduct);
router.put("/updateproduct/:id", productController.updateProduct);
router.get("/getAllProducts", productController.getAllProducts);
router.get("/getProduct/:id", productController.getProduct);
router.delete("/deleteProduct/:id", productController.deleteProduct);

module.exports = router;
