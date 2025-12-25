import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Define schema for blog posts
const postsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string().default('Untitled Post'),
    slug: z.string().optional(),
    description: z.string().nullable().optional().default('No description provided'),
    date: z.coerce.date().default(() => new Date()),
    tags: z.array(z.string()).nullable().optional(),
    draft: z.boolean().optional(),
    featured: z.boolean().optional(),
    image: z.any().nullable().optional().transform((val) => {
      // Handle various Obsidian syntax formats
      if (Array.isArray(val)) {
        // Handle array format from [[...]] syntax - take first element
        return val[0] || null;
      }
      if (typeof val === 'string') {
        // Handle string format - return as-is
        return val;
      }
      return null;
    }),
    imageOG: z.boolean().optional(),
    imageAlt: z.string().nullable().optional(),
    hideCoverImage: z.boolean().optional(),
    hideTOC: z.boolean().optional(),
    targetKeyword: z.string().nullable().optional(),
    author: z.string().nullable().optional(),
    noIndex: z.boolean().optional(),
  }),
});

// Define schema for static pages
const pagesCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string().optional().default('Untitled Page'),
    description: z.string().nullable().optional().default('No description provided'),
    draft: z.boolean().optional(),
    lastModified: z.coerce.date().optional(),
    image: z.any().nullable().optional().transform((val) => {
      // Handle various Obsidian syntax formats
      if (Array.isArray(val)) {
        // Handle array format from [[...]] syntax - take first element
        return val[0] || null;
      }
      if (typeof val === 'string') {
        // Handle string format - return as-is
        return val;
      }
      return null;
    }),
    imageAlt: z.string().nullable().optional(),
    hideCoverImage: z.boolean().optional(),
    hideTOC: z.boolean().optional(),
    noIndex: z.boolean().optional(),
  }),
});

// Define schema for projects
/**
 * Projects Collection (Frontmatter-Only)
 * 
 * For project showcase with external links
 * No body content needed - just frontmatter data
 */
const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    // ========================================================================
    // ESSENTIAL
    // ========================================================================
    title: z.string(),
    description: z.string(),
    projectUrl: z.string().url(), // External link to project
    
    // ========================================================================
    // VISUAL
    // ========================================================================
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    
    // ========================================================================
    // ORGANIZATION
    // ========================================================================
    tags: z.array(z.string()).default([]),
    status: z.enum(['active', 'archived', 'wip']).default('active'),
    featured: z.boolean().default(false),
    
    // ========================================================================
    // OPTIONAL
    // ========================================================================
    repositoryUrl: z.string().url().optional(), // GitHub/GitLab link
    date: z.coerce.date().default(() => new Date()),
    
    // ========================================================================
    // ADMIN
    // ========================================================================
    draft: z.boolean().default(false),
  }),
});


// Define schema for docs
const docsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string().default('Untitled Documentation'),
    slug: z.string().optional(),
    description: z.string().nullable().optional().default('No description provided'),
    date: z.coerce.date().default(() => new Date()),
    category: z.string().nullable().optional().default('General'),
    tags: z.array(z.string()).nullable().optional(),
    series: z.string().nullable().optional(),
    seriesOrder: z.number().nullable().optional(),
    order: z.number().default(0),
    lastModified: z.coerce.date().optional(),
    version: z.string().nullable().optional(),
    image: z.any().nullable().optional().transform((val) => {
      // Handle various Obsidian syntax formats
      if (Array.isArray(val)) {
        // Handle array format from [[...]] syntax - take first element
        return val[0] || null;
      }
      if (typeof val === 'string') {
        // Handle string format - return as-is
        return val;
      }
      return null;
    }),
    imageAlt: z.string().nullable().optional(),
    hideCoverImage: z.boolean().optional(),
    hideTOC: z.boolean().optional(),
    draft: z.boolean().optional(),
    noIndex: z.boolean().optional(),
    showTOC: z.boolean().optional(),
    featured: z.boolean().optional(),
  }),
});

// Define schema for gallery
const galleryCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/gallery' }),
  schema: z.object({
    title: z.string().default('Untitled Gallery'),
    slug: z.string().optional(),
    description: z.string().nullable().optional().default('No description provided'),
    date: z.coerce.date().default(() => new Date()),
    imageDir: z.string().optional().default('./attachments'),
    coverImage: z.string().nullable().optional(), // Cover image for gallery card
    tags: z.array(z.string()).nullable().optional().default([]),
    draft: z.boolean().optional().default(false),
    featured: z.boolean().optional().default(false),
  }),
});

// Export collections
export const collections = {
  posts: postsCollection,
  pages: pagesCollection,
  projects: projectsCollection,
  docs: docsCollection,
  gallery: galleryCollection,
};