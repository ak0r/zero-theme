import type { BreadcrumbItem } from '@/components/widgets/Breadcrumb.astro';

/**
 * Breadcrumb Utilities
 * Auto-generate breadcrumb trails for different content types
 */

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => capitalize(word))
    .join(' ');
}

// ============================================================================
// AUTO-GENERATE BREADCRUMBS FROM URL
// ============================================================================

/**
 * Generate breadcrumbs from URL path
 * Example: /posts/my-post → Home > Posts > My Post
 */
export function getBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  // Remove leading/trailing slashes and split
  const parts = pathname.replace(/^\/|\/$/g, '').split('/');
  
  // If homepage, return empty (Breadcrumb component will add Home)
  if (parts.length === 0 || parts[0] === '') {
    return [];
  }

  const breadcrumbs: BreadcrumbItem[] = [];
  let currentPath = '';

  parts.forEach((part, index) => {
    currentPath += `/${part}`;
    const isLast = index === parts.length - 1;

    breadcrumbs.push({
      label: slugToTitle(part),
      href: isLast ? undefined : currentPath, // Last item has no href
    });
  });

  return breadcrumbs;
}

// ============================================================================
// COLLECTION-SPECIFIC BREADCRUMBS
// ============================================================================

/**
 * Generate breadcrumbs for a blog post
 */
export function getPostBreadcrumbs(postSlug: string, postTitle?: string): BreadcrumbItem[] {
  return [
    { label: 'Posts', href: '/posts' },
    { label: postTitle || slugToTitle(postSlug) }, // No href for current page
  ];
}

/**
 * Generate breadcrumbs for a post tag page
 */
export function getPostTagBreadcrumbs(tag: string): BreadcrumbItem[] {
  return [
    { label: 'Posts', href: '/posts' },
    { label: `Tag: ${tag}` },
  ];
}

/**
 * Generate breadcrumbs for a doc/note
 */
export function getDocBreadcrumbs(docSlug: string, docTitle?: string): BreadcrumbItem[] {
  return [
    { label: 'Notes', href: '/docs' },
    { label: docTitle || slugToTitle(docSlug) },
  ];
}

/**
 * Generate breadcrumbs for a doc tag page
 */
export function getDocTagBreadcrumbs(tag: string): BreadcrumbItem[] {
  return [
    { label: 'Notes', href: '/docs' },
    { label: `Tag: ${tag}` },
  ];
}

/**
 * Generate breadcrumbs for a doc series page
 */
export function getDocSeriesBreadcrumbs(seriesName: string): BreadcrumbItem[] {
  return [
    { label: 'Notes', href: '/docs' },
    { label: `Series: ${seriesName}` },
  ];
}

/**
 * Generate breadcrumbs for a project
 */
export function getProjectBreadcrumbs(projectSlug: string, projectTitle?: string): BreadcrumbItem[] {
  return [
    { label: 'Projects', href: '/projects' },
    { label: projectTitle || slugToTitle(projectSlug) },
  ];
}

/**
 * Generate breadcrumbs for a page
 */
export function getPageBreadcrumbs(pageSlug: string, pageTitle?: string): BreadcrumbItem[] {
  // Pages are typically at root level, so just return the page title
  return [
    { label: pageTitle || slugToTitle(pageSlug) },
  ];
}

// ============================================================================
// SERIES-AWARE BREADCRUMBS (For Docs/Notes)
// ============================================================================

/**
 * Generate breadcrumbs for a doc that's part of a series
 */
export function getDocInSeriesBreadcrumbs(
  docSlug: string,
  docTitle: string,
  seriesName: string,
  seriesSlug?: string
): BreadcrumbItem[] {
  return [
    { label: 'Notes', href: '/docs' },
    { 
      label: seriesName, 
      href: seriesSlug ? `/docs/series/${seriesSlug}` : undefined 
    },
    { label: docTitle },
  ];
}

// ============================================================================
// CATEGORY/FOLDER-BASED BREADCRUMBS
// ============================================================================

/**
 * Generate breadcrumbs with category/folder structure
 * Example: Home > Posts > Tutorials > My Tutorial
 */
export function getCategoryBreadcrumbs(
  collection: 'posts' | 'docs' | 'projects',
  category: string,
  slug: string,
  title?: string
): BreadcrumbItem[] {
  const collectionLabel = collection === 'docs' ? 'Notes' : capitalize(collection);
  
  return [
    { label: collectionLabel, href: `/${collection}` },
    { label: category, href: `/${collection}/category/${category.toLowerCase()}` },
    { label: title || slugToTitle(slug) },
  ];
}

// ============================================================================
// SMART BREADCRUMB GENERATOR (Auto-detect)
// ============================================================================

/**
 * Smart breadcrumb generator
 * Analyzes the URL and generates appropriate breadcrumbs
 */
export function getSmartBreadcrumbs(
  pathname: string,
  options?: {
    title?: string;
    collection?: 'posts' | 'docs' | 'projects' | 'pages';
    tag?: string;
    series?: string;
    category?: string;
  }
): BreadcrumbItem[] {
  const { title, collection, tag, series, category } = options || {};

  // Parse pathname
  const parts = pathname.replace(/^\/|\/$/g, '').split('/');
  
  // Homepage
  if (parts.length === 0 || parts[0] === '') {
    return [];
  }

  // Detect collection from URL
  const detectedCollection = parts[0] as 'posts' | 'docs' | 'projects' | 'pages';

  // Tag pages: /posts/tag/astro or /docs/tag/obsidian
  if (parts[1] === 'tag' && tag) {
    if (detectedCollection === 'posts') {
      return getPostTagBreadcrumbs(tag);
    } else if (detectedCollection === 'docs') {
      return getDocTagBreadcrumbs(tag);
    }
  }

  // Series pages: /docs/series/getting-started
  if (parts[1] === 'series' && series) {
    return getDocSeriesBreadcrumbs(series);
  }

  // Category pages
  if (category) {
    const slug = parts[parts.length - 1];
    return getCategoryBreadcrumbs(detectedCollection, category, slug, title);
  }

  // Single content pages
  if (parts.length === 2) {
    const slug = parts[1];
    
    if (detectedCollection === 'posts') {
      return getPostBreadcrumbs(slug, title);
    } else if (detectedCollection === 'docs') {
      // Check if part of series
      if (series) {
        return getDocInSeriesBreadcrumbs(slug, title || slugToTitle(slug), series);
      }
      return getDocBreadcrumbs(slug, title);
    } else if (detectedCollection === 'projects') {
      return getProjectBreadcrumbs(slug, title);
    } else if (detectedCollection === 'pages') {
      return getPageBreadcrumbs(slug, title);
    }
  }

  // Fallback: generate from path
  return getBreadcrumbsFromPath(pathname);
}