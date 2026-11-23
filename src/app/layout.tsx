import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import '../styles/tailwind.css';
import WhatsAppButton from '@/components/WhatsAppButton';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'ITtoAI | Upgrade Your IT Career for the AI Era',
  description: 'ITtoAI helps technology professionals become AI-ready through skill assessment, practical AI projects, career transformation and verified AI talent opportunities.',
  alternates: { canonical: '/' },
  openGraph: {
    siteName: 'ITtoAI',
    title: 'ITtoAI | Upgrade Your IT Career for the AI Era',
    description: 'ITtoAI helps technology professionals become AI-ready through skill assessment, practical AI projects, career transformation and verified AI talent opportunities.',
    url: '/',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ITtoAI | Upgrade Your IT Career for the AI Era',
    description: 'ITtoAI helps technology professionals become AI-ready through skill assessment, practical AI projects, career transformation and verified AI talent opportunities.',
    images: ['/opengraph-image'],
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ittoai.in';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ITtoAI',
  url: siteUrl,
  logo: `${siteUrl}/assets/images/app_logo.png`,
  description: 'AI Workforce Transformation & Talent Platform',
  telephone: '+91-93411-71960',
  sameAs: [
    'https://www.instagram.com/it_to_ai/',
    'https://www.facebook.com/profile.php?id=61593504479366',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ITtoAI',
  url: siteUrl,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className={manrope.className}>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}