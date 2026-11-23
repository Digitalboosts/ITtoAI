import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentHero from './components/AssessmentHero';
import AssessmentOverviewSection from './components/AssessmentOverviewSection';
import AssessmentCategoriesSection from './components/AssessmentCategoriesSection';
import AssessmentOnboardingForm from './components/AssessmentOnboardingForm';
import ResultPreviewSection from './components/ResultPreviewSection';
import { AssessmentProvider } from './context/AssessmentContext';

export const metadata: Metadata = {
  title: 'AI Readiness Assessment | ITtoAI',
  description: 'How AI-ready are you? Understand your current capabilities, identify skill gaps and discover what you should build next.',
  alternates: { canonical: '/assessment' },
  openGraph: {
    title: 'AI Readiness Assessment | ITtoAI',
    description: 'Understand your current capabilities, identify skill gaps and discover what you should build next.',
    url: '/assessment',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Readiness Assessment | ITtoAI',
    description: 'Understand your current capabilities, identify skill gaps and discover what you should build next.',
  },
};

export default function AssessmentPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <AssessmentHero />
        <AssessmentOverviewSection />
        <AssessmentCategoriesSection />
        <AssessmentProvider>
          <AssessmentOnboardingForm />
          <ResultPreviewSection />
        </AssessmentProvider>
      </main>
      <Footer />
    </>
  );
}
