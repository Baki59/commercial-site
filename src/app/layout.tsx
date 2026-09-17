import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { api, SITE_URL } from '@/lib/api';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await api.site.settings();
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: settings.defaultSeo.title ?? settings.legalName,
      template: `%s | ${settings.companyName}`,
    },
    description: settings.defaultSeo.description,
    openGraph: {
      type: 'website',
      siteName: settings.companyName,
      title: settings.defaultSeo.title,
      description: settings.defaultSeo.description,
    },
    robots: { index: true, follow: true },
  };
}

/**
 * Master layout. Header and footer are rendered once here and persist across
 * every route; only the page body between them changes on navigation.
 */
export default async function RootLayout({ children }: { children: ReactNode }) {
  const settings = await api.site.settings();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-99 focus:rounded-xs focus:bg-marine focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header settings={settings} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
