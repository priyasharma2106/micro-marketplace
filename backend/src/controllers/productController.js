const Product = require("../models/Product");

// Get all products with search and pagination
exports.getAllProducts = async (req, res) => {
  try {
    // Extract query parameters
    const { search, page = 1, limit = 10 } = req.query;

    // Build search query
    const query = {};
    if (search) {
      // Case-insensitive search in title and description
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Fetch products with pagination
    const products = await Product.find(query)
      .sort({ createdAt: -1 }) // Newest first
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination info
    const total = await Product.countDocuments(query);

    res.status(200).json({
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalProducts: total,
        hasMore: skip + products.length < total
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);

  } catch (error) {
    // Handle invalid ObjectId
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

// Create new product (protected route)
exports.createProduct = async (req, res) => {
  try {
    const { title, price, description, image } = req.body;

    const product = await Product.create({
      title,
      price,
      description,
      image
    });

    res.status(201).json({
      message: "Product created successfully",
      product
    });

  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: "Validation failed", errors });
    }
    res.status(500).json({ message: "Server error" });
  }
};

// Update product (protected route)
exports.updateProduct = async (req, res) => {
  try {
    const { title, price, description, image } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { title, price, description, image },
      { new: true, runValidators: true } // Return updated doc and run validation
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product
    });

  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: "Validation failed", errors });
    }
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

// Delete product (protected route)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).json({ message: "Server error" });
  }
};
