# GitHub Pages Deployment Guide

This guide will walk you through deploying your portfolio to GitHub Pages using GitHub Actions.

## Repository Information
- **Repository Name:** portfolio
- **Username:** sh-shukla
- **Repository URL:** https://github.com/sh-shukla/portfolio
- **Live Site URL:** https://sh-shukla.github.io/portfolio

## Prerequisites

- GitHub account
- Git installed on your local machine
- Node.js (v18 or higher) and npm installed
- Your project code ready

## Step 1: Repository Setup

Your repository is already set up at: https://github.com/sh-shukla/portfolio

## Step 2: Configuration Files

The following files have been configured for GitHub Pages deployment:

### vite.config.ts
- Added `base: '/portfolio/'` for proper asset loading on GitHub Pages

### .github/workflows/deploy.yml
- GitHub Actions workflow for automatic deployment
- Triggers on push to main branch
- Uses official GitHub Pages actions

## Step 3: Enable GitHub Pages

1. **Go to your repository settings:**
   - Navigate to https://github.com/sh-shukla/portfolio
   - Click on "Settings" tab

2. **Configure Pages:**
   - Scroll down to "Pages" section in the left sidebar
   - Under "Source", select "GitHub Actions"
   - Save the settings

## Step 4: Deploy

1. **Push your code:**
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```

2. **Monitor deployment:**
   - Go to "Actions" tab in your repository
   - Watch the "Deploy to GitHub Pages" workflow
   - Deployment typically takes 2-5 minutes

3. **Access your site:**
   - Your portfolio will be live at: https://sh-shukla.github.io/portfolio
   - The URL will also be shown in the Actions workflow output

## Step 5: Automatic Updates

Once set up, your site will automatically update whenever you:
- Push changes to the main branch
- The GitHub Actions workflow will build and deploy automatically

## Troubleshooting

### Common Issues:

1. **404 Error:**
   - Ensure GitHub Pages is set to "GitHub Actions" source
   - Check that the workflow completed successfully
   - Verify the base path in vite.config.ts matches your repo name

2. **Assets not loading:**
   - Confirm `base: '/portfolio/'` is set in vite.config.ts
   - Check browser developer tools for 404 errors on assets

3. **Build fails:**
   - Check the Actions tab for error logs
   - Run `npm run build` locally to test
   - Ensure all dependencies are properly installed

4. **Workflow doesn't trigger:**
   - Verify the workflow file is in `.github/workflows/deploy.yml`
   - Check that you're pushing to the main branch
   - Ensure GitHub Pages is enabled in repository settings

### Manual Trigger

You can manually trigger deployment:
1. Go to Actions tab
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button

## Environment Variables

If your project needs environment variables:
1. Go to repository Settings > Secrets and variables > Actions
2. Add your secrets
3. Reference them in the workflow file with `${{ secrets.SECRET_NAME }}`

## Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file to the `public/` directory with your domain
2. Configure DNS to point to `sh-shukla.github.io`
3. Enable custom domain in GitHub Pages settings

## Monitoring

- **Deployment Status:** Check the Actions tab
- **Site Status:** Visit https://sh-shukla.github.io/portfolio
- **Logs:** Available in the workflow run details

Your portfolio is now configured for automatic GitHub Pages deployment! 🚀

## Next Steps

1. Push your changes to trigger the first deployment
2. Enable GitHub Pages in repository settings
3. Wait for the workflow to complete
4. Visit your live site at https://sh-shukla.github.io/portfolio