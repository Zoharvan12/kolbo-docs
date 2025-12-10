# Documentation Icons Reference

This document lists all the icons added to the Kolbo.AI documentation, based on the session types from the kolbo-map project.

## Main Categories

| Category | Icon | Lucide Icon Name |
|----------|------|-----------------|
| Image Tools | 🖼️ | `Image` |
| Video Tools | 🎥 | `Video` |
| Audio Tools | 🎵 | `Music` |
| Chat Tools | 💬 | `MessageSquare` |
| Creative Director | 🎨 | `Palette` |
| 3D Tools | 📦 | `Box` |
| Workflows | 📊 | `LayoutDashboard` |
| Projects | 📁 | `FolderKanban` |
| Media Library | 🗂️ | `LayoutGrid` |
| Apps | 📱 | `Smartphone` |
| Account | 👤 | `User` |
| Help | ❓ | `HelpCircle` |
| Fundamentals | 📖 | `BookOpen` |
| Getting Started | 🚀 | `Rocket` |
| Features | ✨ | `Sparkles` |
| Guides | 🗺️ | `Map` |
| API | 💻 | `Code` |

## Image Tools Subcategories

| Subcategory | Icon | Lucide Icon Name | Session Type Reference |
|-------------|------|-----------------|----------------------|
| Text to Image | 🪄 | `Wand2` | `RiAiGenerateText` |
| Image Editing | ✏️ | `Pencil` | `Pencil` |
| Canvas | ◻️ | `Square` | `Square` |
| Training Lab | 🧪 | `FlaskConical` | `FlaskConical` |

## Video Tools Subcategories

| Subcategory | Icon | Lucide Icon Name | Session Type Reference |
|-------------|------|-----------------|----------------------|
| Text to Video | 🎬 | `Clapperboard` | `Clapperboard` |
| Image to Video | 🎞️ | `Film` | `Film` |
| Video to Video | 🎥 | `Video` | `Video` |
| Lipsync | 🎙️ | `Mic` | `Mic` |

## Account Subcategories

| Subcategory | Icon | Lucide Icon Name |
|-------------|------|-----------------|
| Memories | 🧠 | `Brain` |
| Organization | 🏢 | `Building2` |
| Subscription | 💳 | `CreditCard` |
| User Settings | ⚙️ | `Settings` |

## Apps Subcategories

| Subcategory | Icon | Lucide Icon Name | Session Type Reference |
|-------------|------|-----------------|----------------------|
| AI Board | 🎨 | `LayoutGrid` | `AIBoardIcon` |
| AI Docs | 📝 | `FileText` | `Notebook` |
| Video Editor | ✂️ | `Scissors` | `Scissors` |

## Guides Subcategories

| Subcategory | Icon | Lucide Icon Name |
|-------------|------|-----------------|
| Beginner | 🌱 | `Sprout` |
| Intermediate | 📈 | `TrendingUp` |
| Advanced | 🎓 | `GraduationCap` |
| Use Cases | 💡 | `Lightbulb` |

## Help Subcategories

| Subcategory | Icon | Lucide Icon Name |
|-------------|------|-----------------|
| Learning Center | 🎓 | `GraduationCap` |
| Troubleshooting | 🔧 | `Wrench` |

## Projects Subcategories

| Subcategory | Icon | Lucide Icon Name |
|-------------|------|-----------------|
| Project Sharing | 🔗 | `Share2` |

## Icon System

All icons are from [Lucide Icons](https://lucide.dev/) and are automatically rendered by Fumadocs using a custom icon handler configured in `lib/source.ts`.

The custom handler dynamically creates icon components from the lucide-react library at runtime, which provides better tree-shaking and ensures all icon names are properly resolved.

### How Icons Are Added

Icons are defined in `meta.json` files within each category/subcategory directory:

```json
{
  "title": "Category Name",
  "icon": "LucideIconName"
}
```

### Mapping from kolbo-map

The icon system mirrors the session types defined in:
- `kolbo-map/src/constants/sessionTypes.js`
- `kolbo-map/src/components/shared/SessionIcon.tsx`

This ensures consistency between the main application and documentation.

### Implementation in lib/source.ts

```typescript
import { icons } from 'lucide-react';
import { createElement } from 'react';

export const source = loader({
  // ...
  icon(icon) {
    if (!icon) {
      return; // You may set a default icon
    }
    if (icon in icons) {
      return createElement(icons[icon as keyof typeof icons]);
    }
  },
});
```

## Testing

To verify icons are displaying correctly:

1. Start the development server: `npm run dev`
2. Navigate to http://localhost:3000 (or the port shown in terminal)
3. Check the sidebar navigation for icon displays
4. Verify all categories and subcategories show appropriate icons

## Troubleshooting

If icons don't display:

1. Verify `lucideIconsPlugin()` is enabled in `lib/source.ts`
2. Check that icon names match exactly with Lucide icon names (case-sensitive)
3. Ensure `meta.json` files have proper JSON syntax
4. Rebuild the project: `npm run build`

## Available Lucide Icons

For a complete list of available icons, visit: https://lucide.dev/icons/
