'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useHireTalentModalOptional } from '@/app/companies/context/HireTalentModalContext';

const pipelineSteps = [
  { label: 'Define', desc: 'Specify AI skills and role requirements', icon: 'DocumentTextIcon' },
  { label: 'Assess', desc: 'Evaluate candidates against real criteria', icon: 'ClipboardDocumentCheckIcon' },
  { label: 'Verify', desc: 'Review projects and evidence of capability', icon: 'CheckBadgeIcon' },
  { label: 'Match', desc: 'Connect with verified AI-ready professionals', icon: 'UserGroupIcon' },
  { label: 'Interview', desc: 'Interview pre-verified, qualified candidates', icon: 'ChatBubbleLeftRightIcon' },
  { label: 'Hire', desc: 'Hire with confidence in practical capability', icon: 'BriefcaseIcon' },
];

export default function EmployerPipeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const hireModal = useHireTalentModalOptional();

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
      id="companies"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="employer-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* Left: Pipeline Visual */}
          <div className="order-2 lg:order-1">
            <div className="bg-secondary rounded-2xl border border-border p-6 sm:p-8 reveal-child stagger-3">
              <p className="label-text text-muted mb-6">HIRING PIPELINE</p>
              <div className="space-y-3">
                {pipelineSteps.map((step, i) => (
                  <div
                    key={step.label}
                    className="flex items-center gap-4 p-3.5 bg-card rounded-xl border border-border group hover:border-accent/30 transition-colors"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{
                        background: `rgba(37,99,235,${0.06 + i * 0.02})`,
                      }}
                    >
                      <Icon name={step.icon as Parameters<typeof Icon>[0]['name']} size={16} className="text-accent" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-700 text-foreground">{step.label}</p>
                      <p className="text-xs text-muted truncate">{step.desc}</p>
                    </div>
                    <div
                      className="w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0"
                      style={{ borderColor: 'rgba(37,99,235,0.2)' }}
                      aria-hidden="true"
                    >
                      <span className="text-2xs font-700 text-accent">{i + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div className="order-1 lg:order-2">
            <span className="section-label mb-5 inline-flex reveal-child stagger-1">For Companies</span>
            <h2
              id="employer-heading"
              className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] mb-5 reveal-child stagger-2"
            >
              Hire AI-ready talent.
              <br />
              <span className="text-gradient-primary">Not just AI-certified candidates.</span>
            </h2>
            <p className="text-base sm:text-lg text-muted leading-relaxed mb-8 reveal-child stagger-3">
              AI keywords on a resume don&apos;t necessarily demonstrate practical capability. ITtoAI is designed around skills, assessments, projects and evidence — so you can hire with confidence.
            </p>
            <div className="flex flex-wrap gap-3 reveal-child stagger-4">
              {hireModal ? (
                <button type="button" onClick={hireModal.openModal} className="btn-primary">
                  Hire AI Talent
                  <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
                </button>
              ) : (
                <a href="/companies" className="btn-primary">
                  Hire AI Talent
                  <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
                </a>
              )}
              <a href="/contact" className="btn-secondary">
                Talk to ITtoAI
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}