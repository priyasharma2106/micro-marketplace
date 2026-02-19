# Micro Marketplace - Backend API

RESTful API built with Node.js, Express, and MongoDB for a micro marketplace application.

## 🚀 Features

- ✅ User authentication (Register/Login) with JWT
- ✅ Password hashing with bcrypt
- ✅ Complete CRUD operations for products
- ✅ Search and pagination for products
- ✅ Favorites system (add/remove favorites)
- ✅ Input validation with express-validator
- ✅ Protected routes with JWT middleware
- ✅ Seed script with sample data

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## ⚙️ Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Create a `.env` file in the backend directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/micro_marketplace
JWT_SECRET=your_super_secret_jwt_key_change_this
```

### 3. Seed Database
```bash
npm run seed
```

### 4. Start Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## 🔑 Test Credentials

After running the seed script, use these credentials:

**User 1:**
- Email: `john@example.com`
- Password: `password123`

**User 2:**
- Email: `jane@example.com`
- Password: `password123`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Product Endpoints

#### Get All Products (with search & pagination)
```http
GET /products?search=iphone&page=1&limit=10
```

**Query Parameters:**
- `search` (optional): Search term for title/description
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "products": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 2,
    "totalProducts": 15,
    "hasMore": true
  }
}
```

#### Get Single Product
```http
GET /products/:id
```

#### Create Product (Protected)
```http
POST /products
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "iPhone 15 Pro",
  "price": 999.99,
  "description": "Latest iPhone model",
  "image": "https://example.com/image.jpg"
}
```

#### Update Product (Protected)
```http
PUT /products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "price": 899.99,
  "description": "Updated description",
  "image": "https://example.com/new-image.jpg"
}
```

#### Delete Product (Protected)
```http
DELETE /products/:id
Authorization: Bearer <token>
```

### Favorites Endpoints

#### Get User's Favorites (Protected)
```http
GET /favorites
Authorization: Bearer <token>
```

#### Add to Favorites (Protected)
```http
POST /favorites
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "507f1f77bcf86cd799439011"
}
```

#### Remove from Favorites (Protected)
```http
DELETE /favorites/:productId
Authorization: Bearer <token>
```

## 🗂️ Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic (register/login)
│   │   ├── productController.js  # Product CRUD logic
│   │   └── favoriteController.js # Favorites logic
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   └── validation.js         # Input validation rules
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Product.js            # Product schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── productRoutes.js      # Product endpoints
│   │   └── favoriteRoutes.js     # Favorite endpoints
│   └── seed/
│       └── seedData.js           # Database seeding script
├── server.js                      # Express app entry point
├── package.json
└── .env.example
```

## 🛡️ Security Features

- Passwords hashed using bcrypt (10 salt rounds)
- JWT tokens with 7-day expiration
- Protected routes with authentication middleware
- Input validation on all endpoints
- Proper HTTP status codes
- Environment-based configuration

## 📦 Seed Data

The seed script creates:
- **10 sample products** (electronics, gadgets)
- **2 test users** with hashed passwords

## 🧪 Testing with Postman/Thunder Client

1. Register or login to get JWT token
2. Copy the token from response
3. For protected routes, add header:
   ```
   Authorization: Bearer <your_token_here>
   ```

## 🔧 Technologies Used

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

## 📝 Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found
- `500` - Server Error

## 🐛 Common Issues

**MongoDB Connection Failed:**
- Ensure MongoDB is running locally or check your MONGO_URI
- For MongoDB Atlas, whitelist your IP address

**Token Errors:**
- Check if JWT_SECRET is set in .env
- Ensure token is sent as `Bearer <token>` in Authorization header

**Validation Errors:**
- Check request body matches the required format
- All fields must meet validation rules (length, format, etc.)
