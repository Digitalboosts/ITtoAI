import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/AppIcon';

export const metadata: Metadata = {
  title: 'Terms of Service | ITtoAI',
  description: 'Terms of service for using the ITtoAI platform.',
  alternates: { canonical: '/terms' },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-grid-overlay">
          <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <span className="section-label mb-6 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
              Terms
            </span>
            <h1 className="hero-text-clamp font-800 tracking-tight text-foreground leading-[1.05] mb-6">
              Terms of Service
            </h1>
            <p className="text-base sm:text-lg text-muted leading-relaxed mb-8">
              ITtoAI provides skill assessment, career guidance, practical projects and evidence-based profiles for
              technology professionals, and talent discovery tools for companies. Use of the platform does not
              guarantee employment, placement or salary outcomes.
            </p>
            <div className="bg-card rounded-xl border border-dashed border-border p-6 mb-8">
              <div className="flex items-start gap-3">
                <Icon name="InformationCircleIcon" size={18} className="text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-sm text-muted leading-relaxed">
                  Our complete Terms of Service are being finalized and will be published here. If you have questions
                  in the meantime, please get in touch.
                </p>
              </div>
            </div>
            <a href="/contact" className="btn-primary">
              Contact Us
              <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
