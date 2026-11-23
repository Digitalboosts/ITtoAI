import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgramsHero from './components/ProgramsHero';
import ProgramsSection from './components/ProgramsSection';

export const metadata: Metadata = {
  title: 'AI Career Transformation Programs | ITtoAI',
  description: 'Learn what companies actually need. Structured, role-specific AI career transformation programs with practical projects, assessment and verification.',
  alternates: { canonical: '/programs' },
  openGraph: {
    title: 'AI Career Transformation Programs | ITtoAI',
    description: 'Learn what companies actually need. Structured, role-specific AI career transformation programs.',
    url: '/programs',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Career Transformation Programs | ITtoAI',
    description: 'Learn what companies actually need.',
  },
};

export default function ProgramsPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <ProgramsHero />
        <ProgramsSection />
      </main>
      <Footer />
    </>
  );
}
