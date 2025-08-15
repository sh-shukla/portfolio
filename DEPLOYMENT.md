# GitHub Pages Deployment Guide

This guide will walk you through deploying your Shashank DevOps Hub portfolio to GitHub Pages.

## Prerequisites

- GitHub account
- Git installed on your local machine
- Node.js (v16 or higher) and npm installed
- Your project code ready

## Step 1: Prepare Your Repository

1. **Create a new repository on GitHub:**
   - Go to [GitHub](https://github.com) and click "New repository"
   - Name it `shashank-devops-hub` (or your preferred name)
   - Make it public (required for free GitHub Pages)
   - Don't initialize with README (we'll push existing code)

2. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/shashank-devops-hub.git
   git push -u origin main
   ```

## Step 2: Install GitHub Pages Dependencies

1. **Install gh-pages package:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json:**
   Add these lines to your `package.json`:
   ```json
   {
     "homepage": "https://YOUR_USERNAME.github.io/shashank-devops-hub",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

## Step 3: Configure Vite for GitHub Pages

1. **Update vite.config.ts:**
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react-swc'
   import path from "path"

   export default defineConfig({
     plugins: [react()],
     base: '/shashank-devops-hub/', // Replace with your repo name
     resolve: {
       alias: {
         "@": path.resolve(__dirname, "./src"),
       },
     },
   })
   ```

## Step 4: Deploy to GitHub Pages

1. **Build and deploy:**
   ```bash
   npm run deploy
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Select "gh-pages" branch and "/ (root)" folder
   - Click "Save"

## Step 5: Set Up Automatic Deployment (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build
      run: npm run build

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## Step 6: Verify Deployment

1. **Check deployment status:**
   - Go to "Actions" tab in your repository
   - Verify the workflow completed successfully

2. **Access your site:**
   - Your site will be available at: `https://YOUR_USERNAME.github.io/shashank-devops-hub`
   - It may take a few minutes to become available

## Troubleshooting

### Common Issues:

1. **404 Error:**
   - Check that `base` in `vite.config.ts` matches your repository name
   - Ensure GitHub Pages is enabled and using `gh-pages` branch

2. **Assets not loading:**
   - Verify the `base` path in `vite.config.ts`
   - Check that all asset paths are relative

3. **Build fails:**
   - Run `npm run build` locally to check for errors
   - Ensure all dependencies are installed

4. **Deployment fails:**
   - Check GitHub Actions logs for specific errors
   - Verify repository permissions

### Manual Deployment:

If automatic deployment doesn't work:
```bash
# Build the project
npm run build

# Deploy manually
npm run deploy
```

## Environment Variables

If your project uses environment variables:

1. **For build-time variables:**
   - Add them to GitHub repository secrets
   - Reference them in the workflow file

2. **For runtime variables:**
   - Use Vite's environment variable system
   - Prefix with `VITE_` for client-side access

## Custom Domain (Optional)

To use a custom domain:

1. **Add CNAME file:**
   ```bash
   echo "yourdomain.com" > public/CNAME
   ```

2. **Configure DNS:**
   - Add CNAME record pointing to `YOUR_USERNAME.github.io`

3. **Enable in GitHub:**
   - Go to repository Settings > Pages
   - Enter your custom domain
   - Enable "Enforce HTTPS"

## Maintenance

- **Update dependencies:** `npm update`
- **Redeploy:** `npm run deploy`
- **Monitor:** Check GitHub Actions for deployment status

Your portfolio is now live on GitHub Pages! 🚀