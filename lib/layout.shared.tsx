import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2">
          <Image
            src="/kolbo-icon-light.svg"
            alt="Kolbo.AI"
            width={24}
            height={24}
            className="dark:hidden"
          />
          <Image
            src="/kolbo-icon-dark.svg"
            alt="Kolbo.AI"
            width={24}
            height={24}
            className="hidden dark:block"
          />
          <span className="font-semibold">Kolbo.AI Docs</span>
        </div>
      ),
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
