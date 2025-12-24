---
title: "Deployment"
description: "Deploy your Zero blog to production"
series: "Zero Setup Guide"
seriesOrder: 4
---

Zero generates static HTML that works on any web host. This guide covers the most popular deployment options.

## Build Your Site

Before deploying, build your site:

```bash
npm run build
```

This creates a `dist/` folder with your complete site. Everything in `dist/` is static HTML, CSS, and JavaScript that runs anywhere.

## Vercel (Recommended)

Vercel offers free hosting for static sites with automatic deployments from GitHub.

Create an account on vercel.com. Click "Import Project" and connect your GitHub repository. Vercel detects Astro automatically and sets up builds.

Each push to your repository triggers a new deployment. Your site updates automatically within minutes.

Custom domains are free. Add your domain in project settings, update DNS, and SSL certificates are automatic.

## Netlify

Similar to Vercel, Netlify offers free hosting with automatic deployments.

Sign up on netlify.com and connect your GitHub repository. Netlify detects Astro and configures build settings.

Set build command to `npm run build` and publish directory to `dist/`. Deploy with each push to main branch.

Custom domains and SSL are free. Netlify includes forms and serverless functions if you need them later.

## Cloudflare Pages

Cloudflare Pages offers free hosting with excellent performance thanks to their global CDN.

Sign in to cloudflare.com and go to Pages. Connect your GitHub repository and set:

- Build command: `npm run build`
- Build output: `dist`

Deploy automatically on each push. Custom domains are free with Cloudflare's DNS.

## GitHub Pages

Free hosting directly from your repository. Works well for personal or project sites.

Add a GitHub Actions workflow file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Enable GitHub Pages in repository settings and select the `gh-pages` branch.

## Manual Deployment

If you prefer managing your own server, upload the `dist/` folder to any web host.

Via FTP, SFTP, or rsync:

```bash
rsync -avz dist/ user@yourserver.com:/var/www/html/
```

Configure your web server (Apache, Nginx) to serve static files from that directory.

## Custom Domain

All platforms above support custom domains. The general process:

1. Add domain in platform settings
2. Update DNS records to point to platform
3. Wait for DNS propagation (up to 24 hours)
4. SSL certificate generates automatically

Most platforms handle SSL automatically through Let's Encrypt.

## Build Performance

Zero builds quickly - typical sites build in under 30 seconds. For larger blogs:

- Image optimization adds time (worth it)
- 100+ posts might take a minute
- Incremental builds help in development

All platforms have sufficient build time limits for Zero sites.

## Environment Variables

If you add features that need secrets (analytics, API keys), platforms support environment variables.

Add them in platform dashboard. Access in code with `import.meta.env.VARIABLE_NAME`.

Never commit secrets to your repository.

## Deploy Previews

Vercel, Netlify, and Cloudflare generate preview URLs for pull requests. This lets you test changes before merging.

Useful if multiple people contribute or you want to review before publishing.

## Rollbacks

All platforms keep deployment history. If something breaks, rollback to a previous version in the dashboard.

This is instant - no need to revert Git commits unless you want to.

## Monitoring

Most platforms show:

- Build logs
- Deployment status
- Bandwidth usage
- Function invocations (if using serverless)

Check these if something goes wrong.

## Cost

All platforms mentioned are free for personal blogs with reasonable traffic. You pay only if you need:

- Very high bandwidth (hundreds of GB/month)
- Team features
- Enterprise support

A typical blog stays free forever.

## What to Choose

For most people: **Vercel or Netlify**. Both are excellent, well-documented, and free.

For performance-focused: **Cloudflare Pages**. Global CDN with excellent speed.

For simplicity: **GitHub Pages**. No separate account needed if you use GitHub.

For control: **Manual deployment** to your own server.

They all work well with Zero. Pick what you're comfortable with.

## Next Steps

Your blog is now live. The next guides cover theme configuration - customizing colors, layout, and features to make the blog yours.
