'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const overviewItems = [
  {
    icon: 'ClockIcon',
    label: 'Estimated Time',
    value: 'About 5 minutes',
    description: 'A quick check, not a long exam — 10 short questions.',
  },
  {
    icon: 'Squares2X2Icon',
    label: '10 Questions',
    value: 'One per skill category',
    description: 'From core programming through to responsible AI.',
  },
  {
    icon: 'DocumentCheckIcon',
    label: "What You'll Get",
    value: 'A personalized readiness report',
    description: 'Your score, skill breakdown, gaps and a recommended direction.',
  },
];

export default function AssessmentOverviewSection() {
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
      id="overview"
      ref={sectionRef}
      className="py-16 lg:py-20 bg-white border-b border-border"
      aria-labelledby="overview-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="overview-heading" className="sr-only">Before you start</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {overviewItems.map((item, i) => (
            <div
              key={item.label}
              className={`flex items-start gap-4 bg-secondary rounded-xl border border-border p-5 sm:p-6 reveal-child stagger-${i + 1}`}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(37,99,235,0.08)' }}
                aria-hidden="true"
              >
                <Icon name={item.icon} size={20} className="text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-2xs font-700 text-muted uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-base font-700 text-foreground mb-1">{item.value}</p>
                <p className="text-sm text-muted leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
