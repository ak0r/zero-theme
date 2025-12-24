---
title: "Getting Started"
description: "Set up Zero theme in five minutes"
series: "Zero Setup Guide"
seriesOrder: 1
---

Zero is an Astro blog theme for Obsidian users. This guide gets you from clone to published in five minutes.

## Prerequisites

You need Node.js installed (version 18 or higher). Check with `node --version` in your terminal. If you don't have it, download from nodejs.org.

That's it. Git is optional - you can download the theme as a zip file if you prefer.

## Installation

Clone or download the Zero theme repository:

```bash
git clone https://github.com/yourusername/zero-theme.git my-blog
cd my-blog
```

Install dependencies:

```bash
npm install
```

This takes a minute. Once done, start the development server:

```bash
npm run dev
```

Open your browser to `http://localhost:4321`. You'll see the theme with example content.

## Project Structure

The folders you'll work with:

- `src/content/posts/` - Your blog posts
- `src/content/docs/` - Documentation and notes
- `src/content/projects/` - Project showcases
- `src/content/pages/` - Static pages like About
- `public/` - Images and static files

Everything else (components, layouts, utilities) is infrastructure you rarely need to touch.

## Your First Post

Create a new file in `src/content/posts/` named `hello-world.md`:

```markdown
---
title: "Hello World"
description: "My first post"
date: 2024-12-22
tags: ["intro"]
---

This is my first post with Zero theme.

It supports **markdown** and all Obsidian features.
```

Save the file. The dev server detects the change and reloads your browser. Your post appears at `/posts/hello-world`.

## Configuration

Edit `src/site.config.ts` to customize your site:

```typescript
export default {
  title: 'My Blog',
  description: 'Thoughts and tutorials',
  author: 'Your Name',
  siteUrl: 'https://yourblog.com',
}
```

Changes apply immediately in development mode.

## Building for Production

When ready to deploy:

```bash
npm run build
```

This creates a `dist/` folder with your static site. Upload this folder to any web host.

## What's Next

The theme works now, but you'll want to customize it and set up your writing workflow. The next guides cover:

- Setting up Obsidian as your CMS
- Optional software and plugins
- Deployment options
- Theme configuration

For now, try creating a few posts and exploring the features. Everything works out of the box - no complex configuration required.

## Getting Help

If something doesn't work, check the example content in the theme. It demonstrates all features and serves as a reference.

For bugs or questions, open an issue on GitHub. The community is helpful and responses are usually quick.
