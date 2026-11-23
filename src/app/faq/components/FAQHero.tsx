'use client';
import React from 'react';

export default function FAQHero() {
  return (
    <section
      className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden bg-grid-overlay"
      id="hero"
      aria-label="Hero section"
    >
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }}
        aria-hidden="true"
      />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        <div className="text-center max-w-2xl mx-auto">
          <div className="animate-in-up flex justify-center">
            <span className="section-label mb-6 inline-flex" role="text">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
              FAQ
            </span>
          </div>

          <h1 className="animate-in-up-delay-1 hero-text-clamp font-800 tracking-tight text-foreground leading-[1.05] mb-6">
            Common questions,
            <br />
            <span className="text-gradient-hero">answered honestly.</span>
          </h1>

          <p className="animate-in-up-delay-2 text-base sm:text-lg text-muted leading-relaxed max-w-[560px] mx-auto">
            Search or browse by topic — from AI readiness assessments to hiring, verification and privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
