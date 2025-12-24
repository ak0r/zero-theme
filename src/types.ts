import type { CollectionEntry } from "astro:content";
import type { ImageMetadata } from "astro";

export type Post = CollectionEntry<"posts">;
export type PostData = CollectionEntry<"posts">["data"];
export type Page = CollectionEntry<"pages">;
export type PageData = CollectionEntry<"pages">["data"];
export type Project = CollectionEntry<"projects">;
export type ProjectData = CollectionEntry<"projects">["data"];
export type Docs = CollectionEntry<"docs">;
export type DocsData = CollectionEntry<"docs">["data"];

// Aspect ratio options for post cards
export type AspectRatio = 
  | "16:9" 
  | "4:3"
  | "3:2"
  | "og"
  | "square"
  | "golden"
  | "custom";

export type ResolvedImage =
  | { kind: 'astro'; image: ImageMetadata; source: 'post' | 'shared' }
  | { kind: 'static'; url: string; source?: 'attachments' }
  | { kind: 'remote'; url: string; source?: 'external' };

export interface Heading {
  depth: number;
  slug: string;
  text: string;
}

export interface ReadingTime {
  text: string;
  minutes: number;
  time: number;
  words: number;
}

export interface NavigationItem {
  title: string;
  url: string;
  external?: boolean;
  icon?: string;
}

export interface SocialLink {
  title: string;
  url: string;
  icon: string;
}

export interface ImageInfo {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export type DateFormat = 'long' | 'short' | 'full' | 'monthDay';

export interface OpenGraphImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface SEOData {
  title: string;
  description: string;
  canonical: string;
  ogImage?: OpenGraphImage;
  ogType: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  noIndex?: boolean;
  robots?: string;
  articleSection?: string;
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  keywords?: string[];
}

export interface LinkedMention {
  title: string;
  slug: string;
  excerpt: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  nextUrl?: string;
  prevUrl?: string;
}

export interface SiteConfig {
  siteURL: string
  title: string
  description: string
  author: string
  language?: string
  defaultOgImageAlt?: string
  
  // Global Settings
  defaultTheme: "light"; // Default theme
  // customThemeFile?: string; // Filename in src/themes/custom/ (e.g., "my-cool-theme" for my-cool-theme.ts) Not configured
  availableThemes: ["light", "dark"];
  featureButton: "mode" | "none"; // only mode configured
  scrollToTop: boolean;
  tableOfContents: {
    enabled: boolean;
    depth: number;
  };
  footer: {
    enabled: boolean;
    content: string;
    showSocialIconsInFooter: boolean;
  };
  // Profile Picture
  profilePicture: {
    enabled: boolean;
    image: string;
    alt: string;
    size: "sm" | "md" | "lg";
    url?: string;
    placement: "footer" | "header";
    style: "circle" | "square" | "none";
  };

  // Navigation
  navigation: {
    showNavigation: boolean;
    style: "minimal" | "traditional";
    showMobileMenu: boolean;
    pages: Array<{ title: string; url: string }>;
    social: Array<{ title: string; url: string; icon: string }>;
  };

  // Command Palette
  // commandPalette: {
  //   enabled: boolean;
  //   shortcut: string;
  //   placeholder: string;
  //   search: {
  //     posts: boolean;
  //     pages: boolean;
  //     projects: boolean;
  //     docs: boolean;
  //   };
  //   sections: {
  //     quickActions: boolean;
  //     pages: boolean;
  //     social: boolean;
  //   };
  //   quickActions: {
  //     enabled: boolean;
  //     toggleMode: boolean;
  //     graphView: boolean;
  //     changeTheme: boolean;
  //   };
  // };

  // Home Options
  homeOptions: {
    featuredPost: {
      enabled: boolean;
      // recent most post will be featured
    };
    recentPosts: {
      enabled: boolean;
      count: number;
    };
    projects: {
      enabled: boolean;
      count: number;
    };
    docs: {
      enabled: boolean;
      count: number;
    };
    blurb: {
      placement: "above" | "below" | "none";
    };
  };

  layout: {
    contentWidth: string;
  };

  // Post Options
  postOptions: {
    postsPerPage: number;
    groupPostsByYear: boolean;
    readingTime: boolean;
    wordCount: boolean;
    tags: boolean;
    linkedMentions: {
      enabled: boolean;
      linkedMentionsCompact: boolean;
    };
    graphView: {
      enabled: boolean;
      showInSidebar: boolean;
      maxNodes: number;
      showOrphanedPosts: boolean;
    };
    postNavigation: boolean;
    showPostCardCoverImages: "all" | "featured" | "home" | "posts" | "featured-and-posts" | "none";
    postCardAspectRatio: AspectRatio;
    customPostCardAspectRatio?: string;
    comments: {
      enabled: boolean;
      provider: string;
      repo: string;
      repoId: string;
      category: string;
      categoryId: string;
      mapping: string;
      strict: string;
      reactions: string;
      metadata: string;
      inputPosition: string;
      theme: string;
      lang: string;
      loading: string;
    };
  };

  // Optional Content Types
  optionalContentTypes: {
    projects: boolean;
    docs: boolean;
  };
}

export interface WikilinkMatch {
  link: string;
  display: string;
  slug: string;
}

export interface LinkedMention {
  title: string;
  slug: string;
  excerpt: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  nextUrl?: string;
  prevUrl?: string;
}