const User = require("../models/User");
const Product = require("../models/Product");

// Get user's favorites
exports.getFavorites = async (req, res) => {
  try {
    // Populate favorites with full product details
    const user = await User.findById(req.user._id)
      .populate("favorites")
      .select("favorites");

    res.status(200).json({
      favorites: user.favorites
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add product to favorites
exports.addFavorite = async (req, res) => {
  try {
    const { productId } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if already in favorites
    const user = await User.findById(req.user._id);
    if (user.favorites.includes(productId)) {
      return res.status(400).json({ message: "Product already in favorites" });
    }

    // Add to favorites
    user.favorites.push(productId);
    await user.save();

    res.status(200).json({
      message: "Product added to favorites",
      favorites: user.favorites
    });

  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

// Remove product from favorites
exports.removeFavorite = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user._id);

    // Check if product is in favorites
    if (!user.favorites.includes(productId)) {
      return res.status(400).json({ message: "Product not in favorites" });
    }

    // Remove from favorites
    user.favorites = user.favorites.filter(
      fav => fav.toString() !== productId
    );
    await user.save();

    res.status(200).json({
      message: "Product removed from favorites",
      favorites: user.favorites
    });

  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).json({ message: "Server error" });
  }
};
