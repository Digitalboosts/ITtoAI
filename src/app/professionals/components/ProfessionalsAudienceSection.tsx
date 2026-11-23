'use client';
import React, { useEffect, useRef } from 'react';
import RoleCard, { RoleCardData } from '@/app/components/RoleCard';

const roles: RoleCardData[] = [
  { role: 'Software Engineers', direction: 'AI Engineer', icon: 'CodeBracketIcon' },
  { role: 'Developers', direction: 'GenAI Engineer', icon: 'CommandLineIcon' },
  { role: 'QA Engineers', direction: 'AI QA Engineer', icon: 'CheckBadgeIcon' },
  { role: 'DevOps Engineers', direction: 'MLOps Engineer', icon: 'CloudIcon' },
  { role: 'Cloud Engineers', direction: 'AI Infrastructure Engineer', icon: 'ServerIcon' },
  { role: 'Data Professionals', direction: 'AI / Data Engineer', icon: 'ChartBarIcon' },
  { role: 'Business Analysts', direction: 'AI Business Analyst', icon: 'BriefcaseIcon' },
  { role: 'Product Professionals', direction: 'AI Product Manager', icon: 'RocketLaunchIcon' },
];

export default function ProfessionalsAudienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-child').forEach((el, i) => {
              setTimeout(() => el.classList.add('is-visible'), i * 60);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="who-its-for"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-secondary"
      aria-labelledby="who-its-for-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label mb-5 inline-flex reveal-child stagger-1">Who It&apos;s For</span>
          <h2
            id="who-its-for-heading"
            className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] reveal-child stagger-2"
          >
            Built for professionals
            <br />
            <span className="text-gradient-primary">already doing the work.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {roles.map((role, i) => (
            <div key={role.role} className={`reveal-child stagger-${Math.min(i + 2, 8)}`}>
              <RoleCard roleData={role} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
