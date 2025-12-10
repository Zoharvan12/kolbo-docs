# Kolbo.AI Documentation

Official documentation for [Kolbo.AI](https://kolbo.ai) - The all-in-one AI creative platform with 100+ AI models.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit **http://localhost:3000** to view the documentation.

## 📁 Project Structure

```
kolbo-docs/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with Kolbo.AI branding
│   ├── docs/              # Documentation routes
│   └── global.css         # Custom theme (dark mode, Kolbo.AI colors)
├── content/docs/          # MDX documentation content
│   ├── index.mdx          # Welcome page
│   ├── getting-started/   # Getting started guides
│   ├── features/          # Feature documentation
│   ├── api/               # API reference
│   └── guides/            # User guides
├── lib/                   # Shared utilities
│   └── layout.shared.tsx  # Navigation configuration
└── public/                # Static assets (logos, images)
```

## 🎨 Customization

### Theme Colors
Edit `app/global.css` to customize the dark theme colors.

### Navigation
Edit `lib/layout.shared.tsx` to modify navigation links.

### Branding
Edit `app/layout.tsx` to update metadata and SEO settings.

## 📝 Adding Content

Documentation content is written in **MDX** (Markdown + React components).

Create new pages in `content/docs/`:

```mdx
---
title: Your Page Title
description: Page description for SEO
---

# Your Page Title

Content goes here...
```

## 🛠 Tech Stack

- **Framework**: [Fumadocs](https://fumadocs.dev) (Next.js 16 + React 19)
- **Styling**: Tailwind CSS v4
- **Content**: MDX
- **Fonts**: Poppins (headings), Inter (body)
- **Deployment**: Vercel (planned for docs.kolbo.ai)

## ✨ Features

- ✅ Dark mode by default (matches Kolbo.AI brand)
- ✅ Built-in search (Ctrl/Cmd + K)
- ✅ Mobile-responsive
- ✅ Three-column layout (sidebar + content + TOC)
- ✅ SEO optimized
- ✅ Fast page loads (Next.js SSG)

## 🔗 Links

- **Main Site**: [kolbo.ai](https://kolbo.ai)
- **App**: [app.kolbo.ai](https://app.kolbo.ai)
- **Fumadocs Docs**: [fumadocs.dev](https://fumadocs.dev)

## 📄 License

Copyright © 2024 Kolbo.AI. All rights reserved.
