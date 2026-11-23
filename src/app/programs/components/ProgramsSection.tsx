'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import ProgramCard from './ProgramCard';
import { programs } from '../data';

export default function ProgramsSection() {
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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="programs" ref={sectionRef} className="py-16 lg:py-24 bg-secondary" aria-labelledby="programs-heading">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="programs-heading" className="sr-only">AI career transformation programs</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {programs.map((program, i) => (
            <div key={program.id} className={`reveal-child stagger-${Math.min(i + 1, 8)}`}>
              <ProgramCard program={program} />
            </div>
          ))}
        </div>

        <div className="text-center mt-14 reveal-child stagger-5">
          <p className="text-sm text-muted mb-4">Not sure which program fits your background?</p>
          <a href="/assessment#begin" className="btn-secondary">
            Check My AI Readiness
            <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
