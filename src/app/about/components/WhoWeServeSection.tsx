'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const audiences = [
  {
    icon: 'UserCircleIcon',
    label: 'For Professionals',
    title: 'Build your AI layer on real experience.',
    description: 'Assess your skills, close the specific gaps that matter for your target role, and build an evidence-based profile.',
    href: '/professionals',
    cta: 'Explore for Professionals',
  },
  {
    icon: 'BuildingOfficeIcon',
    label: 'For Companies',
    title: 'Hire and upskill with evidence, not keywords.',
    description: 'Access verified, AI-ready professionals and transform the technology teams you already have.',
    href: '/companies',
    cta: 'Explore for Companies',
  },
];

export default function WhoWeServeSection() {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="who-we-serve" ref={sectionRef} className="py-16 lg:py-20 bg-white" aria-labelledby="who-we-serve-heading">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="who-we-serve-heading" className="sr-only">Who ITtoAI serves</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {audiences.map((audience, i) => (
            <a
              key={audience.href}
              href={audience.href}
              className={`group relative bg-card rounded-2xl border border-border shadow-card card-hover p-8 reveal-child stagger-${i + 1}`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ background: 'rgba(37,99,235,0.08)' }}
                aria-hidden="true"
              >
                <Icon name={audience.icon} size={22} className="text-accent" />
              </div>
              <p className="text-2xs font-700 text-accent uppercase tracking-wider mb-2">{audience.label}</p>
              <h3 className="text-xl font-800 text-foreground leading-snug mb-3">{audience.title}</h3>
              <p className="text-sm text-muted leading-relaxed mb-6">{audience.description}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-700 text-accent">
                {audience.cta}
                <Icon name="ArrowRightIcon" size={14} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
