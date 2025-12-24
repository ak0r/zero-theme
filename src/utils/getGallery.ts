import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import {
  filterDrafts,
  sortEntriesByDate,
  getUniqueTags,
  getTagCounts,
  getEntriesByTag,
  getFeaturedEntries,
} from '@/utils/entries';

export type Gallery = CollectionEntry<'gallery'>;

/**
 * Gallery Utilities
 * Uses generic entries.ts functions + gallery-specific logic
 */

// ============================================================================
// CORE FUNCTIONS (Use Generic)
// ============================================================================

/**
 * Get all galleries (excluding drafts in production)
 */
export async function getAllGalleries(): Promise<Gallery[]> {
  const allGalleries = await getCollection('gallery');
  return filterDrafts(allGalleries);
}

/**
 * Sort galleries by date (newest first)
 */
export function sortGalleriesByDate(galleries: Gallery[]): Gallery[] {
  return sortEntriesByDate(galleries);
}

/**
 * Get featured galleries
 */
export function getFeaturedGalleries(galleries: Gallery[]): Gallery[] {
  return getFeaturedEntries(galleries);
}

/**
 * Get galleries by tag
 */
export function getGalleriesByTag(galleries: Gallery[], tag: string): Gallery[] {
  return getEntriesByTag(galleries, tag);
}

/**
 * Get all unique tags
 */
export function getUniqueTags(galleries: Gallery[]): string[] {
  return getUniqueTags(galleries);
}

/**
 * Get tag counts
 */
export function getTagCounts(galleries: Gallery[]): Record<string, number> {
  return getTagCounts(galleries);
}

// ============================================================================
// GALLERY-SPECIFIC FUNCTIONS
// ============================================================================

/**
 * Get gallery images from attachments folder
 * Uses import.meta.glob for efficient scanning
 */
export async function getGalleryImages(gallerySlug: string): Promise<GalleryImage[]> {
  // Construct glob pattern for this gallery's attachments
  const pattern = `/src/content/gallery/${gallerySlug}/attachments/*.{jpg,jpeg,png,webp,gif}`;
  
  // Get all images using import.meta.glob
  const images = import.meta.glob<{ default: ImageMetadata }>(
    '/src/content/gallery/**/attachments/*.{jpg,jpeg,png,webp,gif}',
    { eager: true }
  );
  
  // Filter to only this gallery's images
  const galleryImages: GalleryImage[] = [];
  const searchPath = `/src/content/gallery/${gallerySlug}/attachments/`;
  
  for (const [path, module] of Object.entries(images)) {
    if (path.startsWith(searchPath)) {
      const filename = path.split('/').pop() || '';
      galleryImages.push({
        path,
        filename,
        image: module.default,
      });
    }
  }
  
  // Randomize order
  return shuffleArray(galleryImages);
}

/**
 * Get image count for a gallery
 */
export async function getGalleryImageCount(gallerySlug: string): Promise<number> {
  const images = await getGalleryImages(gallerySlug);
  return images.length;
}

/**
 * Get cover image for gallery card
 */
export async function getGalleryCoverImage(
  gallery: Gallery
): Promise<GalleryImage | null> {
  const images = await getGalleryImages(gallery.id);
  
  if (images.length === 0) return null;
  
  // If coverImage specified in frontmatter, find it
  if (gallery.data.coverImage) {
    const coverImage = images.find(img => 
      img.filename === gallery.data.coverImage
    );
    if (coverImage) return coverImage;
  }
  
  // Otherwise return first image
  return images[0];
}

/**
 * Gallery statistics
 */
export async function getGalleryStats(galleries: Gallery[]) {
  let totalImages = 0;
  
  for (const gallery of galleries) {
    const count = await getGalleryImageCount(gallery.id);
    totalImages += count;
  }
  
  return {
    total: galleries.length,
    featured: getFeaturedGalleries(galleries).length,
    tags: getUniqueTags(galleries).length,
    totalImages,
  };
}

// ============================================================================
// TYPES
// ============================================================================

export interface GalleryImage {
  path: string;
  filename: string;
  image: ImageMetadata;
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Shuffle array (Fisher-Yates algorithm)
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}