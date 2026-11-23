'use client';
import React, { useEffect, useRef } from 'react';
import FeatureCard, { FeatureCardData } from '@/app/components/FeatureCard';

const reasons: FeatureCardData[] = [
  {
    icon: 'PuzzlePieceIcon',
    title: 'Systems Thinking',
    description: 'Years of working across systems, architectures and production environments give you intuition that AI tooling alone can’t replace.',
  },
  {
    icon: 'ShieldCheckIcon',
    title: 'Production Judgment',
    description: 'You already understand reliability, security and scale — the same judgment that separates a working AI feature from a production-ready one.',
  },
  {
    icon: 'UsersIcon',
    title: 'Stakeholder Fluency',
    description: 'You know how to translate business needs into technical solutions — a skill AI teams need as much as model knowledge.',
  },
  {
    icon: 'WrenchScrewdriverIcon',
    title: 'Debugging Instinct',
    description: 'Diagnosing complex systems under pressure is transferable. AI systems fail differently, but the discipline of finding root cause is the same.',
  },
];

export default function WhyExperienceMattersSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-child').forEach((el, i) => {
              setTimeout(() => el.classList.add('is-visible'), i * 80);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-experience-matters"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="why-experience-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label mb-5 inline-flex reveal-child stagger-1">Why It Still Matters</span>
          <h2
            id="why-experience-heading"
            className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] mb-5 reveal-child stagger-2"
          >
            Your experience isn&apos;t a
            <br />
            <span className="text-gradient-primary">starting-line problem.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed reveal-child stagger-3">
            Companies building with AI don&apos;t just need people who understand models — they need people who know how to ship reliable software, work with real data, and operate systems at scale. That&apos;s what you already bring.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((reason, i) => (
            <div key={reason.title} className={`reveal-child stagger-${i + 2}`}>
              <FeatureCard feature={reason} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
