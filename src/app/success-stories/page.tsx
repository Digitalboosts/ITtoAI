import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTASection from '@/app/components/CTASection';
import SuccessStoriesHero from './components/SuccessStoriesHero';
import SuccessStoriesGrid from './components/SuccessStoriesGrid';

export const metadata: Metadata = {
  title: 'Success Stories | ITtoAI',
  description: 'Real IT professionals who used ITtoAI to move into AI roles — verified placements, in their own words.',
  alternates: { canonical: '/success-stories' },
  openGraph: {
    title: 'Success Stories | ITtoAI',
    description: 'Real IT professionals who used ITtoAI to move into AI roles — verified placements, in their own words.',
    url: '/success-stories',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    type: 'website',
  },
};

export default function SuccessStoriesPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <SuccessStoriesHero />
        <SuccessStoriesGrid />
        <CTASection
          label="Get Started"
          heading={
            <>
              Your story could be
              <br />
              <span className="text-gradient-primary">next.</span>
            </>
          }
          description="Start with a free AI Readiness Assessment — your score, skill gaps and a recommended direction."
          primaryLabel="Check My AI Readiness"
          primaryHref="/assessment#begin"
          secondaryLabel="Hire AI Talent"
          secondaryHref="/companies"
        />
      </main>
      <Footer />
    </>
  );
}
