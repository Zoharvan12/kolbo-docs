# Documentation Category Order

This document explains the ordering logic for the Kolbo.AI documentation categories.

## Category Order Logic

The documentation is organized by importance and logical flow for users learning the platform:

### 1. Onboarding & Basics
- **Getting Started** - First steps, account setup, basic navigation
- **Fundamentals** - Core concepts, terminology, platform overview

### 2. Core Tools (Most Used → Specialized)
- **Chat Tools** - AI chat assistants (most accessible entry point)
- **Creative Director** - Complete creative workflows
- **Image Tools** - Image generation and editing
- **Video Tools** - Video creation and transformation
- **Audio Tools** - Music, speech, and sound generation
- **3D Tools** - 3D content creation
- **Apps** - Specialized applications (AI Board, AI Docs, Video Editor)
- **Media Library** - Media organization and management

### 3. Organization & Advanced Features
- **Workflows** - Automation and advanced workflows
- **Projects** - Project management and collaboration
- **Features** - Detailed feature documentation

### 4. Learning & Support
- **Guides** - Tutorial guides (beginner → advanced)
- **Account** - User settings and subscription management
- **API** - Developer documentation
- **Help** - Troubleshooting and learning resources

## Implementation

Category order is controlled by `content/docs/meta.json`:

```json
{
  "pages": [
    "getting-started",
    "fundamentals",
    "chat-tools",
    "creative-director",
    "image-tools",
    "video-tools",
    "audio-tools",
    "3d-tools",
    "apps",
    "media-library",
    "workflows",
    "projects",
    "features",
    "guides",
    "account",
    "api",
    "help"
  ]
}
```

## Subcategory Ordering

### Image Tools
1. Text to Image - Pure generation
2. Image Editing - Transformations
3. Canvas - Advanced editing
4. Training Lab - Custom models

### Video Tools
1. Text to Video - Pure generation
2. Image to Video - Animation
3. Video to Video - Transformations
4. Lipsync - Dubbing and animation

### Apps
1. AI Board - Visual canvas workspace
2. AI Docs - Document creation
3. Video Editor - Professional video editing

### Account
1. User Settings - Personal preferences
2. Subscription - Billing and plans
3. Organization - Team management
4. Memories - AI memory system

### Guides
1. Beginner - Getting started tutorials
2. Intermediate - Advanced techniques
3. Advanced - Expert workflows
4. Use Cases - Real-world examples

### Help
1. Learning Center - Educational resources
2. Troubleshooting - Problem solving

## Default Open State

Categories marked `defaultOpen: true` will be expanded by default in the sidebar:
- Getting Started ✓
- Chat Tools ✓
- Creative Director ✓
- Image Tools ✓
- Video Tools ✓
- Audio Tools ✓
- 3D Tools ✓

This ensures the most important and frequently-used tools are immediately visible.

## Modifying Order

To change the order:

1. Edit `content/docs/meta.json` to reorder top-level categories
2. Edit individual category `meta.json` files to reorder subcategories
3. Changes take effect immediately in development mode

## Best Practices

- **User Journey**: Order reflects typical user progression through the platform
- **Frequency**: Most-used tools appear first
- **Complexity**: Simpler tools before complex ones
- **Context**: Related tools are grouped together
- **Support**: Help and account management at the end
