import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ResultPageBody from './components/ResultPageBody';

export const metadata: Metadata = {
  title: 'Example AI Readiness Report | ITtoAI',
  description: 'An example AI Readiness Assessment result using demonstration data — score, strengths, skill gaps, recommended career direction and next steps.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/assessment/result' },
  openGraph: {
    title: 'Example AI Readiness Report | ITtoAI',
    description: 'An example AI Readiness Assessment result using demonstration data.',
    url: '/assessment/result',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    type: 'website',
  },
};

export default function AssessmentResultPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <ResultPageBody />
      </main>
      <Footer />
    </>
  );
}
