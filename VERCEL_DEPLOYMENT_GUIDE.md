# Vercel Deployment Guide for CapCut Template Finder

This guide will walk you through deploying your CapCut Template Finder app to Vercel and configuring SEO settings.

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free tier is sufficient)
- Your project code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
- Node.js and npm installed locally (for testing)

## Step 1: Prepare Your Project

### 1.1 Update SEO Metadata

Edit `index.html` to configure your site's metadata:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Primary Meta Tags -->
    <title>CapCut Template Finder - Discover Trending Video Templates</title>
    <meta name="title" content="CapCut Template Finder - Discover Trending Video Templates" />
    <meta name="description" content="Find thousands of trending CapCut templates for your videos. Browse by category, search by keyword, and discover the perfect template for your content." />
    <meta name="keywords" content="capcut, templates, video editing, trending templates, capcut finder" />
    <meta name="author" content="Your Name or Company" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://your-domain.vercel.app/" />
    <meta property="og:title" content="CapCut Template Finder - Discover Trending Video Templates" />
    <meta property="og:description" content="Find thousands of trending CapCut templates for your videos. Browse by category, search by keyword, and discover the perfect template for your content." />
    <meta property="og:image" content="https://your-domain.vercel.app/og-image.png" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://your-domain.vercel.app/" />
    <meta property="twitter:title" content="CapCut Template Finder - Discover Trending Video Templates" />
    <meta property="twitter:description" content="Find thousands of trending CapCut templates for your videos. Browse by category, search by keyword, and discover the perfect template for your content." />
    <meta property="twitter:image" content="https://your-domain.vercel.app/og-image.png" />
    
    <!-- Additional Meta Tags -->
    <meta name="robots" content="index, follow" />
    <meta name="language" content="English" />
    <meta name="revisit-after" content="7 days" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 1.2 Create robots.txt (Already exists)

The `public/robots.txt` file should contain:

```txt
User-agent: *
Allow: /
Sitemap: https://your-domain.vercel.app/sitemap.xml
```

### 1.3 Create a Sitemap (Optional but Recommended)

Create `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://your-domain.vercel.app/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://your-domain.vercel.app/about</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://your-domain.vercel.app/contact</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://your-domain.vercel.app/privacy</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

### 1.4 Add an Open Graph Image

Create or add a 1200x630px image to `public/og-image.png`. This will be used when your site is shared on social media.

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

2. **Click "Add New..." → "Project"**

3. **Import Your Git Repository**
   - Connect your GitHub/GitLab/Bitbucket account if not already connected
   - Select your repository
   - Click "Import"

4. **Configure Project Settings**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `dist` (default)
   - **Install Command**: `npm install` (default)

5. **Environment Variables** (if needed)
   - Add any necessary environment variables
   - Example: `VITE_API_BASE_URL`

6. **Click "Deploy"**

7. Wait for the deployment to complete (usually 1-3 minutes)

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Project Root**
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? `Y`
   - Which scope? (Select your account)
   - Link to existing project? `N`
   - What's your project's name? (Enter name)
   - In which directory is your code located? `./`
   - Want to override the settings? `N`

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Step 3: Configure Custom Domain (Optional)

1. **Go to your project in Vercel Dashboard**

2. **Navigate to "Settings" → "Domains"**

3. **Add your custom domain**
   - Enter your domain name (e.g., `yoursite.com`)
   - Click "Add"

4. **Configure DNS**
   - Follow Vercel's instructions to add DNS records
   - Either add a CNAME record pointing to `cname.vercel-dns.com`
   - Or use Vercel's nameservers

5. **Wait for DNS propagation** (can take up to 48 hours, usually much faster)

## Step 4: Update URLs

After deployment, update the following:

1. **Update sitemap.xml** with your actual domain
2. **Update robots.txt** with your actual domain
3. **Update meta tags in index.html** with your actual domain
4. **Update AppSidebar.tsx** with your actual Google Play Store and Telegram links

## Step 5: SEO Optimization

### 5.1 Add Structured Data (Optional)

Add JSON-LD structured data to help search engines understand your content. Add this to `index.html` in the `<head>` section:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "CapCut Template Finder",
  "description": "Find thousands of trending CapCut templates for your videos",
  "url": "https://your-domain.vercel.app",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "Web, Android",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
</script>
```

### 5.2 Set Up Analytics

1. **Google Analytics**
   - Create a GA4 property
   - Add the tracking code to `index.html`

2. **Vercel Analytics** (Built-in)
   - Enable in Project Settings → Analytics
   - Free tier includes basic analytics

### 5.3 Submit to Search Engines

1. **Google Search Console**
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add your property
   - Verify ownership
   - Submit your sitemap

2. **Bing Webmaster Tools**
   - Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
   - Add your site
   - Verify ownership
   - Submit your sitemap

## Step 6: Configure Vercel Project Settings

### 6.1 Automatic Deployments

- **Production Branch**: Set to `main` or `master`
- **Automatic Production Deployments**: Enable
- Vercel will automatically deploy when you push to your production branch

### 6.2 Preview Deployments

- Vercel automatically creates preview deployments for pull requests
- Each preview has a unique URL

### 6.3 Environment Variables

If you need environment variables:
- Go to Project Settings → Environment Variables
- Add variables for Production, Preview, and Development as needed

## Step 7: Hiding App-Only Pages from Web

The app-only Privacy Policy page (`/privacy-policy-app`) is accessible via direct link but not shown in the web navigation. This is already configured in the sidebar component.

To completely hide it from search engines, add to your `robots.txt`:

```txt
User-agent: *
Allow: /
Disallow: /privacy-policy-app
Sitemap: https://your-domain.vercel.app/sitemap.xml
```

## Performance Optimization

### Enable Compression
Vercel automatically enables gzip/brotli compression.

### Enable Caching
Vercel automatically sets up caching headers for static assets.

### Image Optimization
Consider using Vercel's image optimization or move images to a CDN.

## Monitoring

1. **Vercel Dashboard**: Monitor deployments, logs, and analytics
2. **Real-time Logs**: View function and edge logs in real-time
3. **Performance Insights**: Check Core Web Vitals in Vercel Analytics

## Troubleshooting

### 404 Errors on Refresh

If you get 404 errors when refreshing pages, add a `vercel.json` file in your project root:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Build Fails

- Check build logs in Vercel Dashboard
- Ensure all dependencies are in `package.json`
- Test build locally: `npm run build`

### Slow Load Times

- Use Vercel Analytics to identify slow pages
- Optimize images and assets
- Implement code splitting

## Continuous Integration

Vercel automatically:
- Builds your project on every push
- Runs build checks on PRs
- Creates preview deployments
- Deploys to production when merged

## Next Steps

1. Monitor your site's performance in Vercel Analytics
2. Set up custom domain if needed
3. Submit sitemap to search engines
4. Monitor SEO performance in Google Search Console
5. Implement additional optimizations based on analytics

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Google Search Console Help](https://support.google.com/webmasters)

## Need Help?

- [Vercel Support](https://vercel.com/support)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/vercel)
