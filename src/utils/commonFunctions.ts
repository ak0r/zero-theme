import type { Post, PostData, ReadingTime, Heading } from "@/types";

export function slugify(inputText?: string) {

  if (!inputText) return '';
  const slug = inputText.toLowerCase().trim();

  return slug
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
}

// humanize
export const humanize = (content: string) => {
  return content
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/[-\s]+/g, " ")
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase();
    });
};

// titleify
export const titleify = (content: string) => {
  const humanized = humanize(content);
  return humanized
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// format date
export function getFormattedDate(
  date: string | number | Date,
  format: 'long' | 'short' | 'full' = 'long'
): string {
  const parsedDate =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;

  if (Number.isNaN(parsedDate.getTime())) return ''; // invalid date → empty string

  /* ───────────── short: 2024 · 12 ───────────── */
  if (format === 'short') {
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    return `${year} · ${month}`;
  }

  /* ───────────── full: December 01, 2024 ─────── */
  if (format === 'full') {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }).format(parsedDate);
  }

  /* ───────────── long (default): 2024-12-31 ──── */
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const day = String(parsedDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Calculate reading time manually
export function calculateReadingTime(content: string): ReadingTime {
  // Handle empty or undefined content
  if (!content || typeof content !== "string") {
    return {
      text: "1 min read",
      minutes: 1,
      time: 60000,
      words: 0,
    };
  }

  // Remove frontmatter and markdown syntax for accurate word counting
  const plainText = content
    .replace(/^---\n[\s\S]*?\n---\n/, "") // Remove frontmatter
    .replace(/!\[.*?\]\(.*?\)/g, "") // Images
    .replace(/\[.*?\]\(.*?\)/g, "$1") // Links
    .replace(/`{1,3}.*?`{1,3}/gs, "") // Code blocks
    .replace(/#{1,6}\s+/g, "") // Headers
    .replace(/[*_~`]/g, "") // Emphasis
    .replace(/\n+/g, " ") // Line breaks
    .trim();

  const words = plainText.split(/\s+/).filter((word) => word.length > 0);
  const wordCount = words.length;

  // Average reading speed is 200-250 words per minute, using 225
  const wordsPerMinute = 225;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

  return {
    text: `${minutes} min read`,
    minutes: minutes,
    time: minutes * 60 * 1000, // in milliseconds
    words: wordCount,
  };
}

// Check if a date is valid (not January 1, 1970 or invalid)
export function isValidDate(date: Date): boolean {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return false;
  }

  // Check if it's January 1, 1970 (Unix epoch)
  const epoch = new Date(0);
  return date.getTime() > epoch.getTime();
}

// Extract reading time from remark plugin or calculate manually
export function getReadingTime(
  remarkData: any,
  content?: string
): ReadingTime | null {
  // Validate remark plugin reading time data
  if (
    remarkData?.readingTime &&
    typeof remarkData.readingTime === "object" &&
    remarkData.readingTime.text &&
    typeof remarkData.readingTime.text === "string" &&
    remarkData.readingTime.text !== "read0" &&
    typeof remarkData.readingTime.minutes === "number" &&
    typeof remarkData.readingTime.time === "number" &&
    typeof remarkData.readingTime.words === "number"
  ) {
    return {
      text: remarkData.readingTime.text,
      minutes: remarkData.readingTime.minutes,
      time: remarkData.readingTime.time,
      words: remarkData.readingTime.words,
    };
  }

  // Fallback to manual calculation if content is provided
  if (content !== undefined) {
    return calculateReadingTime(content);
  }

  // Default for no content and no valid remark data
  return {
    text: "1 min read",
    minutes: 1,
    time: 60000,
    words: 0,
  };
}