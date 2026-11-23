'use client';
import React, { useEffect, useRef } from 'react';
import FeatureCard, { FeatureCardData } from '@/app/components/FeatureCard';

const principles: FeatureCardData[] = [
  {
    icon: 'AcademicCapIcon',
    title: 'Beyond Certificates',
    description: 'Evaluate what a candidate can actually do, not just which courses or certifications they have completed.',
  },
  {
    icon: 'CodeBracketIcon',
    title: 'Practical Demonstration',
    description: 'Candidates show their work through real, applied AI projects — not just a description of past experience.',
  },
  {
    icon: 'ClipboardDocumentCheckIcon',
    title: 'Structured Assessment',
    description: 'Role-specific technical evaluation replaces generic screening questions with a consistent, defensible process.',
  },
  {
    icon: 'ChartBarIcon',
    title: 'Comparable Signal',
    description: 'Consistent scoring across candidates makes it easier to compare talent fairly across a hiring pipeline.',
  },
];

export default function SkillsFirstHiringSection() {
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
      id="skills-first"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="skills-first-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label mb-5 inline-flex reveal-child stagger-1">Skills-First Hiring</span>
          <h2
            id="skills-first-heading"
            className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] mb-5 reveal-child stagger-2"
          >
            Hire for what candidates
            <br />
            <span className="text-gradient-primary">can do, not just say.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed reveal-child stagger-3">
            ITtoAI is built around demonstrated capability — so your team can hire with confidence, not guesswork.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {principles.map((principle, i) => (
            <div key={principle.title} className={`reveal-child stagger-${i + 2}`}>
              <FeatureCard feature={principle} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
