import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { icons, HelpCircle } from 'lucide-react';
import { createElement, type ReactNode } from 'react';

// Custom Card component with icon support
function CardWithIcon({
  title,
  href,
  icon,
  children,
  ...props
}: {
  title: string;
  href?: string;
  icon?: string;
  children?: ReactNode;
  [key: string]: unknown;
}) {
  const DefaultCard = defaultMdxComponents.Card as React.ComponentType<{
    title: string;
    href?: string;
    children?: ReactNode;
    [key: string]: unknown;
  }>;

  // Get the icon component from lucide-react
  // Lucide icons use PascalCase (e.g., "Rocket", "Sparkles", "HelpCircle")
  let IconComponent: React.ComponentType<{ className?: string }> | null = null;
  if (icon) {
    // Special case for HelpCircle to ensure it works
    if (icon === 'HelpCircle' || icon.toLowerCase() === 'helpcircle') {
      IconComponent = HelpCircle;
    } else {
      // Try the icon name as-is first (in case it's already PascalCase)
      if (icon in icons) {
        IconComponent = icons[icon as keyof typeof icons] as React.ComponentType<{
          className?: string;
        }>;
      } else {
        // Convert to PascalCase and try again (e.g., "rocket" -> "Rocket")
        const iconKey = icon.charAt(0).toUpperCase() + icon.slice(1);
        if (iconKey in icons) {
          IconComponent = icons[iconKey as keyof typeof icons] as React.ComponentType<{
            className?: string;
          }>;
        }
      }
    }
  }

  // Render icon as part of card content
  const cardContent = (
    <>
      {IconComponent && (
        <div className="mb-3 flex items-center justify-center">
          {createElement(IconComponent, {
            className: 'w-8 h-8 text-muted-foreground',
          })}
        </div>
      )}
      {children}
    </>
  );

  return (
    <DefaultCard title={title} href={href} {...props}>
      {cardContent}
    </DefaultCard>
  );
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Card: CardWithIcon,
    ...components,
  };
}
