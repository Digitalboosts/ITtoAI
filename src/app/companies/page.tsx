import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTASection from '@/app/components/CTASection';
import EmployerPipeline from '@/app/components/EmployerPipeline';
import EnterpriseDashboard from '@/app/components/EnterpriseDashboard';
import CompaniesHero from './components/CompaniesHero';
import ResumeProblemSection from './components/ResumeProblemSection';
import SkillsFirstHiringSection from './components/SkillsFirstHiringSection';
import VerifiedSkillEvidenceSection from './components/VerifiedSkillEvidenceSection';
import ProjectEvidenceSection from './components/ProjectEvidenceSection';
import TalentMatchingSection from './components/TalentMatchingSection';
import { HireTalentModalProvider } from './context/HireTalentModalContext';

export const metadata: Metadata = {
  title: 'For Companies | ITtoAI',
  description: 'Hire AI-ready talent. Build an AI-ready workforce. ITtoAI helps hiring teams evaluate technology professionals through verified skills, assessments and project evidence — not resume keywords.',
  alternates: { canonical: '/companies' },
  openGraph: {
    title: 'For Companies | ITtoAI',
    description: 'Hire AI-ready talent. Build an AI-ready workforce. Move beyond resume keywords with verified, evidence-based AI capability.',
    url: '/companies',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For Companies | ITtoAI',
    description: 'Hire AI-ready talent. Build an AI-ready workforce.',
  },
};

export default function CompaniesPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <HireTalentModalProvider>
          <CompaniesHero />
          <ResumeProblemSection />
          <SkillsFirstHiringSection />
          <VerifiedSkillEvidenceSection />
          <ProjectEvidenceSection />
          <TalentMatchingSection />
          <EmployerPipeline />
          <EnterpriseDashboard />
          <CTASection
            label="Get Started"
            heading={
              <>
                Ready to hire
                <br />
                <span className="text-gradient-primary">AI-ready talent?</span>
              </>
            }
            description="Move beyond resume keywords. Hire technology professionals with verified, evidence-based AI capability — or upgrade the team you already have."
            primaryLabel="Hire AI Talent"
            primaryOpensHireModal
            secondaryLabel="Transform Our Workforce"
            secondaryHref="#enterprise"
          />
        </HireTalentModalProvider>
      </main>
      <Footer />
    </>
  );
}
