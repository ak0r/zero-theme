---
title: "Site Configuration"
description: "Customize your blog's settings and behavior"
series: "Zero Setup Guide"
seriesOrder: 5
---

Zero's main configuration lives in `src/site.config.ts`. This file controls your site's metadata, features, and behavior.

## Basic Settings

Open `src/site.config.ts` and edit these fields:

```typescript
export default {
  // Site identity
  title: 'Your Blog Name',
  description: 'Brief description of your blog',
  author: 'Your Name',
  siteUrl: 'https://yourblog.com',
  
  // Social links
  twitter: '@yourhandle',
  github: 'yourusername',
  
  // Features
  postsPerPage: 10,
  showReadingTime: true,
}
```

Changes apply immediately in development mode. Restart the dev server if something doesn't update.

## Navigation Menu

Edit the navigation links in the same file:

```typescript
navigation: [
  { name: 'Posts', href: '/posts' },
  { name: 'Docs', href: '/docs' },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
]
```

Add or remove items as needed. The theme generates the menu automatically.

## Homepage Options

Control what appears on your homepage:

```typescript
homeOptions: {
  featuredPost: {
    enabled: true,  // Show featured post
  },
  recentPosts: {
    count: 6,  // Number of recent posts to show
  },
}
```

Featured posts are controlled by frontmatter - add `featured: true` to any post to feature it.

## Date Format

Change how dates display:

```typescript
dateFormat: {
  locale: 'en-US',
  options: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
}
```

This uses JavaScript's `Intl.DateTimeFormat`. Customize to match your preferences.

## RSS Feed

Configure your RSS feed:

```typescript
rss: {
  title: 'Your Blog RSS Feed',
  description: 'Latest posts from your blog',
  site: 'https://yourblog.com',
  items: 20,  // Number of posts in feed
}
```

The feed generates automatically at `/rss.xml`.

## Analytics

Add analytics by editing `src/layouts/BaseLayout.astro`. Insert your tracking script:

```html
<script defer data-domain="yourblog.com" 
  src="https://plausible.io/js/script.js">
</script>
```

This works for Plausible, Fathom, Umami, or any analytics provider.

## Comments

Zero doesn't include comments by default, but you can add them. Popular options:

**Giscus** - GitHub-based comments
**Utterances** - Similar to Giscus
**Disqus** - Traditional commenting platform

Add the script to your post layout (`src/layouts/PostLayout.astro`).

## Search

Zero includes basic search. Enable or disable in config:

```typescript
search: {
  enabled: true,
  placeholder: 'Search posts...',
}
```

Search indexes post titles, descriptions, and content. It's client-side - no server required.

## Color Theme

Zero uses CSS variables for colors. Edit `src/styles/global.css`:

```css
:root {
  --color-primary: ...;
  --color-accent: ...;
}
```

Dark mode variables are in the `[data-theme="dark"]` selector.

Full theme customization guide coming in the next doc.

## Fonts

Change fonts in `astro.config.mjs`:

```javascript
fonts: [
  {
    name: "Inter",
    provider: fontProviders.fontsource(),
    weights: [400, 700],
  },
]
```

Zero uses Fontsource for web fonts. Browse available fonts on fontsource.org.

## Images

Image settings in `astro.config.mjs`:

```javascript
image: {
  responsiveStyles: true,  // Responsive images
  layout: "constrained",   // Layout mode
}
```

Zero converts images to WebP automatically. No configuration needed.

## Build Settings

Rarely need to change these, but they're in `astro.config.mjs`:

```javascript
build: {
  format: "file",  // Clean URLs without .html
}
```

## What Not to Edit

Avoid editing:

- `src/content.config.ts` - Collection schemas (covered in next doc)
- `astro.config.mjs` - Unless you know what you're doing
- Component files - Unless customizing layout

Stick to `site.config.ts` for most changes.

## Testing Changes

After editing config, check:

- Homepage renders correctly
- Navigation works
- RSS feed validates
- Build completes without errors

Run `npm run build` to catch issues before deploying.

## Next Steps

With site config done, the next guide covers content collection configuration - how to customize your post, doc, and project schemas.
