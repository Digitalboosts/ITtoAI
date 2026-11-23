'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const steps = [
  {
    icon: 'ClipboardDocumentCheckIcon',
    title: 'Assessment',
    description: 'A role-specific evaluation of your existing skills and experience against the requirements of your target AI role, producing a readiness score and priority skill gaps.',
  },
  {
    icon: 'CheckBadgeIcon',
    title: 'Verification',
    description: 'Evidence-based validation through completed projects and technical assessments — building a profile that shows what you can actually do, not just what you have studied.',
  },
];

export default function AssessmentVerificationSection() {
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
      id="assessment"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="assessment-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label mb-5 inline-flex reveal-child stagger-1">Assessment &amp; Verification</span>
          <h2
            id="assessment-heading"
            className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] mb-5 reveal-child stagger-2"
          >
            Know where you stand.
            <br />
            <span className="text-gradient-primary">Prove where you&apos;re going.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed reveal-child stagger-3">
            Two connected steps turn your existing experience into a credible, AI-ready profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-10">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`bg-card rounded-xl border border-border p-6 card-hover reveal-child stagger-${i + 2}`}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: 'rgba(37,99,235,0.08)' }}
                aria-hidden="true"
              >
                <Icon name={step.icon} size={20} className="text-accent" />
              </div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-2xs font-800 text-accent">{`0${i + 1}`}</span>
                <h3 className="text-base font-700 text-foreground">{step.title}</h3>
              </div>
              <p className="text-sm text-muted leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground max-w-xl mx-auto reveal-child stagger-4">
          Assessment and verification build an evidence-based profile — they do not guarantee employment, placement or salary outcomes.
        </p>
      </div>
    </section>
  );
}
