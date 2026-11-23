'use client';
import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function JobsHero() {
  return (
    <>
      {/* Demonstration data notice */}
      <div style={{ background: 'rgba(245,158,11,0.08)', borderBottom: '1px solid rgba(245,158,11,0.2)' }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-center gap-2 text-center flex-wrap">
          <Icon name="InformationCircleIcon" size={16} className="flex-shrink-0" style={{ color: '#D97706' }} aria-hidden="true" />
          <p className="text-sm font-600" style={{ color: '#92400E' }}>
            Example listings with fictional companies — for demonstration only, not live vacancies.
          </p>
        </div>
      </div>

      <section className="relative pt-16 pb-10 lg:pt-20 lg:pb-12 overflow-hidden bg-grid-overlay" id="hero" aria-label="Hero section">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
          aria-hidden="true"
        />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
          <div className="text-center max-w-2xl mx-auto">
            <div className="animate-in-up flex justify-center">
              <span className="section-label mb-6 inline-flex" role="text">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                AI Jobs
              </span>
            </div>

            <h1 className="animate-in-up-delay-1 hero-text-clamp font-800 tracking-tight text-foreground leading-[1.05] mb-6">
              AI jobs matched
              <br />
              <span className="text-gradient-hero">to your skills.</span>
            </h1>

            <p className="animate-in-up-delay-2 text-base sm:text-lg text-muted leading-relaxed max-w-[560px] mx-auto">
              Search AI-enabled technology roles and see exactly how your verified skill profile lines up — what matches, and what&apos;s still a gap.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
