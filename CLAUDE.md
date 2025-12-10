# Kolbo.AI Documentation Project

This is the official documentation site for Kolbo.AI, built with Fumadocs and Next.js.

## Overview
- **Framework**: Fumadocs (Next.js 16 + React 19)
- **Styling**: Tailwind CSS v4 with custom Kolbo.AI theme
- **Content**: MDX (Markdown + React components)
- **Deployment**: (Will be configured for docs.kolbo.ai)

## Development

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Project Structure

```
kolbo-docs/
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout with branding
│   ├── docs/           # Documentation routes
│   └── global.css      # Custom Kolbo.AI theme
├── content/docs/       # MDX documentation files
│   ├── getting-started/
│   ├── features/
│   ├── api/
│   └── guides/
├── lib/                # Shared utilities
│   └── layout.shared.tsx  # Navigation config
└── public/             # Static assets (logos, images)
```

## Content Organization

Documentation will be populated from kolbo-map project context, including:
- All 22+ features from CLAUDE.md
- API documentation
- User guides and tutorials
- Integration examples

## Customization

- **Colors**: Defined in `app/global.css` (matches Kolbo.AI dark theme)
- **Fonts**: Poppins for headings, Inter for body
- **Navigation**: Edit `lib/layout.shared.tsx`
- **Branding**: Update `app/layout.tsx` metadata

## Next Steps

1. Populate content from kolbo-map documentation
2. Add Kolbo.AI logo and assets
3. Configure deployment to docs.kolbo.ai
4. Set up search indexing
5. Add API examples and code snippets
