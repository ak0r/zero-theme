import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import {
  filterDrafts,
  sortEntriesByDate,
  getEntriesByYearSorted,
  getUniqueTags,
  getEntriesByTag,
  getFeaturedEntries,
  getAdjacentEntries,
  getRelatedEntries,
  searchEntries,
  paginateEntries,
} from './entries';

export type Post = CollectionEntry<'posts'>;

/**
 * Get all posts, filtered by draft status
 */
export async function getAllPosts(): Promise<Post[]> {
  const allPosts = await getCollection('posts');
  return filterDrafts(allPosts);
}

/**
 * Sort posts by date (descending - newest first)
 */
export function sortPostsByDate(posts: Post[]): Post[] {
  return sortEntriesByDate(posts);
}

/**
 * Group posts by year and sort descending within year
 */
export function getPostsByYearSorted(posts: Post[]): [string, Post[]][] {
  return getEntriesByYearSorted(posts);
}

/**
 * Get unique tags from posts
 */
export function getUniquePostTags(posts: Post[]): string[] {
  return getUniqueTags(posts);
}

/**
 * Filter posts by tag
 */
export function getPostsByTag(posts: Post[], tag: string): Post[] {
  return getEntriesByTag(posts, tag);
}

/**
 * Get featured posts
 */
export function getFeaturedPosts(posts: Post[]): Post[] {
  return getFeaturedEntries(posts);
}

/**
 * Get adjacent posts (prev/next)
 */
export function getAdjacentPosts(
  posts: Post[],
  currentSlug: string
): {
  prev: Post | null;
  next: Post | null;
} {
  return getAdjacentEntries(posts, currentSlug);
}

/**
 * Get related posts based on tags
 */
export function getRelatedPosts(
  posts: Post[],
  currentPost: Post,
  limit: number = 3
): Post[] {
  return getRelatedEntries(posts, currentPost, limit);
}

/**
 * Search posts by title or description
 */
export function searchPosts(posts: Post[], query: string): Post[] {
  return searchEntries(posts, query);
}

/**
 * Paginate posts
 */
export function paginatePosts(
  posts: Post[],
  page: number,
  perPage: number
) {
  return paginateEntries(posts, page, perPage);
}