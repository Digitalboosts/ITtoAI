import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ResourcesHero from './components/ResourcesHero';
import ResourcesExplorer from './components/ResourcesExplorer';
import NewsletterSection from './components/NewsletterSection';

export const metadata: Metadata = {
  title: 'Resources | ITtoAI',
  description: 'Build your AI career with better information. Practical, honest guides on AI careers, skills, interview preparation and workforce transformation.',
  alternates: { canonical: '/resources' },
  openGraph: {
    title: 'Resources | ITtoAI',
    description: 'Practical, honest guides on AI careers, skills and hiring — written for technology professionals.',
    url: '/resources',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resources | ITtoAI',
    description: 'Practical, honest guides on AI careers, skills and hiring.',
  },
};

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <ResourcesHero />
        <ResourcesExplorer />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
