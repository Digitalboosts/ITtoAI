'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const matchedRequirements = [
  { name: 'Python', status: 'matched' as const },
  { name: 'RAG', status: 'matched' as const },
  { name: 'LLM Engineering', status: 'matched' as const },
  { name: 'AI Agents', status: 'gap' as const },
];

export default function TalentMatchingSection() {
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
      id="talent-matching"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="talent-matching-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* Left: Text */}
          <div>
            <span className="section-label mb-5 inline-flex reveal-child stagger-1">Talent Matching</span>
            <h2
              id="talent-matching-heading"
              className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] mb-5 reveal-child stagger-2"
            >
              Matched on evidence,
              <br />
              <span className="text-gradient-primary">not keywords.</span>
            </h2>
            <p className="text-base sm:text-lg text-muted leading-relaxed mb-6 reveal-child stagger-3">
              ITtoAI matches verified candidates against your role requirements using their actual skill scores, assessments and completed projects.
            </p>
            <p className="text-base sm:text-lg text-muted leading-relaxed reveal-child stagger-4">
              A match score highlights where a candidate&apos;s verified capability aligns with the role — and where a gap remains, so your team knows exactly what to probe in interviews.
            </p>
          </div>

          {/* Right: Match Score Preview */}
          <div className="reveal-child stagger-3">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-700 border"
                style={{ background: 'rgba(245,158,11,0.08)', color: '#D97706', borderColor: 'rgba(245,158,11,0.2)' }}
                role="note"
              >
                <Icon name="InformationCircleIcon" size={12} aria-hidden="true" />
                Demo data — illustrative only
              </span>
            </div>

            <div className="bg-card rounded-2xl border border-border shadow-card p-6 sm:p-8" role="region" aria-label="Example candidate-to-role match score">
              <div className="flex items-center justify-between mb-6 pb-5 border-b border-border">
                <div>
                  <p className="label-text text-muted mb-1">MATCH SCORE</p>
                  <p className="text-sm text-muted">Example Candidate &rarr; AI Application Engineer</p>
                </div>
                <div
                  className="flex items-center justify-center w-16 h-16 rounded-full border-4 border-accent/20 flex-shrink-0"
                  style={{ background: 'conic-gradient(var(--accent) 0%, var(--accent) 91%, #E2E8F0 91%)' }}
                  aria-hidden="true"
                >
                  <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center">
                    <span className="text-xs font-700 text-accent">91%</span>
                  </div>
                </div>
              </div>

              <p className="label-text text-muted mb-3">MATCHED REQUIREMENTS</p>
              <div className="space-y-2">
                {matchedRequirements.map((req) => (
                  <div
                    key={req.name}
                    className="flex items-center justify-between gap-3 p-3 rounded-lg bg-secondary"
                  >
                    <span className="text-sm font-600 text-foreground">{req.name}</span>
                    {req.status === 'matched' ? (
                      <span className="flex items-center gap-1.5 text-xs font-700 text-success">
                        <Icon name="CheckCircleIcon" size={14} variant="solid" aria-hidden="true" />
                        Matched
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs font-700 text-warning">
                        <Icon name="ExclamationCircleIcon" size={14} variant="solid" aria-hidden="true" />
                        Gap
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground mt-5 leading-relaxed">
                Match scores are generated from verified skills, assessments and completed projects — not resume keyword matching.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
