const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { productValidation } = require("../middleware/validation");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

// Public routes - no authentication needed
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Protected routes - require authentication
router.post("/", authMiddleware, productValidation, createProduct);
router.put("/:id", authMiddleware, productValidation, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;
