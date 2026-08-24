const express = require("express");

//  import authentication middleware
const { protect } = require("../Middleware/auth");

// import authorization middleware
const { authorize } = require("../Middleware/role");

const upload = require("../Middleware/upload");

const router = express.Router();

// Import the product controller
const productController = require("../Controllers/ProductController");

// Define the routes
router.post(
  "/createproduct",
  protect,
  upload.single("image"),
  // authorize("superadmin"),
  productController.createProduct,
);
router.put(
  "/updateproduct/:id",
  protect,
  authorize("storekeeper"),
  productController.updateProduct,
);
router.get("/getAllProducts", productController.getAllProducts);
router.get("/getProduct/:id", productController.getProduct);
router.delete("/deleteProduct/:id", productController.deleteProduct);

module.exports = router;
