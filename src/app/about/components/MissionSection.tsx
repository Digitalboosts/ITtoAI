'use client';
import React, { useEffect, useRef } from 'react';

export default function MissionSection() {
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
    <section id="mission" ref={sectionRef} className="py-16 lg:py-20 bg-white" aria-labelledby="mission-heading">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="section-label mb-5 inline-flex reveal-child stagger-1">Why ITtoAI Exists</span>
        <h2 id="mission-heading" className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] mb-6 reveal-child stagger-2">
          AI is changing what technology
          <br />
          <span className="text-gradient-primary">roles require. Careers should adapt with evidence.</span>
        </h2>
        <p className="text-base sm:text-lg text-muted leading-relaxed mb-4 reveal-child stagger-3">
          Most existing IT professionals do not need to start over to work in AI-enabled roles. They need a clear way to see the specific gap between what they already know and what a target role requires — and a way to close it and prove it.
        </p>
        <p className="text-base sm:text-lg text-muted leading-relaxed reveal-child stagger-4">
          ITtoAI exists to make that process structured and evidence-based: skill assessment, practical projects, verification, and a path to relevant opportunities — for professionals transitioning into AI-enabled roles, and for the companies hiring and upskilling them.
        </p>
      </div>
    </section>
  );
}
