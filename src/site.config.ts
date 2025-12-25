import type { SiteConfig } from "./types"

export const siteConfig: SiteConfig = {
  siteURL: "https://zero-obsidian.pages.dev",
  title: "Zero",
  description: "Zero - A Minimalist AstroJS Theme for Obsidian Users",
  author: "Amit K",
  language: "en",
  defaultTheme: "light", // not configured
  // customThemeFile: "", // not configured
  availableThemes: ["light", "dark"], // not configured
  featureButton: "mode", // only mode configured
  // commandPalette: {
  //   enabled: false,
  //   shortcut: "ctrl+K",
  //   placeholder: "Search posts",
  //   search: {
  //     posts: true,
  //     pages: false,
  //     projects: false,
  //     docs: false
  //   },
  //   sections: {
  //     quickActions: true,
  //     pages: true,
  //     social: true
  //   },
  //   quickActions: {
  //     enabled: true,
  //     toggleMode: true,
  //     graphView: false,
  //     changeTheme: true
  //   }
  // },
  profilePicture: {
    enabled: false,
    image: "",
    alt: "",
    size: "sm",
    url: undefined,
    placement: "footer",
    style: "none"
  },

  layout: {
    contentWidth: "md"
  },

  navigation: {
    showNavigation: true,
    style: "traditional",
    showMobileMenu: true,
    pages: [
      { title: "Posts", url: "/posts/" },
      { title: "Projects", url: "/projects/" },
      { title: "Docs", url: "/docs/" },
      { title: "About", url: "/about/" },
      { title: "GitHub", url: "https://github.com/ak0r" },
    ],
    social: [
      {
        title: "X",
        url: "https://x.com/trekography",
        icon: "brand-x",
      },
      {
        title: "GitHub",
        url: "https://github.com/ak0r",
        icon: "brand-github",
      },
    ],
  },

  postOptions: {
    postsPerPage: 6,
    groupPostsByYear: true,
    readingTime: true,
    wordCount: true,
    tags: true,
    linkedMentions: {
      enabled: true,
      linkedMentionsCompact: false
    },
    graphView: {
      enabled: false,
      showInSidebar: false,
      maxNodes: 100,
      showOrphanedPosts: true
    },
    postNavigation: true,
    showPostCardCoverImages: "featured", // "all" | "featured" | "home" | "posts" | "featured-and-posts" | "none"
    postCardAspectRatio: "og", // "16:9" | "4:3" | "3:2" | "og" | "square" | "golden" | "custom"
    customPostCardAspectRatio: "2.5/1", // Only used when postCardAspectRatio is "custom" (e.g., "2.5/1")
    comments: {
      enabled: false,
      provider: "",
      repo: "",
      repoId: "",
      category: "",
      categoryId: "",
      mapping: "",
      strict: "",
      reactions: "",
      metadata: "",
      inputPosition: "",
      theme: "",
      lang: "",
      loading: ""
    }
  },

  tableOfContents: {
    enabled: true,
    depth: 4
  },

  footer: {
    enabled: true,
    content: "© {author}. Built with the Zero theme.",
    showSocialIconsInFooter: true
  },

  scrollToTop: true,
  optionalContentTypes: {
    projects: false,
    docs: false
  },

  homeOptions: {
    featuredPost: {
      enabled: true,
    },
    recentPosts: {
      enabled: true,
      count: 4
    },
    projects: {
      enabled: false,
      count: 2
    },
    docs: {
      enabled: false,
      count: 2
    },
    blurb: {
      placement: "none"
    }
  },
  
}

// Utility functions
export function getFeature(feature: keyof Omit<SiteConfig["postOptions"], "postsPerPage" | "showPostCardCoverImages" | "postCardAspectRatio" | "customPostCardAspectRatio" | "linkedMentions" | "graphView" | "comments">): boolean {
  return siteConfig.postOptions[feature];
}

export function getContentWidth(): string {
  return siteConfig.layout.contentWidth;
}

// export function getTheme(): "flexoki-light" | "flexoki-dark" | "everforest-light" | "everforest-dark" | "nord-light" | "nord-dark" | "custom" {
//   return siteConfig.theme;
// }

export function getPostCardAspectRatio(): string {
  const { postCardAspectRatio, customPostCardAspectRatio } = siteConfig.postOptions;
  
  switch (postCardAspectRatio) {
    case "16:9":
      return "16 / 9";
    case "4:3":
      return "4 / 3";
    case "3:2":
      return "3 / 2";
    case "og":
      return "1.91 / 1";
    case "square":
      return "1 / 1";
    case "golden":
      return "1.618 / 1";
    case "custom":
      return customPostCardAspectRatio || "1.91 / 1"; // Fallback to OpenGraph if custom not provided
    default:
      return "1.91 / 1"; // Default to OpenGraph
  }
}

export function getTableOfContentsDepth(): number {
  return siteConfig.tableOfContents.depth;
}

export function getTableOfContentsEnabled(): boolean {
  return siteConfig.tableOfContents.enabled;
}

// Export the configuration as default
export default siteConfig;