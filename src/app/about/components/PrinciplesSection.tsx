'use client';
import React, { useEffect, useRef } from 'react';
import FeatureCard, { FeatureCardData } from '@/app/components/FeatureCard';

const principles: FeatureCardData[] = [
  {
    icon: 'DocumentCheckIcon',
    title: 'Evidence Over Claims',
    description: 'Skills are demonstrated through assessments and real projects — not self-reported ratings or completed-course lists.',
  },
  {
    icon: 'UserCircleIcon',
    title: 'Experience Still Matters',
    description: 'Existing technology experience is a foundation, not something to discard. ITtoAI builds on it rather than replacing it.',
  },
  {
    icon: 'ShieldCheckIcon',
    title: 'Honest About Outcomes',
    description: 'ITtoAI does not guarantee employment, placement or salary outcomes. What it provides is capability, evidence and relevant connections.',
  },
  {
    icon: 'BuildingOfficeIcon',
    title: 'Built for Both Sides',
    description: 'The same evidence-based profile that helps a professional show what they can do helps a company hire and upskill with more confidence.',
  },
];

export default function PrinciplesSection() {
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
    <section id="principles" ref={sectionRef} className="py-16 lg:py-20 bg-secondary" aria-labelledby="principles-heading">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label mb-5 inline-flex reveal-child stagger-1">How We Work</span>
          <h2 id="principles-heading" className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] reveal-child stagger-2">
            The principles behind
            <br />
            <span className="text-gradient-primary">how ITtoAI is built.</span>
          </h2>
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
