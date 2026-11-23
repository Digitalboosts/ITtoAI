import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/AppIcon';

export const metadata: Metadata = {
  title: 'Page Not Found | ITtoAI',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="relative min-h-[80vh] flex items-center pt-24 pb-16 overflow-hidden bg-grid-overlay">
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06] pointer-events-none"
            style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
            aria-hidden="true"
          />
          <div className="max-w-[640px] mx-auto px-4 sm:px-6 lg:px-8 w-full text-center relative">
            <p className="text-7xl sm:text-8xl font-800 tracking-tight mb-6 text-gradient-hero" aria-hidden="true">
              404
            </p>
            <h1 className="text-2xl sm:text-3xl font-800 tracking-tight text-foreground leading-snug mb-4">
              Looks like this page took a different career path.
            </h1>
            <p className="text-base sm:text-lg text-muted leading-relaxed mb-9">
              The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back on track.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="/" className="btn-primary">
                <Icon name="HomeIcon" size={16} aria-hidden="true" />
                Back to ITtoAI
              </a>
              <a href="/assessment#begin" className="btn-secondary">
                Check My AI Readiness
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
