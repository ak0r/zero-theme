import { visit } from 'unist-util-visit';
import type { Root, Link, Paragraph } from 'mdast';

/**
 * Remark Social Embeds Plugin
 * 
 * Converts standard markdown links to social media embeds:
 * - YouTube: [text](https://youtube.com/watch?v=...)
 * - Twitter/X: [text](https://twitter.com/user/status/...)
 * 
 * NOTE: Twitter widget script should be loaded in <head>
 */

interface EmbedInfo {
  type: 'youtube' | 'twitter';
  url: string;
}

export function remarkSocialEmbeds() {
  return (tree: Root) => {
    visit(tree, 'paragraph', (node: Paragraph, index, parent) => {
      if (!parent || index === undefined) return;

      // Check if paragraph contains a single link
      if (node.children.length !== 1) return;
      
      const child = node.children[0];
      if (child.type !== 'link') return;

      const link = child as Link;
      const embedInfo = detectEmbed(link.url);

      if (!embedInfo) return;

      // Replace paragraph with embed HTML
      const embedNode = createEmbedNode(embedInfo);
      if (embedNode) {
        parent.children[index] = embedNode;
      }
    });
  };
}

/**
 * Detect if URL is a social media embed
 */
function detectEmbed(url: string): EmbedInfo | null {
  // YouTube
  if (
    url.includes('youtube.com/watch') ||
    url.includes('youtu.be/') ||
    url.includes('youtube.com/embed/')
  ) {
    return { type: 'youtube', url };
  }

  // Twitter/X
  if (
    (url.includes('twitter.com') || url.includes('x.com')) &&
    url.includes('/status/')
  ) {
    return { type: 'twitter', url };
  }

  return null;
}

/**
 * Create embed HTML node
 */
function createEmbedNode(embedInfo: EmbedInfo) {
  switch (embedInfo.type) {
    case 'youtube':
      return createYouTubeEmbed(embedInfo.url);
    
    case 'twitter':
      return createTwitterEmbed(embedInfo.url);
    
    default:
      return null;
  }
}

/**
 * Create YouTube embed
 */
function createYouTubeEmbed(url: string) {
  const videoId = extractYouTubeId(url);
  
  if (!videoId) return null;

  const embedHtml = `<div class="youtube-embed" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0;">
  <iframe 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    src="https://www.youtube.com/embed/${videoId}" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
    loading="lazy">
  </iframe>
</div>`;

  return {
    type: 'html',
    value: embedHtml,
  };
}

/**
 * Extract YouTube video ID from URL
 */
function extractYouTubeId(url: string): string | null {
  // youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) return watchMatch[1];

  // youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) return shortMatch[1];

  // youtube.com/embed/VIDEO_ID
  const embedMatch = url.match(/youtube\.com\/embed\/([^?]+)/);
  if (embedMatch) return embedMatch[1];

  return null;
}

/**
 * Create Twitter embed
 * NOTE: Requires Twitter widget script in <head>
 */
function createTwitterEmbed(url: string) {
  // Clean URL (remove query params)
  const cleanUrl = url.split('?')[0];
  
  const embedHtml = `<div class="twitter-embed" style="margin: 1.5rem 0;">
  <blockquote class="twitter-tweet" data-dnt="true" data-theme="dark">
    <a href="${cleanUrl}"></a>
  </blockquote>
</div>`;

  return {
    type: 'html',
    value: embedHtml,
  };
}

export default remarkSocialEmbeds;