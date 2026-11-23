import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JobsHero from './components/JobsHero';
import JobsExplorer from './components/JobsExplorer';

export const metadata: Metadata = {
  title: 'AI Jobs | ITtoAI',
  description: 'AI jobs matched to your skills. Search AI-enabled technology roles and see how your verified skill profile lines up — example listings for demonstration purposes.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/jobs' },
  openGraph: {
    title: 'AI Jobs | ITtoAI',
    description: 'AI jobs matched to your skills — search AI-enabled technology roles by role, skill, company or location.',
    url: '/jobs',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    type: 'website',
  },
};

export default function JobsPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <JobsHero />
        <JobsExplorer />
      </main>
      <Footer />
    </>
  );
}
