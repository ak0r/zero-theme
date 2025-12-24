// @ts-nocheck
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import mdx from '@astrojs/mdx';

// ============================================================================
// CONSOLIDATED PLUGINS (New - Replace multiple plugins)
// ============================================================================
import remarkObsidianCore from './src/utils/remark-obsidian-core.ts';
import remarkImageProcessing from './src/utils/remark-image-processing.ts';

// ============================================================================
// KEEP AS-IS (Already good, single-purpose plugins)
// ============================================================================
import { remarkInternalLinks } from './src/utils/internallinks.ts';
import remarkCallouts from './src/utils/remark-callouts.ts';
import remarkInlineTags from './src/utils/remark-inline-tags.ts';
import { remarkObsidianEmbeds } from './src/utils/remark-obsidian-embeds.ts';
import remarkBases from './src/utils/remark-bases.ts';

// ============================================================================
// NPM PLUGINS (Minimal essentials)
// ============================================================================
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import remarkBreaks from 'remark-breaks';

// ============================================================================
// REHYPE PLUGINS (Minimal - only what's needed)
// ============================================================================
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeImageAttributes from './src/utils/rehype-image-attributes.ts';
import { rehypeNormalizeAnchors } from './src/utils/rehype-normalize-anchors.ts';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  prefetch: true,
  build: {
    format: "file"
  },
  image: {
    responsiveStyles: true,
    layout: "constrained"
  },

  experimental: {
    contentIntellisense: true,
    fonts: [
      {
        name: "Poppins",
        cssVariable: "--font-headings",
        provider: fontProviders.fontsource(),
        weights: [400, 500, 600, 700],
        fallbacks: ["sans-serif"],
      },
      {
        name: "Inter",
        cssVariable: "--font-secondary",
        provider: fontProviders.fontsource(),
        weights: [400, 500, 600, 700],
        fallbacks: ["sans-serif"],
      },
      {
        name: "Rubik",
        cssVariable: "--font-primary",
        provider: fontProviders.fontsource(),
        weights: [400, 500, 600, 700],
        fallbacks: ["sans-serif"],
      },
      {
        name: "JetBrains Mono",
        cssVariable: "--font-code",
        provider: fontProviders.fontsource(),
        weights: [400, 500, 600, 700],
        fallbacks: ["monospace"],
      },
    ]
  },
  integrations: [icon(), mdx()],
  markdown: {
    remarkPlugins: [
      // ========================================================================
      // INTERNAL LINKS (standard markdown links)
      // ========================================================================
      remarkInternalLinks,
      
      // ========================================================================
      // OBSIDIAN CORE (wikilinks, comments, highlights)
      // ========================================================================
      remarkObsidianCore,

      // ========================================================================
      // INLINE TAGS (#tag → pills)
      // ========================================================================
      remarkInlineTags,

      // ========================================================================
      // IMAGE PROCESSING (paths, grids, captions, WebP)
      // ========================================================================
      remarkImageProcessing,

      // ========================================================================
      // OBSIDIAN EMBEDS (audio, video, PDF, YouTube, Twitter, Bases)
      // ========================================================================
      remarkObsidianEmbeds,

      // ========================================================================
      // BASES DIRECTIVE (table views from ```base blocks)
      // ========================================================================
      remarkBases,

      // ========================================================================
      // CALLOUTS (> [!note] with icons)
      // ========================================================================
      remarkCallouts,

      // ========================================================================
      // NPM PLUGINS (Minimal essentials)
      // ========================================================================
      remarkGfm,         // Tables, strikethrough, task lists
      remarkSmartypants, // Smart quotes and dashes
      remarkBreaks,      // Line break handling
    ],

    rehypePlugins: [
      // ========================================================================
      // IMAGE ATTRIBUTES (lazy loading, WebP fallback)
      // ========================================================================
      rehypeImageAttributes,

      // ========================================================================
      // ANCHOR NORMALIZATION (decode URLs, add wikilink styling)
      // ========================================================================
      rehypeNormalizeAnchors,

      // ========================================================================
      // HEADING SLUGS (skip h1)
      // ========================================================================
      [rehypeSlug, {
        test: (node) => node.tagName !== 'h1'
      }],

      // ========================================================================
      // AUTOLINK HEADINGS (clickable headings, skip h1)
      // ========================================================================
      [rehypeAutolinkHeadings, {
        behavior: 'wrap',
        test: (node) => node.tagName !== 'h1',
        properties: {
          className: ['anchor-link'],
          ariaLabel: 'Link to this section'
        }
      }],

      // ========================================================================
      // FINAL NORMALIZATION (run last to ensure fixes aren't overridden)
      // ========================================================================
      rehypeNormalizeAnchors,
    ],

    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
});
