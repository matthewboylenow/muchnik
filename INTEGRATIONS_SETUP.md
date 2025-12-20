# Unsplash & Fathom Analytics Integration Setup

## Overview
This document provides setup instructions for the newly integrated Unsplash image search and Fathom Analytics features.

---

## ✅ What's Been Implemented

### Unsplash Integration
- ✅ API route for searching Unsplash images (`/api/unsplash/search`)
- ✅ Beautiful image picker modal component
- ✅ Integration in blog post create/edit pages
- ✅ Proper attribution links for Unsplash images

### Fathom Analytics Integration
- ✅ Tracking script automatically loads on all pages
- ✅ Page view tracking on route changes
- ✅ Admin analytics dashboard page (`/admin/analytics`)
- ✅ Embedded Fathom dashboard viewer

---

## 🔧 Setup Instructions

### 1. Unsplash Configuration

#### Get Your Unsplash API Key
1. Go to [https://unsplash.com/developers](https://unsplash.com/developers)
2. Click "Register as a developer"
3. Create a new application
4. Copy your **Access Key**

#### Update Environment Variables
Replace the placeholder in `.env.local`:
```bash
UNSPLASH_ACCESS_KEY="your_actual_unsplash_access_key_here"
```

#### Test the Integration
1. Log into the admin panel at `/admin/login`
2. Go to "Blog Posts" → "Create New Post"
3. Click the **"Unsplash"** button in the Featured Image section
4. Search for images and select one
5. The image URL will automatically populate

---

### 2. Fathom Analytics Configuration

#### Get Your Fathom Site ID
1. Log in to [Fathom Analytics](https://app.usefathom.com)
2. Go to **Settings** → **Sites**
3. Select your site
4. Copy the **Site ID** (looks like: `ABCDEFG`)

#### Update Environment Variables
Replace the placeholder in `.env.local`:
```bash
NEXT_PUBLIC_FATHOM_SITE_ID="your_fathom_site_id_here"
```

#### Enable Dashboard Sharing (Optional)
To view analytics in the admin panel:

1. In Fathom, go to **Settings** → **Sites** → Your Site
2. Click the **"Sharing"** tab
3. Toggle **"Share via link"** to ON
4. Set a **password** for the shared dashboard
5. Copy this password (you'll need it in the admin panel)

#### View Analytics in Admin Panel
1. Log into admin at `/admin/login`
2. Click **"Analytics"** in the sidebar
3. Enter your Fathom sharing password
4. View your embedded analytics dashboard

**Alternative:** You can always view analytics directly at [app.usefathom.com](https://app.usefathom.com)

---

## 📊 Features

### Unsplash Image Picker
- **Search** - Search millions of high-quality images
- **Preview** - See photographer attribution
- **Auto-attribution** - Proper credit links added automatically
- **Free to use** - All images are free for commercial use

### Fathom Analytics Dashboard
- **Privacy-focused** - GDPR & CCPA compliant
- **Real-time stats** - Live visitor counts
- **No cookie banners needed** - Doesn't use cookies
- **Fast & lightweight** - Won't slow down your site
- **Shareable** - Embed dashboard for clients

---

## 🚀 Deployment

### Add to Vercel Environment Variables
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:
   ```
   UNSPLASH_ACCESS_KEY=your_access_key
   NEXT_PUBLIC_FATHOM_SITE_ID=your_site_id
   ```
4. Redeploy the site

### After Deployment
1. Test Unsplash integration in admin panel
2. Verify Fathom tracking is active (check Fathom dashboard for live visitors)
3. Set up Fathom dashboard sharing if you want to embed it in admin

---

## 🔍 How to Use

### Creating Blog Posts with Unsplash Images

1. **Go to Admin** → Blog Posts → Create New Post
2. **Click "Unsplash"** button in Featured Image section
3. **Search** for relevant images (e.g., "estate planning", "elder care", "legal documents")
4. **Click an image** to select it
5. **The URL auto-fills** - Save and publish!

### Viewing Analytics

**Option 1: In Admin Panel**
- Admin → Analytics → Enter share password → View embedded dashboard

**Option 2: Direct Access**
- Go to [app.usefathom.com](https://app.usefathom.com)
- Log in with your Fathom credentials
- View full analytics with all features

---

## 💡 Tips

### Unsplash Best Practices
- Search for specific terms related to your content
- Use landscape orientation images for better blog headers
- Attribution is automatically added - no extra work needed
- Images are cached by Unsplash CDN for fast loading

### Fathom Analytics Tips
- **Share with clients** - Use the dashboard sharing feature to give clients read-only access
- **Set goals** - Track specific events like form submissions
- **Export data** - Download reports as CSV
- **Monitor real-time** - See live visitors in the dashboard

---

## 🆘 Troubleshooting

### Unsplash Not Loading
- ✅ Check that `UNSPLASH_ACCESS_KEY` is set correctly
- ✅ Verify your Unsplash app is active (not demo mode)
- ✅ Check browser console for errors

### Fathom Not Tracking
- ✅ Verify `NEXT_PUBLIC_FATHOM_SITE_ID` is set correctly
- ✅ Check that tracking script loads in browser DevTools → Network tab
- ✅ Wait a few minutes - Fathom may have slight delay
- ✅ Make sure site is deployed (tracking doesn't work on localhost by default)

### Analytics Dashboard Won't Embed
- ✅ Make sure sharing is enabled in Fathom settings
- ✅ Check that you're using the correct share password
- ✅ Verify the Site ID matches your Fathom account

---

## 📝 Next Steps

1. ✅ Add your Unsplash Access Key to environment variables
2. ✅ Add your Fathom Site ID to environment variables
3. ✅ Deploy changes to Vercel/production
4. ✅ Test Unsplash image picker in admin panel
5. ✅ Verify Fathom tracking is working
6. ✅ (Optional) Set up Fathom dashboard sharing
7. ✅ Share analytics access with client if needed

---

**Everything is ready to go! Just add your API credentials and deploy.** 🎉
