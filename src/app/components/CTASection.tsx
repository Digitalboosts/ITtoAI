'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useHireTalentModalOptional } from '@/app/companies/context/HireTalentModalContext';

interface CTASectionProps {
  label?: string;
  heading?: React.ReactNode;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  /** When true and rendered within a HireTalentModalProvider, the primary
   * button opens the Hire AI Talent form instead of navigating to primaryHref. */
  primaryOpensHireModal?: boolean;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTASection({
  label = 'Get Started',
  heading = (
    <>
      Ready to upgrade your
      <br />
      <span className="text-gradient-primary">IT career?</span>
    </>
  ),
  description = 'Find your AI skill gaps. Build practical capability. Prove what you can do.',
  primaryLabel = 'Check My AI Readiness',
  primaryHref = '/assessment#begin',
  primaryOpensHireModal = false,
  secondaryLabel = 'Hire AI Talent',
  secondaryHref = '#companies',
}: CTASectionProps) {
  const hireModal = useHireTalentModalOptional();
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
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="py-20 lg:py-28 dark-section bg-dot-overlay relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      {/* Floating skill nodes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[
          { label: 'LLMs', top: '15%', left: '8%' },
          { label: 'RAG', top: '70%', left: '6%' },
          { label: 'AI Agents', top: '25%', right: '7%' },
          { label: 'MLOps', top: '65%', right: '9%' },
          { label: 'FastAPI', top: '45%', left: '3%' },
          { label: 'Evaluation', top: '50%', right: '4%' },
        ]?.map((node, i) => (
          <div
            key={node?.label}
            className="absolute px-3 py-1.5 rounded-full text-xs font-600 border hidden lg:flex items-center"
            style={{
              top: node?.top,
              left: node?.left,
              right: node?.right,
              background: 'rgba(255,255,255,0.04)',
              borderColor: 'rgba(37,99,235,0.2)',
              color: 'rgba(148,163,184,0.7)',
              animationDelay: `${i * 0.5}s`,
            }}
          >
            {node?.label}
          </div>
        ))}
      </div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="section-label-dark mb-6 inline-flex reveal-child stagger-1">
            {label}
          </span>
          <h2
            id="cta-heading"
            className="section-heading-clamp font-800 tracking-tight text-white leading-[1.1] mb-5 reveal-child stagger-2"
          >
            {heading}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-10 reveal-child stagger-3">
            {description}
          </p>
          <div className="flex flex-wrap justify-center gap-4 reveal-child stagger-4">
            {primaryOpensHireModal && hireModal ? (
              <button type="button" onClick={hireModal.openModal} className="btn-primary text-base px-7 py-3.5">
                {primaryLabel}
                <Icon name="ArrowRightIcon" size={18} aria-hidden="true" />
              </button>
            ) : (
              <a href={primaryHref} className="btn-primary text-base px-7 py-3.5">
                {primaryLabel}
                <Icon name="ArrowRightIcon" size={18} aria-hidden="true" />
              </a>
            )}
            <a href={secondaryHref} className="btn-ghost-dark text-base px-7 py-3.5">
              {secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}