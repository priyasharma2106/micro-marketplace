const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../models/User");
const Product = require("../models/Product");

// Sample product data
const products = [
  {
    title: "Apple iPhone 15 Pro",
    price: 999.99,
    description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system. Perfect for photography enthusiasts.",
    image: "https://i.imgur.com/cQxCJXs.jpg"
  },
  {
    title: "Sony WH-1000XM5 Headphones",
    price: 349.99,
    description: "Industry-leading noise canceling headphones with exceptional sound quality and 30-hour battery life.",
    image: "https://i.imgur.com/pTjAkRn.jpg"
  },
  {
    title: "MacBook Air M3",
    price: 1299.99,
    description: "Incredibly thin and light laptop powered by the M3 chip. Perfect for students and professionals.",
    image: "https://i.imgur.com/b8EhpGR.jpg"
  },
  {
    title: "Samsung Galaxy Watch 6",
    price: 299.99,
    description: "Advanced smartwatch with health tracking, fitness features, and sleek design for everyday wear.",
    image: "https://i.imgur.com/yQNz7jM.jpg"
  },
  {
    title: "iPad Pro 12.9-inch",
    price: 1099.99,
    description: "Powerful tablet with M2 chip and stunning Liquid Retina XDR display. Ideal for creative work.",
    image: "https://i.imgur.com/ZLm3Rcc.jpg"
  },
  {
    title: "Bose QuietComfort Earbuds",
    price: 279.99,
    description: "Premium wireless earbuds with world-class noise cancellation and rich, balanced sound.",
    image: "https://i.imgur.com/kVGzN3P.jpg"
  },
  {
    title: "Nintendo Switch OLED",
    price: 349.99,
    description: "Enhanced gaming console with vibrant OLED screen and improved audio for on-the-go gaming.",
    image: "https://i.imgur.com/QJYm5Sz.jpg"
  },
  {
    title: "Canon EOS R6 Camera",
    price: 2499.99,
    description: "Professional mirrorless camera with 20MP sensor, 4K video, and incredible low-light performance.",
    image: "https://i.imgur.com/ZkLGfzV.jpg"
  },
  {
    title: "Logitech MX Master 3S",
    price: 99.99,
    description: "Ergonomic wireless mouse with ultra-fast scrolling and customizable buttons for productivity.",
    image: "https://i.imgur.com/Xp9CqFm.jpg"
  },
  {
    title: "Kindle Paperwhite",
    price: 139.99,
    description: "Waterproof e-reader with glare-free display and adjustable warm light. Perfect for reading anywhere.",
    image: "https://i.imgur.com/YHm4j5L.jpg"
  }
];

// Sample users (test credentials)
const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123" // Will be hashed
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123" // Will be hashed
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Hash passwords and create users
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return { ...user, password: hashedPassword };
      })
    );

    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`👥 Created ${createdUsers.length} users`);

    // Create products
    const createdProducts = await Product.insertMany(products);
    console.log(`📦 Created ${createdProducts.length} products`);

    console.log("\n✨ Database seeded successfully!\n");
    console.log("📝 Test Credentials:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Email: john@example.com");
    console.log("Password: password123");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Email: jane@example.com");
    console.log("Password: password123");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    process.exit(0);

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

// Run seed function
seedDatabase();
