'use client';
import React, { useEffect, useRef } from 'react';
import FeatureCard, { FeatureCardData } from './FeatureCard';

const features: FeatureCardData[] = [
  {
    icon: 'UserCircleIcon',
    title: 'Experience First',
    description: 'Build on the professional experience you already have. Your existing IT skills are a foundation, not a liability.',
  },
  {
    icon: 'AcademicCapIcon',
    title: 'Skills First',
    description: 'Focus on practical capabilities, not just certificates. What you can build matters more than what you can recite.',
  },
  {
    icon: 'DocumentCheckIcon',
    title: 'Proof of Work',
    description: 'Use projects and assessments to demonstrate what you can actually build — not just what you have studied.',
  },
  {
    icon: 'BriefcaseIcon',
    title: 'Career Connected',
    description: 'Connect skill development directly with AI career opportunities through verified profiles and talent discovery.',
  },
  {
    icon: 'UserGroupIcon',
    title: 'Ex-Microsoft Mentors',
    description: 'Train directly with industry practitioners — including ex-Microsoft engineers — who bring real, hands-on AI experience.',
  },
  {
    icon: 'ServerStackIcon',
    title: 'Real Production Context',
    description: 'See exactly how AI is used in current production environments, not just theoretical examples.',
  },
];

export default function WhyITtoAISection() {
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
      id="why"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-background"
      aria-labelledby="why-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label mb-5 inline-flex reveal-child stagger-1">Why ITtoAI</span>
          <h2
            id="why-heading"
            className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] reveal-child stagger-2"
          >
            Built differently.
            <br />
            <span className="text-gradient-primary">By design.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <div key={feature.title} className={`reveal-child stagger-${i + 2}`}>
              <FeatureCard feature={feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}