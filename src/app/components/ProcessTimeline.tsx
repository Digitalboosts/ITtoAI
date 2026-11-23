'use client';
import React, { useEffect, useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Assess',
    description: 'Understand your current AI readiness through role-specific evaluation of your existing skills and experience, and map the gap to your target role.',
    color: 'var(--accent)',
  },
  {
    number: '02',
    title: 'Build',
    description: 'Develop practical AI capabilities through structured programs, hands-on projects, and applied learning.',
    color: '#8B5CF6',
  },
  {
    number: '03',
    title: 'Prove',
    description: 'Demonstrate your ability through real projects and technical assessments that show what you can actually build.',
    color: '#7C3AED',
  },
  {
    number: '04',
    title: 'Verify',
    description: 'Build an evidence-based ITtoAI profile with verified skills, completed projects, and assessment results.',
    color: '#6D28D9',
  },
  {
    number: '05',
    title: 'Match',
    description: 'Connect with relevant AI opportunities where your verified profile and practical capability speak for themselves.',
    color: '#5B21B6',
  },
];

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-child').forEach((el, i) => {
              setTimeout(() => el.classList.add('is-visible'), i * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="process-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-label mb-5 inline-flex reveal-child stagger-1">How It Works</span>
          <h2
            id="process-heading"
            className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] reveal-child stagger-2"
          >
            From IT Professional to{' '}
            <span className="text-gradient-primary">AI-Ready.</span>
          </h2>
        </div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:block relative reveal-child stagger-3">
          {/* Connecting line */}
          <div
            className="absolute top-8 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, var(--border), var(--border), transparent)' }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-5 gap-4">
            {steps?.map((step, i) => (
              <div key={step?.number} className={`flex flex-col items-center text-center reveal-child stagger-${i + 1}`}>
                <div
                  className="relative z-10 w-16 h-16 rounded-full border-2 flex items-center justify-center mb-5 bg-white"
                  style={{ borderColor: step?.color }}
                  aria-hidden="true"
                >
                  <span
                    className="text-xs font-800 tracking-wider"
                    style={{ color: step?.color }}
                  >
                    {step?.number}
                  </span>
                </div>
                <h3 className="text-base font-800 text-foreground mb-2">{step?.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{step?.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden relative">
          <div
            className="absolute left-6 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(180deg, transparent, var(--border), var(--border), transparent)' }}
            aria-hidden="true"
          />
          <div className="space-y-8">
            {steps?.map((step, i) => (
              <div key={step?.number} className={`flex gap-6 reveal-child stagger-${i + 1}`}>
                <div
                  className="relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center bg-white flex-shrink-0"
                  style={{ borderColor: step?.color }}
                  aria-hidden="true"
                >
                  <span className="text-xs font-800" style={{ color: step?.color }}>{step?.number}</span>
                </div>
                <div className="pt-2">
                  <h3 className="text-base font-800 text-foreground mb-1.5">{step?.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{step?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}