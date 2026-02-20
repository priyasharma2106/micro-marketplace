# 🚀 Deployment Guide - Micro Marketplace

## Step-by-Step Deployment Process

---

## ✅ **Step 1: Push to GitHub** (REQUIRED FIRST)

### 1.1 Check Git Status
```bash
cd c:\Users\priya\micro_marketplace
git status
```

### 1.2 Pull Remote Changes (if repo was initialized with files)
```bash
git pull origin main --allow-unrelated-histories
```

If there's a merge conflict in README.md:
```bash
# Open the conflicted file and keep your version
git add .
git commit -m "merge: Resolve conflicts with remote README"
```

### 1.3 Push Your Code
```bash
git push -u origin main
```

✅ **Verify**: Go to https://github.com/priyasharma2106/micro-marketplace and confirm all files are uploaded

---

## 🎯 **Step 2: Deploy Backend to Railway** (15 minutes)

### 2.1 Sign Up / Login
1. Go to **https://railway.app**
2. Click **"Login with GitHub"**
3. Authorize Railway to access your repositories

### 2.2 Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose **`priyasharma2106/micro-marketplace`**

### 2.3 Configure Backend Service
1. Railway will detect multiple folders
2. Click **"Add Service"** → **"GitHub Repo"**
3. **Root Directory**: Set to `backend`
4. **Start Command**: `npm start`

### 2.4 Add Environment Variables
Click on your service → **Variables** tab → Add these:

```env
PORT=5000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/micro_marketplace?retryWrites=true&w=majority
JWT_SECRET=super_secret_jwt_key_change_in_production_12345
NODE_ENV=production
```

⚠️ **Important**: 
- Use your actual MongoDB Atlas connection string
- Replace `your_username` and `your_password`
- Change the JWT_SECRET to something secure

### 2.5 Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. Once deployed, click on your service
4. Copy the **public URL** (e.g., `https://micro-marketplace-production.up.railway.app`)

### 2.6 Test Backend
```bash
# Test in browser or Postman
GET https://your-backend-url.railway.app/api/products
```

✅ **Backend Deployed!** Note down your Railway URL.

---

## 🌐 **Step 3: Deploy Frontend to Vercel** (10 minutes)

### 3.1 Update API URL in Frontend

First, update the frontend to use environment variable:

**File**: `frontend/src/services/api.js`

Change:
```javascript
const API_URL = 'http://localhost:5000';
```

To:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

Commit this change:
```bash
cd c:\Users\priya\micro_marketplace
git add frontend/src/services/api.js
git commit -m "feat: Use environment variable for API URL"
git push origin main
```

### 3.2 Sign Up / Login to Vercel
1. Go to **https://vercel.com**
2. Click **"Sign Up with GitHub"**
3. Authorize Vercel

### 3.3 Create New Project
1. Click **"Add New..."** → **"Project"**
2. Import **`priyasharma2106/micro-marketplace`**
3. Click **"Import"**

### 3.4 Configure Project
1. **Framework Preset**: Vite
2. **Root Directory**: Click **"Edit"** → Select `frontend`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`

### 3.5 Add Environment Variable
1. Click **"Environment Variables"**
2. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.railway.app` (from Step 2.5)
3. Select all environments (Production, Preview, Development)

### 3.6 Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. You'll get a URL like: `https://micro-marketplace-xyz.vercel.app`

### 3.7 Test Frontend
1. Open the Vercel URL in your browser
2. Try to register/login
3. Browse products
4. Add to favorites

✅ **Frontend Deployed!**

---

## 📱 **Step 4: Mobile App** (Already Done!)

Your mobile app is already accessible via Expo Go!

### Current Status
✅ Running on Expo (scan QR code)
✅ No additional deployment needed for testing

### Optional: Build Native Apps

#### For Android APK:
```bash
cd c:\Users\priya\micro_marketplace\mobile
npm install -g eas-cli
eas login
eas build --platform android
```

#### For iOS IPA:
```bash
eas build --platform ios
```

### Update Mobile API URL
Before building, update the API URL in `mobile/src/services/api.js`:

```javascript
const API_URL = 'https://your-backend-url.railway.app';
```

---

## 📋 **Deployment Checklist**

### Before Deployment
- [x] Code pushed to GitHub
- [x] MongoDB Atlas database created
- [x] Seed data loaded
- [x] .gitignore configured
- [x] README.md complete

### Backend (Railway)
- [ ] Railway account created
- [ ] Backend service deployed
- [ ] Environment variables added
- [ ] Backend URL obtained
- [ ] API endpoints tested

### Frontend (Vercel)
- [ ] API URL updated to use env variable
- [ ] Changes committed and pushed
- [ ] Vercel account created
- [ ] Frontend deployed
- [ ] VITE_API_URL environment variable set
- [ ] Website tested in browser

### Mobile (Optional)
- [ ] API URL updated to production
- [ ] Expo build created
- [ ] APK/IPA downloaded
- [ ] App tested on device

---

## 🔧 **Troubleshooting**

### Backend Issues

**Problem**: Railway deployment failed
```bash
Solution: Check logs in Railway dashboard
- Ensure package.json has correct "start" script
- Verify all dependencies are in package.json
- Check environment variables are set
```

**Problem**: Database connection failed
```bash
Solution: 
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check connection string is correct
- Ensure database user has read/write permissions
```

### Frontend Issues

**Problem**: API calls failing (CORS errors)
```bash
Solution: 
- Ensure backend has CORS enabled (already done)
- Check VITE_API_URL is correct
- Verify Railway backend is running
```

**Problem**: Environment variables not working
```bash
Solution:
- Redeploy on Vercel after adding variables
- Check variable name is VITE_API_URL (not API_URL)
- Ensure variable is set for Production environment
```

---

## 🌍 **Your Deployed URLs**

After deployment, update these:

### Production URLs
```
Backend API: https://_____________________.railway.app
Frontend Web: https://_____________________.vercel.app
Mobile App: [Expo QR Code or APK link]
GitHub Repo: https://github.com/priyasharma2106/micro-marketplace
```

---

## 📊 **Post-Deployment Testing**

### 1. Test Backend API
```bash
# Get all products
curl https://your-backend.railway.app/api/products

# Register user
curl -X POST https://your-backend.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"password123"}'
```

### 2. Test Frontend
- [ ] Can access website
- [ ] Can register new user
- [ ] Can login
- [ ] Can view products
- [ ] Search works
- [ ] Pagination works
- [ ] Can add/remove favorites
- [ ] Toast notifications appear

### 3. Test Mobile
- [ ] Can scan QR code
- [ ] Can login
- [ ] Can view products
- [ ] Navigation works
- [ ] Can add to favorites

---

## 🎯 **Quick Deployment Commands**

### If you need to push code again:
```bash
cd c:\Users\priya\micro_marketplace

# Stage changes
git add .

# Commit
git commit -m "Your commit message"

# Push to GitHub
git push origin main
```

### Vercel will auto-deploy when you push to main!
### Railway will auto-deploy when you push to main!

---

## 📝 **Important Notes**

1. **Free Tier Limits**:
   - Railway: $5 free credit/month
   - Vercel: Unlimited for personal projects
   - MongoDB Atlas: 512 MB free

2. **Auto-Deployment**:
   - Both Railway and Vercel auto-deploy when you push to GitHub
   - No need to manually deploy again

3. **Custom Domains** (Optional):
   - Railway: Add custom domain in settings
   - Vercel: Add domain in project settings

4. **Monitoring**:
   - Railway: View logs in dashboard
   - Vercel: View analytics and logs
   - MongoDB: Monitor usage in Atlas

---

## 🎉 **Final Steps**

### 1. Update README.md
Add your deployed URLs:

```markdown
## 🌍 Live Demo

- **Frontend**: https://your-app.vercel.app
- **Backend API**: https://your-backend.railway.app
- **GitHub**: https://github.com/priyasharma2106/micro-marketplace
```

### 2. Create a Demo Video (Optional)
- Show the live website
- Demonstrate features
- Show mobile app
- Explain the code

### 3. Share Your Project
- Add to your resume
- Share on LinkedIn
- Add to portfolio

---

## ✅ **You're Ready to Deploy!**

Follow these steps in order:
1. ✅ Push to GitHub (Step 1)
2. ✅ Deploy Backend to Railway (Step 2)
3. ✅ Deploy Frontend to Vercel (Step 3)
4. ⭐ Optional: Build Mobile App (Step 4)

Good luck! 🚀
