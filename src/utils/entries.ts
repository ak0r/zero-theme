import type { CollectionEntry } from 'astro:content';

/**
 * Generic Utilities for Content Collections
 * Works with any Astro content collection (posts, docs, projects, etc.)
 */

// ============================================================================
// CORE OPERATIONS
// ============================================================================

/**
 * Filter out draft entries in production
 * @param entries - Array of collection entries
 * @returns Filtered entries (no drafts in production)
 */
export function filterDrafts<T extends { data: { draft?: boolean } }>(
  entries: T[]
): T[] {
  return import.meta.env.PROD
    ? entries.filter((entry) => !entry.data.draft)
    : entries;
}

/**
 * Sort entries by date (descending - newest first)
 * @param entries - Array of entries with date field
 * @returns Sorted entries
 */
export function sortEntriesByDate<T extends { data: { date: Date } }>(
  entries: T[]
): T[] {
  return [...entries].sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
}

/**
 * Sort entries by a custom date field (descending - newest first)
 * @param entries - Array of entries
 * @param dateField - Name of the date field
 * @returns Sorted entries
 */
export function sortEntriesByCustomDate<T extends { data: Record<string, any> }>(
  entries: T[],
  dateField: keyof T['data']
): T[] {
  return [...entries].sort((a, b) => {
    const dateA = a.data[dateField] as Date;
    const dateB = b.data[dateField] as Date;
    if (!dateA || !dateB) return 0;
    return dateB.valueOf() - dateA.valueOf();
  });
}

/**
 * Sort entries by order field (ascending)
 * @param entries - Array of entries with order field
 * @returns Sorted entries
 */
export function sortEntriesByOrder<T extends { data: { order?: number } }>(
  entries: T[]
): T[] {
  return [...entries].sort((a, b) => {
    const orderA = a.data.order ?? 0;
    const orderB = b.data.order ?? 0;
    return orderA - orderB;
  });
}

// ============================================================================
// GROUPING & ORGANIZATION
// ============================================================================

/**
 * Group entries by year and sort descending within year
 * @param entries - Array of entries with date field
 * @returns Array of [year, entries] tuples sorted by year descending
 */
export function getEntriesByYearSorted<T extends { data: { date: Date } }>(
  entries: T[]
): [string, T[]][] {
  // Step 1: Group entries by year
  const grouped = entries.reduce<Record<string, T[]>>((acc, entry) => {
    const year = entry.data.date.getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(entry);
    return acc;
  }, {});

  // Step 2: Sort entries within each year by date (descending)
  for (const year in grouped) {
    grouped[year].sort(
      (a, b) => b.data.date.getTime() - a.data.date.getTime()
    );
  }

  // Step 3: Return entries sorted by year (descending)
  return Object.entries(grouped).sort(
    ([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA)
  );
}

/**
 * Group entries by a specific field
 * @param entries - Array of entries
 * @param field - Field name to group by
 * @returns Map of field value to entries
 */
export function groupEntriesBy<T extends { data: Record<string, any> }>(
  entries: T[],
  field: keyof T['data']
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();

  entries.forEach((entry) => {
    const value = entry.data[field];
    const key = value?.toString() || 'Uncategorized';
    
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(entry);
  });

  return grouped;
}

// ============================================================================
// TAG OPERATIONS
// ============================================================================

/**
 * Get unique tags from entries
 * @param entries - Array of entries with tags field
 * @returns Sorted array of unique tags
 */
export function getUniqueTags<T extends { data: { tags?: string[] | null } }>(
  entries: T[]
): string[] {
  const tags = entries
    .flatMap((entry) => entry.data.tags || [])
    .filter((tag): tag is string => tag !== null && tag !== undefined);

  return [...new Set(tags)].sort();
}

/**
 * Filter entries by tag
 * @param entries - Array of entries with tags field
 * @param tag - Tag to filter by
 * @returns Filtered entries
 */
export function getEntriesByTag<T extends { data: { tags?: string[] | null } }>(
  entries: T[],
  tag: string
): T[] {
  return entries.filter((entry) => entry.data.tags?.includes(tag));
}

/**
 * Get tag counts
 * @param entries - Array of entries with tags field
 * @returns Map of tag to count
 */
export function getTagCounts<T extends { data: { tags?: string[] | null } }>(
  entries: T[]
): Map<string, number> {
  const counts = new Map<string, number>();

  entries.forEach((entry) => {
    entry.data.tags?.forEach((tag) => {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    });
  });

  return counts;
}

// ============================================================================
// FEATURED & FILTERING
// ============================================================================

/**
 * Get featured entries
 * @param entries - Array of entries with featured field
 * @returns Filtered featured entries
 */
export function getFeaturedEntries<T extends { data: { featured?: boolean } }>(
  entries: T[]
): T[] {
  return entries.filter((entry) => entry.data.featured === true);
}

/**
 * Filter entries by field value
 * @param entries - Array of entries
 * @param field - Field name to filter by
 * @param value - Value to match
 * @returns Filtered entries
 */
export function filterEntriesBy<T extends { data: Record<string, any> }>(
  entries: T[],
  field: keyof T['data'],
  value: any
): T[] {
  return entries.filter((entry) => entry.data[field] === value);
}

/**
 * Get entries by multiple IDs
 * @param entries - Array of entries
 * @param ids - Array of entry IDs
 * @returns Filtered entries
 */
export function getEntriesByIds<T extends { id: string }>(
  entries: T[],
  ids: string[]
): T[] {
  return entries.filter((entry) => ids.includes(entry.id));
}

// ============================================================================
// NAVIGATION
// ============================================================================

/**
 * Get adjacent entries (prev/next)
 * @param entries - Sorted array of entries
 * @param currentId - ID of current entry
 * @returns Object with prev and next entries
 */
export function getAdjacentEntries<T extends { id: string }>(
  entries: T[],
  currentId: string
): {
  prev: T | null;
  next: T | null;
} {
  const currentIndex = entries.findIndex((entry) => entry.id === currentId);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex > 0 ? entries[currentIndex - 1] : null,
    next: currentIndex < entries.length - 1 ? entries[currentIndex + 1] : null,
  };
}

/**
 * Get adjacent entries within a specific group/category
 * @param allEntries - All entries
 * @param currentEntry - Current entry
 * @param groupField - Field name to group by
 * @returns Object with prev and next entries within the same group
 */
export function getAdjacentInGroup<T extends { id: string; data: Record<string, any> }>(
  allEntries: T[],
  currentEntry: T,
  groupField: keyof T['data']
): {
  prev: T | null;
  next: T | null;
} {
  const groupValue = currentEntry.data[groupField];

  if (!groupValue) {
    return getAdjacentEntries(allEntries, currentEntry.id);
  }

  const groupEntries = allEntries.filter(
    (entry) => entry.data[groupField] === groupValue
  );

  return getAdjacentEntries(groupEntries, currentEntry.id);
}

// ============================================================================
// SERIES OPERATIONS
// ============================================================================

/**
 * Get all entries in a series, sorted by seriesOrder
 * @param entries - Array of entries with series field
 * @param seriesName - Name of the series
 * @returns Sorted entries in the series
 */
export function getSeriesEntries<T extends { 
  data: { 
    series?: string | null; 
    seriesOrder?: number | null;
  } 
}>(
  entries: T[],
  seriesName: string
): T[] {
  const seriesEntries = entries.filter(
    (entry) => entry.data.series === seriesName
  );

  return seriesEntries.sort((a, b) => {
    const orderA = a.data.seriesOrder ?? 0;
    const orderB = b.data.seriesOrder ?? 0;
    return orderA - orderB;
  });
}

/**
 * Get unique series names
 * @param entries - Array of entries with series field
 * @returns Sorted array of unique series names
 */
export function getUniqueSeries<T extends { data: { series?: string | null } }>(
  entries: T[]
): string[] {
  const series = entries
    .map((entry) => entry.data.series)
    .filter((series): series is string => series !== null && series !== undefined);

  return [...new Set(series)].sort();
}

/**
 * Get all series with their entries (only series with 2+ entries)
 * @param entries - Array of entries with series field
 * @returns Map of series name to entries
 */
export function getAllSeriesWithEntries<T extends { 
  data: { 
    series?: string | null; 
    seriesOrder?: number | null;
  } 
}>(
  entries: T[]
): Map<string, T[]> {
  const seriesMap = new Map<string, T[]>();
  const uniqueSeries = getUniqueSeries(entries);

  uniqueSeries.forEach((seriesName) => {
    const seriesEntries = getSeriesEntries(entries, seriesName);
    if (seriesEntries.length >= 2) {
      seriesMap.set(seriesName, seriesEntries);
    }
  });

  return seriesMap;
}

/**
 * Get the most recent series with 2+ entries
 * @param entries - Array of entries with series and date fields
 * @returns Object with series name and entries, or null
 */
export function getLatestSeries<T extends { 
  data: { 
    series?: string | null; 
    seriesOrder?: number | null;
    date: Date;
  } 
}>(
  entries: T[]
): { name: string; entries: T[] } | null {
  const seriesMap = getAllSeriesWithEntries(entries);

  if (seriesMap.size === 0) {
    return null;
  }

  let latestSeries: { name: string; entries: T[]; latestDate: Date } | null = null;

  seriesMap.forEach((seriesEntries, seriesName) => {
    const sortedByDate = sortEntriesByDate([...seriesEntries]);
    const latestEntry = sortedByDate[0];
    const latestDate = latestEntry.data.date;

    if (!latestSeries || latestDate > latestSeries.latestDate) {
      latestSeries = { name: seriesName, entries: seriesEntries, latestDate };
    }
  });

  return latestSeries ? { name: latestSeries.name, entries: latestSeries.entries } : null;
}

/**
 * Get adjacent entries within a series
 * @param allEntries - All entries
 * @param currentEntry - Current entry
 * @returns Object with prev and next entries in the series
 */
export function getAdjacentInSeries<T extends { 
  id: string; 
  data: { 
    series?: string | null; 
    seriesOrder?: number | null;
  } 
}>(
  allEntries: T[],
  currentEntry: T
): {
  prev: T | null;
  next: T | null;
} {
  const seriesName = currentEntry.data.series;

  if (!seriesName) {
    return { prev: null, next: null };
  }

  const seriesEntries = getSeriesEntries(allEntries, seriesName);
  const currentIndex = seriesEntries.findIndex(
    (entry) => entry.id === currentEntry.id
  );

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex > 0 ? seriesEntries[currentIndex - 1] : null,
    next: currentIndex < seriesEntries.length - 1 ? seriesEntries[currentIndex + 1] : null,
  };
}

// ============================================================================
// RELATED CONTENT
// ============================================================================

/**
 * Get related entries based on tag similarity
 * @param entries - All entries
 * @param currentEntry - Current entry
 * @param limit - Maximum number of related entries to return
 * @returns Array of related entries
 */
export function getRelatedEntries<T extends { 
  id: string; 
  data: { 
    tags?: string[] | null;
    date: Date;
  } 
}>(
  entries: T[],
  currentEntry: T,
  limit: number = 3
): T[] {
  const currentTags = currentEntry.data.tags || [];

  if (currentTags.length === 0) {
    return [];
  }

  const scoredEntries = entries
    .filter((entry) => entry.id !== currentEntry.id)
    .map((entry) => {
      const entryTags = entry.data.tags || [];
      const matchingTags = entryTags.filter((tag) => currentTags.includes(tag));
      return { entry, score: matchingTags.length };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.entry.data.date.valueOf() - a.entry.data.date.valueOf();
    });

  return scoredEntries.slice(0, limit).map((item) => item.entry);
}

// ============================================================================
// SEARCH
// ============================================================================

/**
 * Search entries by title or description
 * @param entries - Array of entries
 * @param query - Search query
 * @returns Filtered entries matching the query
 */
export function searchEntries<T extends { 
  data: { 
    title: string; 
    description?: string | null;
  } 
}>(
  entries: T[],
  query: string
): T[] {
  const lowerQuery = query.toLowerCase();

  return entries.filter((entry) => {
    const title = entry.data.title.toLowerCase();
    const description = entry.data.description?.toLowerCase() || '';

    return title.includes(lowerQuery) || description.includes(lowerQuery);
  });
}

/**
 * Search entries by custom fields
 * @param entries - Array of entries
 * @param query - Search query
 * @param fields - Fields to search in
 * @returns Filtered entries matching the query
 */
export function searchEntriesInFields<T extends { data: Record<string, any> }>(
  entries: T[],
  query: string,
  fields: (keyof T['data'])[]
): T[] {
  const lowerQuery = query.toLowerCase();

  return entries.filter((entry) => {
    return fields.some((field) => {
      const value = entry.data[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(lowerQuery);
      }
      if (Array.isArray(value)) {
        return value.some((item) =>
          typeof item === 'string' && item.toLowerCase().includes(lowerQuery)
        );
      }
      return false;
    });
  });
}

// ============================================================================
// PAGINATION
// ============================================================================

/**
 * Paginate entries
 * @param entries - Array of entries
 * @param page - Current page number (1-indexed)
 * @param perPage - Number of entries per page
 * @returns Object with paginated entries and metadata
 */
export function paginateEntries<T>(
  entries: T[],
  page: number,
  perPage: number
): {
  entries: T[];
  currentPage: number;
  totalPages: number;
  totalEntries: number;
  hasNext: boolean;
  hasPrev: boolean;
} {
  const totalEntries = entries.length;
  const totalPages = Math.ceil(totalEntries / perPage);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  return {
    entries: entries.slice(startIndex, endIndex),
    currentPage,
    totalPages,
    totalEntries,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };
}