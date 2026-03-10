# Render.com Deployment Guide

## Setup Instructions

### 1. Create a Render Account
- Go to [render.com](https://render.com)
- Sign up with GitHub

### 2. Connect Your Repository
- Click "New +" → "Web Service"
- Connect your GitHub account
- Select your portfolio repository
- Render will auto-detect the settings from `render.yaml`

### 3. Environment Variables
In your Render dashboard, set these environment variables:

```
NODE_ENV=production
AUTH_TOKEN=your_auth_token_here
MONGODB_URI=your_mongodb_connection_string
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
```

Additionally, add any other environment variables:
- Spotify API credentials (if applicable)
- Any other service API keys

### 4. Database & Services
If you have MongoDB or other services:
- Render provides free PostgreSQL, Redis, and other databases
- Add them via the "New" button in your dashboard
- Environment variables will be automatically injected

### 5. Deployment
Once connected, Render will:
1. Auto-detect and build your Next.js project
2. Run the build command: `npm install && npm run build`
3. Start your app with: `npm start`
4. Assign a free `.onrender.com` domain

**Note:** Free tier services spin down after 15 minutes of inactivity. To keep your app running 24/7, upgrade to a paid plan.

### 6. Custom Domain
- Go to "Settings" on your Render service
- Add your custom domain under "Custom Domains"
- Update your domain's DNS records pointing to Render

## Configuration Files Added
- **render.yaml** - Render-specific configuration (auto-detected)
- **Procfile** - Declares web process start command
- **.railwayignore** - Files to exclude from deployment

## Key Features of Render.com

- ✅ **Free Tier:** Fully functional with unlimited deploys
- ✅ **Easy GitHub Integration:** Auto-deploy on push
- ✅ **PostgreSQL & Redis:** Free databases included
- ✅ **SSL/TLS:** Automatic HTTPS
- ✅ **Environment Variables:** Easy dashboard management
- ⚠️ **Spin Down:** Free services become inactive after 15 minutes of no traffic

## Testing Locally
Before deploying, test the production build locally:

```bash
npm run build
npm start
```

Your app will be available at `http://localhost:3000`

## Keeping Your App Awake (Optional)
To prevent free tier spin-down, you can:
1. Set up a monitoring service to ping your app regularly
2. Use a service like UptimeRobot (free tier)
3. Configure it to ping your `.onrender.com` URL every 5-10 minutes

Or simply upgrade to a paid plan for continuous hosting.

## Need Help?
- [Render Documentation](https://render.com/docs)
- [Deploy Next.js to Render](https://render.com/docs/deploy-nextjs)
