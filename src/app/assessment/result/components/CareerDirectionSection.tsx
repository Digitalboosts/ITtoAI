'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import { AssessmentResult } from '../../lib/assessment-engine';

interface Props {
  result: AssessmentResult;
  isExample: boolean;
}

export default function CareerDirectionSection({ result, isExample }: Props) {
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
    <section id="direction" ref={sectionRef} className="py-20 lg:py-28 dark-section bg-dot-overlay" aria-labelledby="direction-heading">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="section-label-dark mb-5 inline-flex reveal-child stagger-1">Recommended Career Direction</span>
          <h2 id="direction-heading" className="section-heading-clamp font-800 tracking-tight text-white leading-[1.1] mb-8 reveal-child stagger-2">
            {isExample ? (
              <>
                Where this profile
                <br />
                <span className="text-gradient-primary">is best positioned to go.</span>
              </>
            ) : (
              <>
                Where you&apos;re
                <br />
                <span className="text-gradient-primary">best positioned to go.</span>
              </>
            )}
          </h2>

          <div className="flex items-center justify-center gap-3 flex-wrap mb-8 reveal-child stagger-3">
            <span className="text-base font-600 text-slate-200 rounded-xl px-5 py-3" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              {result.currentRoleLabel}
            </span>
            <Icon name="ArrowRightIcon" size={20} className="text-blue-300" aria-hidden="true" />
            <span className="text-base font-700 rounded-xl px-5 py-3 text-blue-300" style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)' }}>
              {result.recommendedRole}
            </span>
          </div>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 reveal-child stagger-4">
            {result.narrative}
          </p>

          <p className="text-xs text-slate-400 leading-relaxed reveal-child stagger-5">
            {isExample
              ? 'Illustrative example using randomized demo data — not a real recommendation.'
              : 'This is a simple frontend recommendation based on your profile and quick assessment answers — not a guaranteed placement or outcome, and not an AI-generated prediction.'}
          </p>
        </div>
      </div>
    </section>
  );
}
