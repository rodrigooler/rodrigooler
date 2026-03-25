import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { SeoJsonLd } from '@/components/seo-jsonld';
import { site } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    url: site.url,
    title: site.title,
    description: site.description,
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: site.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: ['/og-image.svg'],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#04060d',
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: site.name,
      jobTitle: 'Senior Software Engineer',
      description: site.description,
      url: site.url,
      image: `${site.url}/og-image.svg`,
      sameAs: [site.github, site.linkedin],
      knowsAbout: site.focus,
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      publisher: { '@id': `${site.url}/#person` },
      inLanguage: 'en',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="text-white antialiased">
        <SeoJsonLd data={personJsonLd} />
        {children}
      </body>
    </html>
  );
}
