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
  description: 'Official documentation for Kolbo.AI - The all-in-one AI creative platform with 100+ AI models for images, videos, audio, and more.',
  metadataBase: new URL('https://docs.kolbo.ai'),
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.webp', type: 'image/webp' },
    ],
    apple: [
      { url: '/apple-touch-icon.webp', type: 'image/webp' },
    ],
  },
  openGraph: {
    title: 'Kolbo.AI Documentation',
    description: 'Official documentation for Kolbo.AI - The all-in-one AI creative platform with 100+ AI models',
    url: 'https://docs.kolbo.ai',
    siteName: 'Kolbo.AI Docs',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Kolbo.AI Documentation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kolbo.AI Documentation',
    description: 'Official documentation for Kolbo.AI - The all-in-one AI creative platform',
    images: ['/og-image.webp'],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} ${poppins.variable}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
