import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CareerHero from './components/CareerHero';
import CareerPathExplorer from './components/CareerPathExplorer';

export const metadata: Metadata = {
  title: 'Career Path Explorer | ITtoAI',
  description: 'Know your next career move. Explore how real technology roles map onto AI-enabled roles, and see the skills, projects and learning that close the gap.',
  alternates: { canonical: '/career' },
  openGraph: {
    title: 'Career Path Explorer | ITtoAI',
    description: 'Explore how real technology roles map onto AI-enabled roles, and see exactly what closes the gap.',
    url: '/career',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Career Path Explorer | ITtoAI',
    description: 'Explore how real technology roles map onto AI-enabled roles, and see exactly what closes the gap.',
  },
};

export default function CareerPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <CareerHero />
        <CareerPathExplorer />
      </main>
      <Footer />
    </>
  );
}
