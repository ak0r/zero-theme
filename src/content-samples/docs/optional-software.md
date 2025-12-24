---
title: "Optional Software"
description: "Git, editors, and tools that complement Zero"
series: "Zero Setup Guide"
seriesOrder: 3
---

Zero works with just Node.js and a text editor. This guide covers optional software that makes your workflow smoother.

## Git for Version Control

Git tracks changes to your content and makes deployment easier. It's not required, but most developers use it.

Download from git-scm.com. After installing, initialize your blog as a repository:

```bash
cd my-blog
git init
git add .
git commit -m "Initial commit"
```

Now you can track changes, revert mistakes, and deploy to platforms like Vercel or Netlify.

## GitHub Desktop

If you prefer a visual interface for Git, GitHub Desktop is simpler than command line. Download from desktop.github.com.

Open GitHub Desktop, add your blog repository, and use the interface to commit changes and push to GitHub.

## Alternative Editors

Obsidian works great, but you might prefer other editors:

**VS Code** - If you edit code and content in one place. Install the Markdown Preview Enhanced extension for better markdown support.

**Typora** - For distraction-free markdown writing. No splits or preview panes - WYSIWYG markdown editing.

**iA Writer** - Minimal writing focused on text. Works well if you don't need Obsidian's graph view or backlinks.

**Any Text Editor** - Markdown is plain text. Use Notepad, TextEdit, Nano, Vim, or whatever you prefer. Zero doesn't care - it just reads markdown files.

## Markdown Linters

For consistent formatting, use a markdown linter:

**markdownlint** - VS Code extension that flags formatting issues.
**Prettier** - Auto-formats markdown files. Useful if multiple people edit the blog.

Add a `.prettierrc` file to your project:

```json
{
  "proseWrap": "always",
  "tabWidth": 2
}
```

Run with `npx prettier --write "src/content/**/*.md"`.

## Image Optimization

Zero converts images to WebP during build, but you might want to optimize before adding them:

**ImageOptim** (Mac) or **Squoosh** (web) - Compress images before uploading.

**ImageMagick** - Command line tool for batch processing images.

This is optional. The build process handles basic optimization.

## Deployment Tools

Platforms like Vercel and Netlify have CLI tools for deploying from terminal:

```bash
# Vercel
npm i -g vercel
vercel

# Netlify
npm i -g netlify-cli
netlify deploy
```

But you don't need these - the web interface works fine for most people.

## Analytics

Track visitors without slowing down your site:

**Plausible** - Privacy-friendly, lightweight analytics.
**Fathom** - Similar to Plausible, focuses on privacy.
**Umami** - Open source, self-hosted analytics.

Add tracking scripts in `src/layouts/BaseLayout.astro`.

## RSS Readers

Zero generates an RSS feed automatically. Test it with a reader:

**NetNewsWire** (Mac/iOS) - Free, open source.
**Feedly** (Web) - Popular web-based reader.
**The Old Reader** (Web) - Simple interface.

Add your feed URL (`/rss.xml`) to test it works.

## GitHub

Host your repository on GitHub for free. This enables:

- Version history and collaboration
- Easy deployment to Netlify, Vercel, Cloudflare
- Issue tracking for your blog's development

Create a repository on github.com, then push your blog:

```bash
git remote add origin https://github.com/username/blog.git
git push -u origin main
```

## What You Actually Need

Realistically, most people use:

- Node.js (required)
- Obsidian or VS Code (for writing)
- Git (for deployment)

Everything else is nice to have but not necessary. Start simple and add tools as you need them.

## Next Steps

With your tools set up, you're ready to deploy your blog. The next guide covers deployment options and configuration.
