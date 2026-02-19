# 📱 Quick Start Guide - Mobile App

## Step 1: Update API URL

Before running the app, you need to update the backend API URL based on how you're testing:

### Option A: Android Emulator
Open `src/services/api.js` and change line 6:
```javascript
const API_URL = 'http://10.0.2.2:5000';
```

### Option B: iOS Simulator  
Open `src/services/api.js` and change line 6:
```javascript
const API_URL = 'http://localhost:5000';
```

### Option C: Physical Device (Phone/Tablet)
1. Find your computer's IP address:
   - **Windows**: Open Command Prompt → Type `ipconfig` → Look for "IPv4 Address"
   - **Mac**: Open Terminal → Type `ifconfig | grep "inet "` 

2. Open `src/services/api.js` and change line 6:
```javascript
const API_URL = 'http://YOUR_IP_ADDRESS:5000';
// Example: const API_URL = 'http://192.168.1.100:5000';
```

## Step 2: Make Sure Backend is Running

Open a terminal and run:
```bash
cd backend
npm start
```

Backend should be running on http://localhost:5000

## Step 3: Start Mobile App

Open another terminal and run:
```bash
cd mobile
npm start
```

## Step 4: Choose How to Run

After `npm start`, you'll see options:

### For Android Emulator:
- Press `a` in the terminal
- Or scan QR code with Expo Go app

### For iOS Simulator (Mac only):
- Press `i` in the terminal

### For Physical Device:
1. Install "Expo Go" app from:
   - [Google Play Store (Android)](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [Apple App Store (iOS)](https://apps.apple.com/app/expo-go/id982107779)

2. Make sure your phone and computer are on the **same WiFi network**

3. Scan the QR code shown in terminal:
   - **Android**: Use Expo Go app
   - **iOS**: Use Camera app

## Step 5: Test the App

### Login with Test Credentials:
```
Email: john@example.com
Password: password123
```

### Features to Test:
1. ✅ Browse products on home screen
2. ✅ Search for products (try "iPhone")
3. ✅ Click on a product to view details
4. ✅ Login with test credentials
5. ✅ Add products to favorites (heart icon)
6. ✅ View favorites page
7. ✅ Remove from favorites
8. ✅ Logout

## 🐛 Troubleshooting

### "Network Error" or "Cannot connect to backend":
1. ✅ Make sure backend is running (`npm start` in backend folder)
2. ✅ Check if API_URL is correct in `src/services/api.js`
3. ✅ For physical device: Use your computer's IP address, not localhost
4. ✅ Make sure phone and computer are on same WiFi

### App won't start:
```bash
# Clear cache and restart
npx expo start -c
```

### Can't find IP address:
**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" like `192.168.1.100`

**Mac/Linux:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

## 📸 Expected Result

You should see:
- Purple header with "Micro Marketplace" title
- Search bar
- Grid of products with images
- Login/Logout buttons
- Favorites functionality
- Smooth navigation between screens

## 🎉 Success!

If you can see products and navigate through the app, congratulations! Your mobile app is working! 🚀

## Need Help?

Check the full README.md for detailed documentation.
