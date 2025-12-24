---
title: "Content Configuration"
description: "Customize your content collections and schemas"
series: "Zero Setup Guide"
seriesOrder: 6
---

Content collections define the structure of your posts, docs, projects, and pages. Edit `src/content.config.ts` to customize what fields are available.

## Understanding Collections

Zero has four content collections:

**posts** - Blog articles with tags and series
**docs** - Documentation with table of contents
**projects** - Project showcases (frontmatter only)
**pages** - Static pages like About and Contact

Each collection has a schema that defines required and optional fields.

## Post Schema

The default post schema:

```typescript
posts: defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().optional(),
    featured: z.boolean().optional(),
    image: z.string().optional(),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
  }),
})
```

Required fields: title, description, date. Everything else is optional.

## Adding Custom Fields

Want to add a reading time estimate or custom metadata? Add to the schema:

```typescript
estimatedTime: z.number().optional(),
customField: z.string().optional(),
```

Access these fields in your templates with `post.data.estimatedTime`.

## Docs Schema

Documentation has similar fields plus table of contents:

```typescript
docs: defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
    hideTOC: z.boolean().optional(),
  }),
})
```

Series groups related docs together. Series order controls the sequence.

## Projects Schema

Projects are frontmatter-only - no body content needed:

```typescript
projects: defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    projectUrl: z.string().url(),
    repositoryUrl: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    status: z.enum(['active', 'wip', 'archived']).default('active'),
    featured: z.boolean().default(false),
  }),
})
```

Projects link to external URLs - no internal pages generated.

## Pages Schema

Pages have minimal required fields:

```typescript
pages: defineCollection({
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
})
```

This is intentionally loose to support optional page sections on the homepage.

## Field Types

Zod (the validation library) provides these types:

**z.string()** - Text field
**z.number()** - Number field
**z.boolean()** - True/false field
**z.date()** - Date field
**z.array(z.string())** - Array of strings (like tags)
**z.enum(['a', 'b'])** - One of specific values
**z.url()** - Valid URL

Add `.optional()` to make any field optional. Add `.default(value)` to set a default.

## Image Fields

Images can be handled different ways:

```typescript
// Simple string path
image: z.string().optional()

// With transformation
image: z.any().transform((val) => {
  // Custom logic here
  return val;
})
```

The simple approach works for most cases.

## Validation

When you save a content file, Astro validates it against the schema. If something's wrong, you'll see an error in the terminal.

Common errors:

- Missing required field
- Wrong type (string instead of number)
- Invalid date format
- Invalid URL

Fix the error in your markdown file and save again.

## Removing Fields

To remove a field, delete it from the schema. Existing content with that field still works - the field is just ignored.

If you need to remove all instances, search your content folder for the field name.

## Migration

When changing schemas, existing content might break builds. Check your terminal for errors and update affected files.

For bulk changes, use search and replace across your content folder.

## TypeScript Benefits

The schema generates TypeScript types automatically. This means your code editor shows available fields when you type:

```typescript
post.data.title  // ✓ Works, shows autocomplete
post.data.fake   // ✗ Error, field doesn't exist
```

This catches mistakes before they become bugs.

## When to Modify

Modify schemas when you need:

- Custom metadata (author name, external links)
- Different required fields
- New content types
- Stricter validation

Don't modify if the defaults work for you. The theme is designed to be usable out of the box.

## Testing Changes

After modifying schemas:

1. Save the config file
2. Check terminal for errors
3. Try creating new content with new fields
4. Build the site to verify everything works

## Next Steps

With content configuration understood, the next guide covers optional page sections - making your homepage editable through markdown files.
