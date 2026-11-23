import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTASection from '@/app/components/CTASection';
import ProfessionalsHero from './components/ProfessionalsHero';
import WhyExperienceMattersSection from './components/WhyExperienceMattersSection';
import ProfessionalsAudienceSection from './components/ProfessionalsAudienceSection';
import CareerPathsSection from './components/CareerPathsSection';
import SkillGapConceptSection from './components/SkillGapConceptSection';
import PracticalDevelopmentSection from './components/PracticalDevelopmentSection';
import AssessmentVerificationSection from './components/AssessmentVerificationSection';
import AIReadyProfileSection from './components/AIReadyProfileSection';
import CareerOpportunitiesSection from './components/CareerOpportunitiesSection';

export const metadata: Metadata = {
  title: 'For Professionals | ITtoAI',
  description: 'Your experience is valuable. Add the AI layer. ITtoAI helps existing IT professionals build on the skills they already have and transition toward AI-enabled roles.',
  alternates: { canonical: '/professionals' },
  openGraph: {
    title: 'For Professionals | ITtoAI',
    description: 'Don’t restart your IT career. Build on the skills you already have and add the AI capabilities required for the next generation of technology roles.',
    url: '/professionals',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For Professionals | ITtoAI',
    description: 'Your experience is valuable. Add the AI layer.',
  },
};

export default function ProfessionalsPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <ProfessionalsHero />
        <WhyExperienceMattersSection />
        <ProfessionalsAudienceSection />
        <CareerPathsSection />
        <SkillGapConceptSection />
        <PracticalDevelopmentSection />
        <AssessmentVerificationSection />
        <AIReadyProfileSection />
        <CareerOpportunitiesSection />
        <CTASection
          label="Get Started"
          heading={
            <>
              Ready to add
              <br />
              <span className="text-gradient-primary">the AI layer?</span>
            </>
          }
          description="Find your AI skill gaps. Build practical capability. Prove what you can do."
          primaryLabel="Check My AI Readiness"
          primaryHref="/assessment#begin"
          secondaryLabel="Explore AI Career Paths"
          secondaryHref="#paths"
        />
      </main>
      <Footer />
    </>
  );
}
