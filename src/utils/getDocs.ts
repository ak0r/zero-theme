import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import {
  filterDrafts,
  sortEntriesByDate,
  sortEntriesByOrder,
  getEntriesByYearSorted,
  getUniqueTags,
  getEntriesByTag,
  getFeaturedEntries,
  getAdjacentEntries,
  getSeriesEntries,
  getUniqueSeries,
  getAllSeriesWithEntries,
  getLatestSeries,
  getAdjacentInSeries,
  getRelatedEntries,
  searchEntries,
  groupEntriesBy,
} from './entries';

export type Docs = CollectionEntry<'docs'>;

/**
 * Get all docs, filtered by draft status
 */
export async function getAllDocs(): Promise<Docs[]> {
  const allDocs = await getCollection('docs');
  return filterDrafts(allDocs);
}

/**
 * Sort docs by date (descending - newest first)
 */
export function sortDocsByDate(docs: Docs[]): Docs[] {
  return sortEntriesByDate(docs);
}

/**
 * Sort docs by order field (ascending)
 */
export function sortDocsByOrder(docs: Docs[]): Docs[] {
  return sortEntriesByOrder(docs);
}

/**
 * Group docs by year and sort descending within year
 */
export function getDocsByYearSorted(docs: Docs[]): [string, Docs[]][] {
  return getEntriesByYearSorted(docs);
}

/**
 * Get unique tags from docs
 */
export function getUniqueTagsFromDocs(docs: Docs[]): string[] {
  return getUniqueTags(docs);
}

/**
 * Filter docs by tag
 */
export function getDocsByTag(docs: Docs[], tag: string): Docs[] {
  return getEntriesByTag(docs, tag);
}

/**
 * Get featured docs
 */
export function getFeaturedDocs(docs: Docs[]): Docs[] {
  return getFeaturedEntries(docs);
}

/**
 * Get adjacent docs (prev/next)
 */
export function getAdjacentDocs(
  docs: Docs[],
  currentId: string
): {
  prev: Docs | null;
  next: Docs | null;
} {
  return getAdjacentEntries(docs, currentId);
}

// ============================================================================
// SERIES OPERATIONS (Docs-specific)
// ============================================================================

/**
 * Get all docs in a series, sorted by seriesOrder
 */
export function getSeriesDocs(docs: Docs[], seriesName: string): Docs[] {
  return getSeriesEntries(docs, seriesName);
}

/**
 * Get unique series names from docs
 */
export function getUniqueSeries(docs: Docs[]): string[] {
  return getUniqueSeries(docs);
}

/**
 * Get all series with their docs (only series with 2+ docs)
 */
export function getAllSeriesWithDocs(docs: Docs[]): Map<string, Docs[]> {
  return getAllSeriesWithEntries(docs);
}

/**
 * Get the most recent series with 2+ docs
 */
export function getLatestSeries(
  docs: Docs[]
): { name: string; docs: Docs[] } | null {
  const result = getLatestSeries(docs);
  return result ? { name: result.name, docs: result.entries } : null;
}

/**
 * Get adjacent docs within a series
 */
export function getAdjacentDocsInSeries(
  docs: Docs[],
  currentDoc: Docs
): {
  prev: Docs | null;
  next: Docs | null;
} {
  return getAdjacentInSeries(docs, currentDoc);
}

/**
 * Get related docs based on tags
 */
export function getRelatedDocs(
  docs: Docs[],
  currentDoc: Docs,
  limit: number = 3
): Docs[] {
  return getRelatedEntries(docs, currentDoc, limit);
}

/**
 * Search docs by title or description
 */
export function searchDocs(docs: Docs[], query: string): Docs[] {
  return searchEntries(docs, query);
}

// ============================================================================
// CATEGORY OPERATIONS (Legacy - being phased out)
// ============================================================================

/**
 * Get unique categories from docs
 * @deprecated Use tags instead
 */
export function getUniqueCategories(docs: Docs[]): string[] {
  const categories = docs
    .map((doc) => doc.data.category)
    .filter((category): category is string => category !== null && category !== undefined);

  return [...new Set(categories)].sort();
}

/**
 * Filter docs by category
 * @deprecated Use tags instead
 */
export function getDocsByCategory(
  docs: Docs[],
  category: string
): Docs[] {
  if (!category || category === 'all') {
    return docs;
  }

  return docs.filter((doc) => doc.data.category === category);
}

/**
 * Group docs by category
 * @deprecated Use tags instead
 */
export function groupDocsByCategory(docs: Docs[]): Map<string, Docs[]> {
  return groupEntriesBy(docs, 'category');
}