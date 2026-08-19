const express = require("express");

//  import authentication middleware
const { protect } = require("../Middleware/auth");

// import authorization middleware
const { authorize } = require("../Middleware/role");

const router = express.Router();

// Import the product controller
const productController = require("../Controllers/ProductController");

// Define the routes
router.post(
  "/createproduct",
  protect,
  authorize("superadmin"),
  productController.createProduct,
);
router.put("/updateproduct/:id", productController.updateProduct);
router.get("/getAllProducts", productController.getAllProducts);
router.get("/getProduct/:id", productController.getProduct);
router.delete("/deleteProduct/:id", productController.deleteProduct);

module.exports = router;
