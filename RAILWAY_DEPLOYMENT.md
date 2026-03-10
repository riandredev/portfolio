# Railway Deployment Guide

## Setup Instructions

### 1. Create a Railway Account
- Go to [railway.app](https://railway.app)
- Sign up with GitHub

### 2. Connect Your Repository
- Create a new project in Railway
- Select "Deploy from GitHub"
- Connect your portfolio repository

### 3. Environment Variables
Railway will automatically detect this is a Next.js project. Set these environment variables in your Railway project:

```
NODE_ENV=production
AUTH_TOKEN=your_auth_token_here
MONGODB_URI=your_mongodb_connection_string
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
```

Additionally, add any other environment variables you were using with Vercel:
- Spotify API credentials (if applicable)
- Any other service API keys

### 4. Database & Services
If you have MongoDB or other services:
- Add them to your Railway project
- Railway will automatically inject connection strings as environment variables

### 5. Deployment
Once connected, Railway will:
1. Automatically detect the Next.js project
2. Run `npm run build` during the build phase
3. Run `npm start` to start the application
4. Assign a public URL to your project

### 6. Custom Domain
- Go to Settings in your Railway project
- Add your custom domain
- Update your domain's DNS records to point to Railway's servers

## Configuration Files Added
- **railway.json** - Railway-specific configuration
- **Procfile** - Defines how to start the application
- **.railwayignore** - Files to exclude from deployment

## Key Differences from Vercel

| Feature | Vercel | Railway |
|---------|--------|---------|
| Build System | Serverless | Standard Container |
| Port Handling | Automatic | Uses PORT environment variable |
| Environment | Managed via dashboard | Via Config/Secrets |
| Scaling | Serverless auto-scaling | Manual or auto-scaling options |

## Testing Locally
Before deploying, test the production build locally:

```bash
npm run build
npm start
```

Your app will be available at `http://localhost:3000`

Railway will automatically set the `PORT` environment variable, so your Next.js app will listen on the assigned port.

## Need Help?
- [Railway Documentation](https://docs.railway.app)
- [Next.js on Railway](https://docs.railway.app/guides/nextjs)
