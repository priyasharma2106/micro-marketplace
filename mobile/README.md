# Micro Marketplace - Mobile App

React Native mobile application for the Micro Marketplace platform.

## 🚀 Features

- ✅ User Authentication (Login/Register)
- ✅ Browse Products with Search
- ✅ Product Details View
- ✅ Favorites Management
- ✅ Beautiful UI with Animations
- ✅ Cross-platform (iOS & Android)

## 📋 Prerequisites

- Node.js (v14 or higher)
- Expo CLI
- Android Studio (for Android emulator) or Xcode (for iOS simulator)
- Backend API running on `http://localhost:5000`

## 🛠️ Installation

1. **Install Dependencies:**
   ```bash
   cd mobile
   npm install
   ```

2. **Update API URL:**
   
   Open `src/services/api.js` and update the API_URL:
   
   - For **Android Emulator**: Use `http://10.0.2.2:5000`
   - For **iOS Simulator**: Use `http://localhost:5000`
   - For **Physical Device**: Use your computer's IP address (e.g., `http://192.168.1.100:5000`)

## 🏃‍♂️ Running the App

### Start Expo Development Server:
```bash
npm start
```

### Run on Android:
```bash
npm run android
```

### Run on iOS (Mac only):
```bash
npm run ios
```

### Run on Web:
```bash
npm run web
```

## 📱 Testing on Physical Device

1. Install **Expo Go** app on your phone:
   - [Android - Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

2. Scan the QR code from the terminal after running `npm start`

3. Make sure your phone and computer are on the same WiFi network

4. Update `API_URL` in `src/services/api.js` to your computer's IP address

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

## 📂 Project Structure

```
mobile/
├── src/
│   ├── components/
│   │   └── ProductCard.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── ProductDetailScreen.js
│   │   └── FavoritesScreen.js
│   └── services/
│       └── api.js
├── App.js
└── package.json
```

## 🎨 Technologies Used

- **React Native** - Mobile framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **Axios** - HTTP client
- **AsyncStorage** - Local storage

## 🔧 Configuration

### Update Backend URL

Edit `src/services/api.js`:

```javascript
// For Android Emulator
const API_URL = 'http://10.0.2.2:5000';

// For iOS Simulator
const API_URL = 'http://localhost:5000';

// For Physical Device (replace with your IP)
const API_URL = 'http://192.168.1.100:5000';
```

### Find Your Computer's IP Address:

**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" under your network adapter

**Mac/Linux:**
```bash
ifconfig | grep "inet "
```

## 📸 Screenshots

- Home Screen with Product List
- Product Detail View
- Login/Register Screens
- Favorites Screen
- Search Functionality

## 🐛 Troubleshooting

### Cannot connect to backend:
- Make sure backend server is running on port 5000
- Check if API_URL is correctly configured
- Ensure phone and computer are on same WiFi (for physical device)
- Try using your computer's IP address instead of localhost

### App crashes on startup:
- Clear Expo cache: `expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Images not loading:
- Check internet connection
- Verify image URLs in backend seed data

## 📝 Notes

- Backend must be running before starting mobile app
- Use test credentials provided above
- Search functionality filters products in real-time
- Favorites require authentication

## 🚀 Building for Production

### Android APK:
```bash
expo build:android
```

### iOS IPA:
```bash
expo build:ios
```

## 📄 License

MIT License - See LICENSE file for details

## 👨‍💻 Developer

Priya - Intern Assignment Project
