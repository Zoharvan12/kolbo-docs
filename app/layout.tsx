import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter, Poppins } from 'next/font/google';
import type { ReactNode } from 'react';

const inter = Inter({
  subsets: ['latin'],
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata = {
  title: {
    default: 'Kolbo.AI Documentation',
    template: '%s | Kolbo.AI Docs',
  },
  description: 'Official documentation for Kolbo.AI - The all-in-one AI creative platform with 100+ AI models',
  metadataBase: new URL('https://docs.kolbo.ai'),
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} ${poppins.variable}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          search={{
            enabled: true,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
