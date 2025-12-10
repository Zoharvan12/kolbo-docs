# Search Functionality Documentation

## ✅ Search is Fully Functional

The Kolbo.AI documentation has a fully functional search system powered by **Orama** (the same search engine used by Node.js documentation).

## How It Works

### 1. Content Indexing

When the documentation site builds or runs in development:

- **Fumadocs MDX** processes all `.mdx` files in `content/docs/`
- Extracts structured data including:
  - Page title
  - Description
  - Full content (headings, paragraphs, code blocks, lists, etc.)
  - URL/path
- Creates searchable indexes automatically

### 2. Search API

**Location:** `app/api/search/route.ts`

```typescript
import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const { GET } = createFromSource(source, {
  language: 'english',
});
```

This API endpoint:
- Receives search queries from the frontend
- Uses Orama search engine for fast, relevant results
- Supports English language tokenization and stemming
- Returns matched documents with relevance scores

### 3. Search UI

**Location:** `app/layout.tsx`

```typescript
<RootProvider
  search={{
    enabled: true,
  }}
>
```

The search dialog:
- Accessible via **Cmd+K** (Mac) or **Ctrl+K** (Windows)
- Shows real-time results as you type
- Displays title, description, and matched content snippets
- Keyboard navigable (arrow keys, Enter to select)

### 4. Configuration

**Location:** `source.config.ts`

```typescript
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema,
    postprocess: {
      includeProcessedMarkdown: true, // ← Enables full content search
    },
  },
});
```

The `includeProcessedMarkdown: true` setting ensures that:
- All content is indexed, not just titles
- Search works across full article text
- Code examples are searchable
- Lists and tables are included

## What Gets Searched

The search indexes and searches through:

✅ **Page Titles** - Primary weighting
✅ **Descriptions** - Secondary weighting
✅ **Headings** (H1, H2, H3, etc.)
✅ **Paragraph Content**
✅ **Lists** (ordered and unordered)
✅ **Code Blocks** (inline and fenced)
✅ **Tables**
✅ **Links Text**
✅ **Blockquotes**

## Using Search

### For Users

1. **Open Search:**
   - Press `Cmd+K` on Mac
   - Press `Ctrl+K` on Windows
   - Click the search icon in the navbar

2. **Type Your Query:**
   - Start typing any term (e.g., "image", "video", "training lab")
   - Results appear instantly as you type

3. **Navigate Results:**
   - Use ↑↓ arrow keys to navigate
   - Press Enter to open a result
   - Press Esc to close

### Example Searches

| Query | Will Find |
|-------|-----------|
| `"image generation"` | Text to Image, Image Tools pages |
| `"video tools"` | All video-related documentation |
| `"training lab"` | Training Lab feature documentation |
| `"API"` | API documentation pages |
| `"lipsync"` | Lipsync tool documentation |
| `"custom models"` | Training Lab, custom model features |

## Search Features

### Current Features ✅
- **Full-text search** across all documentation
- **Real-time results** as you type
- **Relevance ranking** (most relevant first)
- **Content snippets** showing matched text
- **Keyboard shortcuts** (Cmd/Ctrl+K)
- **Responsive design** (works on mobile)
- **Fast performance** (Orama engine)

### Possible Future Enhancements 🔮
- **Tag filtering** (filter by Image Tools, Video Tools, etc.)
- **Advanced operators** (AND, OR, NOT)
- **Search analytics** (track popular queries)
- **Did you mean?** (spelling suggestions)
- **Recent searches** (search history)

## Technical Details

### Search Engine: Orama
- Open-source, in-memory search engine
- Used by Node.js, Docusaurus, and other major docs sites
- Features:
  - Typo tolerance
  - Fuzzy matching
  - Stemming (finds "running" when searching "run")
  - Multi-field search with weighting
  - Sub-millisecond search times

### Performance
- **Index Size:** Generated at build time
- **Search Speed:** < 10ms typical response time
- **Client-Side:** Minimal JavaScript overhead
- **SEO:** All content remains indexable by search engines

## Troubleshooting

### Search Not Working?

1. **Check search is enabled:**
   - Look for search icon in navbar
   - Try Cmd/Ctrl+K

2. **Restart dev server:**
   ```bash
   rm -rf .next
   npm run dev
   ```

3. **Check API route:**
   - Visit `/api/search?query=test` directly
   - Should return JSON results

4. **Verify content indexing:**
   - Check `source.config.ts` has `includeProcessedMarkdown: true`
   - Ensure MDX files have proper frontmatter

### No Results Found?

- Check spelling
- Try simpler/shorter queries
- Make sure content exists in `content/docs/`
- Rebuild search indexes (restart server)

## Maintenance

### Adding New Content
New documentation is automatically indexed when:
- MDX files are added to `content/docs/`
- Server restarts in development
- Site rebuilds in production

### Updating Search Configuration
To modify search behavior, edit:
- `app/api/search/route.ts` - Search API configuration
- `app/layout.tsx` - Search UI settings
- `source.config.ts` - Content processing options

## References

- [Fumadocs Search Documentation](https://fumadocs.dev/docs/ui/search)
- [Orama Search Engine](https://docs.orama.com/)
- [Fumadocs Built-in Search](https://fumadocs.dev/docs/headless/search/orama)
