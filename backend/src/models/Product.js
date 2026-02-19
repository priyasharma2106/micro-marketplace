const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"]
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true
    },
    image: {
      type: String,
      required: [true, "Product image URL is required"]
    }
  },
  { 
    timestamps: true // Automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Product", productSchema);
