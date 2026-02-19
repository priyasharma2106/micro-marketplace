# 🛍️ Micro Marketplace

A full-stack e-commerce marketplace application with web and mobile support, built as an internship assignment project.

## 📋 Project Overview

Micro Marketplace is a complete marketplace platform featuring:
- **Backend API** - RESTful API with authentication and CRUD operations
- **Web Application** - Responsive React web app
- **Mobile Application** - Cross-platform React Native app

## ✨ Features

### Core Features
- 🔐 **User Authentication** - Register, login, and logout functionality
- 📦 **Product Management** - Browse, search, and view product details
- ❤️ **Favorites System** - Add/remove products to favorites
- 🔍 **Search Functionality** - Real-time product search
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Beautiful UI** - Modern design with smooth animations
- 🔔 **Toast Notifications** - User feedback for all actions

### Technical Features
- JWT-based authentication
- MongoDB database with Mongoose ODM
- REST API with Express.js
- React with Context API for state management
- React Native with Expo for mobile
- Input validation and error handling
- Pagination support
- Indian Rupee (₹) currency

## 🚀 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** v5.2.1 - Web framework
- **MongoDB** - Database
- **Mongoose** v9.2.1 - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend (Web)
- **React** 18.3.1 - UI library
- **Vite** 5.4.11 - Build tool
- **React Router** v6.22.0 - Navigation
- **Axios** 1.6.7 - HTTP client
- **react-hot-toast** - Notifications

### Mobile
- **React Native** - Mobile framework
- **Expo** - Development platform
- **React Navigation** - Mobile navigation
- **AsyncStorage** - Local storage
- **Axios** - HTTP client

## 📁 Project Structure

```
micro_marketplace/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Business logic
│   │   ├── middleware/     # Auth & validation
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API routes
│   │   └── seed/           # Database seeding
│   ├── server.js           # Entry point
│   ├── package.json
│   └── README.md
│
├── frontend/               # React Web App
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # Auth context
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── App.jsx        # Main component
│   ├── index.html
│   ├── package.json
│   └── README.md
│
└── mobile/                # React Native App
    ├── src/
    │   ├── components/    # Mobile components
    │   ├── context/       # Auth context
    │   ├── screens/       # Screen components
    │   └── services/      # API services
    ├── App.js
    ├── package.json
    └── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn
- Expo CLI (for mobile app)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd micro_marketplace
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Seed the database:
```bash
npm run seed
```

Start the server:
```bash
npm start
```

Backend will run on `http://localhost:5000`

### 3. Frontend (Web) Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`

### 4. Mobile App Setup

```bash
cd mobile
npm install
```

Update API URL in `src/services/api.js`:
- Android Emulator: `http://10.0.2.2:5000`
- iOS Simulator: `http://localhost:5000`
- Physical Device: `http://YOUR_IP:5000`

Start Expo:
```bash
npm start
```

Scan QR code with Expo Go app on your phone.

## 🧪 Test Credentials

```
Email: john@example.com
Password: password123
```

OR

```
Email: jane@example.com
Password: password123
```

## 📱 Screenshots

### Web Application
- Home page with product grid
- Search functionality
- Product detail view
- Login/Register pages
- Favorites page

### Mobile Application
- Product list with search
- Product details
- Authentication screens
- Favorites management

## 🔌 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Products
- `GET /products` - Get all products (with search & pagination)
- `GET /products/:id` - Get single product
- `POST /products` - Create product (protected)
- `PUT /products/:id` - Update product (protected)
- `DELETE /products/:id` - Delete product (protected)

### Favorites
- `GET /favorites` - Get user favorites (protected)
- `POST /favorites` - Add to favorites (protected)
- `DELETE /favorites/:productId` - Remove from favorites (protected)

## 🎨 UI Features

### Web App
- Black navbar with purple accents
- Dark purple separator line with glow effect
- Thin, wide search bar with magnifying glass
- Responsive product cards
- Smooth animations and transitions
- Toast notifications for user feedback

### Mobile App
- Native mobile UI components
- Smooth navigation
- Pull-to-refresh
- Touch-optimized buttons
- Native alerts and feedback

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation
- Error handling
- CORS enabled

## 📊 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date
}
```

### Product Model
```javascript
{
  title: String (required),
  price: Number (required),
  description: String (required),
  image: String (URL),
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment

### Backend
- Deploy to Heroku, Railway, or Render
- Set environment variables
- Connect to MongoDB Atlas

### Frontend (Web)
- Deploy to Vercel, Netlify, or GitHub Pages
- Update API base URL
- Build: `npm run build`

### Mobile
- Build APK/IPA with Expo
- Submit to Play Store/App Store
- Or share as Expo app

## 🐛 Troubleshooting

### Backend
- Check MongoDB connection string
- Verify port 5000 is available
- Ensure .env file is configured

### Frontend
- Clear browser cache
- Check backend is running
- Verify API URL is correct

### Mobile
- Update API URL in api.js
- Ensure phone and computer on same WiFi
- Clear Expo cache: `expo start -c`

## 📝 TODO / Future Enhancements

- [ ] Add product categories
- [ ] Implement shopping cart
- [ ] Payment integration
- [ ] Order management
- [ ] User profiles
- [ ] Product reviews and ratings
- [ ] Admin dashboard
- [ ] Image upload functionality
- [ ] Email verification
- [ ] Password reset

## 👨‍💻 Developer

**Priya**
- Role: Intern
- Project: Full Stack Marketplace Assignment

## 📄 License

MIT License - Feel free to use this project for learning purposes.

## 🙏 Acknowledgments

- Built as an internship assignment project
- Technologies: MERN Stack + React Native
- Database seeded with sample electronics products

---

**Note:** This is a learning project built for internship assignment purposes.

For detailed setup instructions for each component, check:
- `backend/README.md` - Backend documentation
- `frontend/README.md` - Web app documentation  
- `mobile/README.md` - Mobile app documentation
