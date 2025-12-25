# Zero

A minimalist Astro blog theme designed for Obsidian users who want a seamless content management workflow.

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## Why Zero?

**Zero** bridges the gap between Obsidian's powerful note-taking capabilities and modern web publishing. If you're already using Obsidian to organize your thoughts, writing, and knowledge base, Zero lets you publish that content to the web without friction.

### The Vision

- **Write in Obsidian** - Use the tools you already love
- **Publish Effortlessly** - Push changes via Git, deploy automatically
- **Zero Configuration** - Sensible defaults that just work
- **Maximum Control** - Customize everything when you need to

### Who Is This For?

- **Obsidian Power Users** - Your vault is your CMS
- **Developers** - Full control over the stack
- **Bloggers** - Focus on writing, not configuration
- **Technical Writers** - Documentation with Obsidian's linking power

---

## Features

### 🎨 **Beautiful & Minimal Design**
- Clean, distraction-free reading experience
- Fully responsive layout
- Semantic color system with light/dark themes
- Smooth animations and transitions

### 📝 **Obsidian-Native Support**
- **Wikilinks** - `[[page]]` and `[[page|display]]`
- **Callouts** - All Obsidian callout types
- **Frontmatter** - YAML metadata
- **Attachments** - Images and files in `attachments/` folders
- **Backlinks** - See what links to each page
- **Graph View** - Visualize content connections (coming soon)

### 🔍 **Powerful Search**
- Full-text search powered by Pagefind
- Command palette (Ctrl+K or /)
- Quick navigation to posts, docs, projects
- Filter by collection and tags

### 📚 **Multiple Content Types**
- **Posts** - Blog posts with tags, series, and featured posts
- **Projects** - Portfolio items with GitHub integration
- **Docs** - Technical documentation with TOC
- **Pages** - Static pages (About, Contact, etc.)
- **Gallery** - Photo galleries with lightbox

### ⚙️ **Highly Configurable**
- Single `site.config.ts` for all settings
- Per-page frontmatter overrides
- Custom themes
- Optional features (enable only what you need)

### 🔗 **Content Features**
- **Table of Contents** - Auto-generated from headings
- **Reading Time** - Estimated reading duration
- **Post Navigation** - Previous/next post links
- **Series Support** - Group related posts
- **Draft Posts** - Hide work-in-progress
- **Featured Posts** - Highlight important content
- **RSS Feed** - Automatic generation
- **Sitemap** - SEO-friendly

### 🖼️ **Media Support**
- Responsive images
- Image grids (2-3 columns)
- Lightbox for galleries
- YouTube embeds
- Twitter embeds
- Custom image captions

### 🎨 **Customization**
- Configurable color schemes
- Typography options
- Layout width control
- Header/footer customization
- Social links
- Profile picture placement

---

## Planned Features

### 💡 **Under Consideration**
- [ ] SEO Optimisation

### 🔜 **Coming Soon**

- [ ] Comments integration (Giscus)
- [ ] Analytics integration
- [ ] Newsletter subscription
- [ ] Related posts suggestions
- [ ] Advanced graph view features

---

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm, pnpm, or yarn
- Git
- (Optional) Obsidian for content management

### Installation

#### Option 1: Use This Template

1. Click "Use this template" on GitHub
2. Clone your new repository
3. Install dependencies

```bash
git clone https://github.com/yourusername/your-blog.git
cd your-blog
npm install
```

#### Option 2: Manual Setup

```bash
# Create new Astro project
npm create astro@latest my-blog -- --template minimal

# Navigate to project
cd my-blog

# Clone Zero theme
git clone https://github.com/ak0r/zero-theme.git temp-zero
cp -r temp-zero/* .
rm -rf temp-zero

# Install dependencies
npm install
```

### Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:4321` to see your site!

---

## Configuration

### Site Settings

Edit `src/site.config.ts` to customize your site:

```typescript
export const siteConfig: SiteConfig = {
  siteURL: "https://yourdomain.com",
  title: "Your Blog",
  description: "Your blog description",
  author: "Your Name",
  
  // Enable/disable features
  commandPaletteConfig: {
    enabled: true,
    // ...
  },
  
  // More options...
}
```

### Content Structure

Zero uses Astro's content collections:

```
src/content/
├── posts/              # Blog posts
│   └── my-post/
│       ├── index.md
│       └── attachments/
├── docs/               # Documentation
├── projects/           # Portfolio items
├── pages/              # Static pages
└── gallery/            # Photo galleries
```

### Obsidian Setup

1. Create an Obsidian vault
2. Set vault location to `src/content/`
3. Configure attachments folder: `attachments/`
4. Use absolute paths from vault root

**Recommended Obsidian Plugins:**
- Astro Composer - For note templates
- Bases CMS - For CMS view
- Obsidian Git - Auto-commit changes
- Linter - Consistent formatting

---

## Content Management

### Two Workflows

#### Workflow 1: Obsidian-First (Recommended)

```
1. Write in Obsidian (src/content/)
2. Commit via Obsidian Git or manually
3. Push to GitHub
4. Site auto-deploys (Cloudflare/Vercel/Netlify)
```

#### Workflow 2: Direct Git

```
1. Edit markdown files in any editor
2. Commit and push
3. Site auto-deploys
```

### Creating Content

#### New Blog Post

```yaml
---
title: "My Post Title"
description: "Post description"
date: 2024-12-25
tags: ["tag1", "tag2"]
image: "[[posts/my-post/attachments/cover.jpg]]"
draft: false
featured: false
---

Your content here...
```

#### New Project

```yaml
---
title: "Project Name"
description: "Project description"
date: 2024-12-25
tags: ["web", "design"]
github: "https://github.com/user/repo"
link: "https://project-demo.com"
status: "completed"
---

Project details...
```

#### New Doc

```yaml
---
title: "Documentation Title"
description: "Doc description"
category: "Guide"
order: 1
---

Documentation content...
```

---

## Deployment

### Cloudflare Pages (Recommended)

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy!

---

## Customization

### Themes

Zero uses semantic color tokens defined in `src/styles/themes/`:

```css
:root[data-theme="light"] {
  --color-content-primary: #1a1a1a;
  --color-surface-primary: #ffffff;
  /* ... */
}
```

Create custom themes by adding new theme files.

### Layout

Adjust content width in `site.config.ts`:

```typescript
layout: {
  contentWidth: "md" // sm, md, lg, xl, full
}
```

---

## Advanced

### Remark/Rehype Plugins

Zero includes custom plugins for Obsidian syntax:

- `remark-obsidian-core` - Wikilinks, callouts, highlights
- `remark-image-processing` - Image paths, grids, captions
- `remark-embeds` - YouTube, Twitter embeds
- `rehype-image-attributes` - Lazy loading, WebP conversion


## Troubleshooting

### Build Errors

**Images Not Loading:**
```bash
# Check image paths are relative: ./attachments/image.jpg
# Or absolute from vault root: posts/slug/attachments/image.jpg
```

---

## Performance

Zero achieves excellent performance scores:

- **100/100** Lighthouse Performance
- **100/100** Accessibility
- **100/100** Best Practices
- **100/100** SEO

### Optimization Tips

1. Use WebP/AVIF images
2. Enable lazy loading
3. Minimize custom CSS/JS
4. Use Astro's built-in optimizations
5. Deploy on edge networks (Cloudflare)

---

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Development Guidelines

- Follow existing code style
- Test thoroughly
- Update documentation
- Add examples for new features

---

## Acknowledgements

Zero wouldn't exist without these amazing projects:

- **[Astro](https://astro.build)** - The web framework for content-driven websites
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Obsidian](https://obsidian.md)** - The knowledge base that started it all
- **[Astro Micro](https://github.com/trevortylerlee/astro-micro)** - UI design inspiration and clean aesthetic
- **[Astro Modular](https://github.com/ExceptionalAlpha/astro-modular)** - Obsidian-based CMS approach and content architecture
- **[Pagefind](https://pagefind.app)** - Lightning-fast static search
- **[Tabler Icons](https://tabler-icons.io)** - Beautiful open-source icons

Special thanks to the Astro community for building such an incredible ecosystem.

---

## License

MIT License - see [LICENSE](LICENSE) file for details.

Copyright (c) 2025 Amit K

---

## Support

- **Issues**: [GitHub Issues](https://github.com/ak0r/zero-theme/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ak0r/zero-theme/discussions)
- **Twitter**: [@trekography](https://x.com/trekography)

---

**Built with ❤️ using Astro and Obsidian**
