import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import {
  filterDrafts,
  sortEntriesByDate,
  getUniqueTags,
  getTagCounts,
  getEntriesByTag,
  getFeaturedEntries,
  filterEntriesBy,
} from '@/utils/entries';

export type Project = CollectionEntry<'projects'>;

/**
 * Projects Utilities - Wrapper around generic entries.ts
 * Uses generic functions where possible, adds project-specific logic
 */

// ============================================================================
// CORE FUNCTIONS (Use Generic)
// ============================================================================

/**
 * Get all projects (excluding drafts in production)
 * Uses generic filterDrafts
 */
export async function getAllProjects(): Promise<Project[]> {
  const allProjects = await getCollection('projects');
  return filterDrafts(allProjects);
}

/**
 * Sort projects by date (newest first)
 * Uses generic sortEntriesByDate
 */
export function sortProjectsByDate(projects: Project[]): Project[] {
  return sortEntriesByDate(projects);
}

/**
 * Get featured projects
 * Uses generic getFeaturedEntries
 */
export function getFeaturedProjects(projects: Project[]): Project[] {
  return getFeaturedEntries(projects);
}

/**
 * Get projects by tag
 * Uses generic getEntriesByTag
 */
export function getProjectsByTag(projects: Project[], tag: string): Project[] {
  return getEntriesByTag(projects, tag);
}

/**
 * Get all unique tags
 * Uses generic getUniqueTags
 */
export function getUniqueProjectTags(projects: Project[]): string[] {
  return getUniqueTags(projects);
}

/**
 * Get tag counts
 * Uses generic getTagCounts
 */
export function getProjectTagCounts(projects: Project[]): Record<string, number> {
  return getTagCounts(projects);
}

// ============================================================================
// PROJECT-SPECIFIC FUNCTIONS
// ============================================================================

/**
 * Get projects by status (project-specific field)
 */
export function getProjectsByStatus(
  projects: Project[],
  status: 'active' | 'archived' | 'wip'
): Project[] {
  return filterEntriesBy(projects, (project) => project.data.status === status);
}

/**
 * Get active projects only
 */
export function getActiveProjects(projects: Project[]): Project[] {
  return getProjectsByStatus(projects, 'active');
}

/**
 * Get work-in-progress projects
 */
export function getWIPProjects(projects: Project[]): Project[] {
  return getProjectsByStatus(projects, 'wip');
}

/**
 * Get archived projects
 */
export function getArchivedProjects(projects: Project[]): Project[] {
  return getProjectsByStatus(projects, 'archived');
}

/**
 * Filter projects by multiple tags (AND logic)
 * Project-specific implementation for client-side filtering
 */
export function filterProjectsByTags(
  projects: Project[],
  tags: string[]
): Project[] {
  if (tags.length === 0) return projects;
  
  return projects.filter((project) =>
    tags.every((tag) =>
      project.data.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    )
  );
}

/**
 * Get projects with repository URLs
 */
export function getProjectsWithRepo(projects: Project[]): Project[] {
  return filterEntriesBy(projects, (project) => !!project.data.repositoryUrl);
}

/**
 * Get project statistics (project-specific)
 */
export function getProjectStats(projects: Project[]) {
  return {
    total: projects.length,
    active: getProjectsByStatus(projects, 'active').length,
    wip: getProjectsByStatus(projects, 'wip').length,
    archived: getProjectsByStatus(projects, 'archived').length,
    featured: getFeaturedProjects(projects).length,
    tags: getUniqueTags(projects).length,
    withRepo: getProjectsWithRepo(projects).length,
  };
}