import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTASection from '@/app/components/CTASection';
import AboutHero from './components/AboutHero';
import MissionSection from './components/MissionSection';
import PrinciplesSection from './components/PrinciplesSection';
import WhoWeServeSection from './components/WhoWeServeSection';

export const metadata: Metadata = {
  title: 'About ITtoAI | AI Workforce Transformation & Talent Platform',
  description: 'ITtoAI is an AI workforce transformation and talent platform, built to help technology professionals and companies adapt to AI with evidence, not guesswork.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About ITtoAI',
    description: 'ITtoAI is an AI workforce transformation and talent platform, built to help technology professionals and companies adapt to AI with evidence, not guesswork.',
    url: '/about',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <AboutHero />
        <MissionSection />
        <PrinciplesSection />
        <WhoWeServeSection />
        <CTASection
          label="Get Started"
          heading={
            <>
              See where you
              <br />
              <span className="text-gradient-primary">stand today.</span>
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
