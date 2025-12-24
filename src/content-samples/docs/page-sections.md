---
title: "Optional Page Sections"
description: "Make your homepage editable through markdown files"
series: "Zero Setup Guide"
seriesOrder: 7
---

By default, your homepage is hardcoded in `src/pages/index.astro`. Optional page sections let you edit homepage content through markdown files in Obsidian.

## How It Works

Instead of editing Astro templates, create optional markdown files that inject content into specific sections. These files live in `src/content/pages/` and are editable in Obsidian.

The homepage checks for these files. If they exist, it uses their content. If they don't, it shows default content.

## Homepage Sections

The homepage supports four optional sections:

**home-hero.md** - Hero section at the top
**home-intro.md** - Introduction text
**home-about.md** - About section
**home-cta.md** - Call to action

All are optional. Create only the ones you want to customize.

## Creating a Section

Create a file in `src/content/pages/`:

```markdown
<!-- home-hero.md -->
---
---

# Welcome to My Blog

I write about web development, design, and technology. Subscribe to get new posts in your inbox.

[Read Posts](/posts) [About Me](/about)
```

The frontmatter markers (`---`) are required but can be empty. Add your content below them.

## Section Locations

Sections appear in this order on the homepage:

1. Hero (home-hero.md)
2. Intro (home-intro.md)
3. Featured post (if enabled)
4. Recent posts (always shown)
5. About (home-about.md)
6. CTA (home-cta.md)

Featured and recent posts are always shown - they come from actual blog posts.

## Example Hero Section

```markdown
---
---

# Hi, I'm Your Name

I'm a developer writing about Astro, TypeScript, and building for the web. New posts every week.

**Topics I Cover:**
Web frameworks, performance optimization, developer tools, and content management.

[Browse Posts](/posts)
```

## Example CTA Section

```markdown
---
---

## Want More?

Subscribe to my newsletter for weekly updates on web development.

[Subscribe](/newsletter)

Or follow me on [Twitter](https://twitter.com/yourhandle) and [GitHub](https://github.com/yourhandle).
```

## Removing Sections

To remove a section, delete the file. The homepage reverts to default content (or shows nothing if there's no default for that section).

To temporarily hide a section, rename it (add `.bak` or similar).

## 404 Page Sections

The 404 page also supports optional sections:

**404-message.md** - Custom error message
**404-suggestions.md** - Helpful links

Same pattern - create files to override defaults, delete to revert.

## Editing in Obsidian

These files appear in your vault under the `pages/` folder. Edit them like any other note.

Changes appear immediately in development mode. No need to restart the server.

## Frontmatter Options

While frontmatter is required, it can be empty. Optionally add a title:

```markdown
---
title: "Hero Section"
---

Content here.
```

The title doesn't display - it's just for your reference in Obsidian.

## Styling Sections

Sections inherit the theme's styling automatically. Use markdown formatting:

**Bold** with `**asterisks**`
*Italic* with `*single asterisks*`
Links with `[text](url)`
Images with `![alt](image.png)`

For custom styling, use HTML classes or edit the page template.

## When to Use Sections

Use sections if you:

- Want to edit homepage content in Obsidian
- Change homepage text frequently
- Prefer markdown over Astro templates
- Want non-technical people to edit the homepage

Skip sections if you're comfortable editing Astro files directly.

## Limitations

Sections are for text and simple markdown. They don't support:

- Complex layouts
- Custom components
- Dynamic content
- Conditional logic

For those, edit the Astro page template instead.

## Regular Pages

For regular pages (About, Contact), create full-page files:

```markdown
<!-- pages/about.md -->
---
title: "About"
description: "About me and this blog"
---

Full page content here.

## Section Heading

More content.
```

These render as complete pages at their URL - no sections involved.

## Testing Sections

After creating section files:

1. Check homepage in browser
2. Verify section appears
3. Delete file and check default appears
4. Re-create file and verify it returns

## Next Steps

Page sections complete the core configuration. For advanced customization like colors and themes, check the theme customization guide (coming soon).
