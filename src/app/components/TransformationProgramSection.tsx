'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import { programs } from '@/app/programs/data';

const featuredProgram = programs[0];

export default function TransformationProgramSection() {
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
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="transformation-program"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="transformation-program-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* Left: Text */}
          <div>
            <span className="section-label mb-5 inline-flex reveal-child stagger-1">The Program</span>
            <h2
              id="transformation-program-heading"
              className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] mb-5 reveal-child stagger-2"
            >
              {featuredProgram.currentRole} → {featuredProgram.targetRole}
              <br />
              <span className="text-gradient-primary">A structured {featuredProgram.duration} path.</span>
            </h2>
            <p className="text-base sm:text-lg text-muted leading-relaxed mb-8 reveal-child stagger-3">
              {featuredProgram.overview}
            </p>
            <div className="flex flex-wrap gap-3 reveal-child stagger-4">
              <a href="/programs" className="btn-primary">
                Explore the Program
                <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
              </a>
              <a href="/assessment#begin" className="btn-secondary">
                Check My AI Readiness
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed reveal-child stagger-5">
              Duration and curriculum vary by track — {featuredProgram.duration} shown here for {featuredProgram.currentRole} → {featuredProgram.targetRole}. See all programs for QA, DevOps and Data tracks.
            </p>
          </div>

          {/* Right: Curriculum Phases */}
          <div className="reveal-child stagger-3">
            <div className="bg-secondary rounded-2xl border border-border p-6 sm:p-8">
              <p className="label-text text-muted mb-6">CURRICULUM</p>
              <div className="space-y-4">
                {featuredProgram.curriculum.map((phase, i) => (
                  <div key={phase.title} className="flex gap-4">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div
                        className="w-8 h-8 rounded-full border-2 flex items-center justify-center bg-card"
                        style={{ borderColor: 'var(--accent)' }}
                      >
                        <span className="text-xs font-800 text-accent">{i + 1}</span>
                      </div>
                      {i < featuredProgram.curriculum.length - 1 && (
                        <div className="w-px flex-1 my-1" style={{ background: 'var(--border)' }} aria-hidden="true" />
                      )}
                    </div>
                    <div className="pb-4">
                      <h3 className="text-sm font-700 text-foreground mb-1">{phase.title}</h3>
                      <p className="text-xs text-muted leading-relaxed">{phase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
