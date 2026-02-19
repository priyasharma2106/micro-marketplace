const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { favoriteValidation } = require("../middleware/validation");
const {
  getFavorites,
  addFavorite,
  removeFavorite
} = require("../controllers/favoriteController");

// All favorite routes require authentication
router.get("/", authMiddleware, getFavorites);
router.post("/", authMiddleware, favoriteValidation, addFavorite);
router.delete("/:productId", authMiddleware, removeFavorite);

module.exports = router;
