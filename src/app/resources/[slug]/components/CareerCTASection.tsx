import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function CareerCTASection() {
  return (
    <section className="py-16 lg:py-20 dark-section bg-dot-overlay" aria-labelledby="career-cta-heading">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="section-label-dark mb-5 inline-flex">Next Step</span>
        <h2 id="career-cta-heading" className="section-heading-clamp font-800 tracking-tight text-white leading-[1.1] mb-5">
          Find Your AI
          <br />
          <span className="text-gradient-primary">Career Path.</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-lg mx-auto">
          See how your current skills line up against real AI-enabled roles, and exactly what to build next.
        </p>
        <a href="/assessment#begin" className="btn-primary">
          Check My AI Readiness
          <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
