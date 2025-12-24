---
title: "Obsidian as Your CMS"
description: "Set up Obsidian to write and manage your blog content"
series: "Zero Setup Guide"
seriesOrder: 2
---

Obsidian makes an excellent content management system for Zero. This guide shows you how to set it up.

## Why Obsidian

Obsidian gives you a powerful editor, graph view of your content, and the ability to work offline. You write in markdown, use wikilinks between posts, and see everything in a visual interface.

Unlike traditional CMS platforms, your content stays in plain text files that you fully control. No database, no vendor lock-in, just markdown files.

## Opening Your Vault

Open Obsidian and choose "Open folder as vault". Navigate to your blog's `src/content/` directory and select it.

Obsidian now has access to your posts, docs, projects, and pages. You can create, edit, and organize content directly in Obsidian.

## Vault Structure

Your vault contains four folders:

**posts/** - Blog posts and articles
**docs/** - Documentation and notes
**projects/** - Project showcases (frontmatter only)
**pages/** - Static pages like About

Create new notes in the appropriate folder. Obsidian automatically saves them as markdown files.

## Writing Posts

Create a new note in the `posts/` folder. Add frontmatter at the top:

```markdown
---
title: "Your Post Title"
description: "Brief description"
date: 2024-12-22
tags: ["tag1", "tag2"]
---

Your content here.
```

Use all of Obsidian's features - wikilinks, callouts, embeds. They work in your published site.

## Linking Between Posts

Link to other posts with wikilinks:

```markdown
See my [[previous-post]] for more details.
```

Obsidian shows these as clickable links in editor. The theme converts them to proper HTML links in your published site.

## Images and Attachments

Drag images into your note. Obsidian saves them either in an `attachments/` folder or in your note's folder if you're using folder-based posts.

The theme finds and displays images correctly in both cases.

## Optional Plugins

These Obsidian plugins enhance your blogging workflow:

### BRAT (Required for Community Plugins)

BRAT lets you install community plugins not in the official store. You need it for Astro Composer and Bases CMS.

Install from Community Plugins (search "BRAT"). Then use BRAT to install the plugins below.

### Astro Composer

[Astro Composer](https://github.com/davidvkimball/obsidian-astro-composer) adds Astro-specific features to Obsidian. It helps with frontmatter, validation, and previewing how posts will look.

Install via BRAT: Add repository `davidvkimball/obsidian-astro-composer`.

### Bases CMS

[Bases CMS](https://github.com/davidvkimball/obsidian-bases-cms) lets you create and manage data tables in Obsidian. Useful for cataloging content, managing projects, or creating indexes.

Install via BRAT: Add repository `davidvkimball/obsidian-bases-cms`.

These plugins are optional. Zero works fine without them.

## Templates

Create note templates for consistent frontmatter. In Obsidian settings, enable Templates and set a templates folder.

Example post template:

```markdown
---
title: {{title}}
description: {{description}}
date: {{date:YYYY-MM-DD}}
tags: []
---
```

Now you can insert templates when creating new posts.

## Daily Notes

If you use Obsidian's daily notes, create them outside `src/content/` so they don't appear on your blog. Set your daily notes folder to something like `journal/` in your project root.

## Workspace Setup

Organize your Obsidian workspace with these panes:

- File explorer (left)
- Editor (center)
- Graph view or outline (right)

This layout gives you quick access to files while writing and seeing how content connects.

## Sync and Backup

Obsidian stores everything in plain text files. This makes backup simple - your blog repository is your backup.

For sync between devices, use Obsidian Sync (paid) or sync your repository with Git, Dropbox, or iCloud.

## Publishing Workflow

Your workflow becomes:

1. Open vault in Obsidian
2. Write or edit content
3. Save (Obsidian auto-saves)
4. Build and deploy

No complicated publishing steps. Edit markdown files and rebuild your site. That's it.

## Working Offline

Obsidian and Zero both work offline. Write without internet, then push changes when you're back online.

This is particularly useful for writing on planes, trains, or anywhere without reliable internet.

## Next Steps

With Obsidian set up, you have a powerful writing environment. The next guide covers optional software for version control and deployment.
