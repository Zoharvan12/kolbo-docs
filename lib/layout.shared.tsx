import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'Kolbo.AI Docs',
    },
    links: [
      {
        text: 'Main Site',
        url: 'https://kolbo.ai',
        external: true,
      },
      {
        text: 'App',
        url: 'https://app.kolbo.ai',
        external: true,
      },
    ],
  };
}
