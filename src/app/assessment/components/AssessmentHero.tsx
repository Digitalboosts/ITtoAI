'use client';
import React from 'react';
import Icon from '@/components/ui/AppIcon';

const previewCategories = ['Programming', 'AI Fundamentals', 'LLM Engineering', 'RAG', 'AI Agents'];

export default function AssessmentHero() {
  return (
    <section
      className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-grid-overlay"
      id="hero"
      aria-label="Hero section"
    >
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }}
        aria-hidden="true"
      />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* Left: Text Content */}
          <div className="flex flex-col">
            <div className="animate-in-up">
              <span className="section-label mb-6 inline-flex" role="text">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                AI Readiness Assessment
              </span>
            </div>

            <h1 className="animate-in-up-delay-1 hero-text-clamp font-800 tracking-tight text-foreground leading-[1.05] mb-6">
              How AI-ready
              <br />
              <span className="text-gradient-hero">are you?</span>
            </h1>

            <p className="animate-in-up-delay-2 text-base sm:text-lg text-muted leading-relaxed mb-8 max-w-[520px]">
              Understand your current capabilities, identify skill gaps and discover what you should build next.
            </p>

            <div className="animate-in-up-delay-3 flex flex-wrap gap-3 mb-8">
              <a href="#begin" className="btn-primary">
                Start Assessment
                <Icon name="ArrowRightIcon" size={16} variant="outline" aria-hidden="true" />
              </a>
            </div>

            <div className="animate-in-up-delay-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                10 skill categories · ~5 minutes · Free to complete
              </p>
            </div>
          </div>

          {/* Right: Score placeholder preview */}
          <div className="relative flex items-center justify-center" aria-label="AI readiness score preview" role="img">
            <div className="w-full max-w-[420px] mx-auto">
              <div className="bg-card rounded-2xl border border-border shadow-card p-6 sm:p-8 float-gentle" role="region" aria-label="Your AI readiness score, not yet calculated">
                <p className="label-text text-muted mb-6 text-center">YOUR AI READINESS</p>

                <div className="flex items-center justify-center mb-6">
                  <div
                    className="flex items-center justify-center w-32 h-32 rounded-full border-4 flex-shrink-0"
                    style={{ borderColor: 'var(--border)' }}
                    aria-hidden="true"
                  >
                    <div className="w-24 h-24 rounded-full bg-card flex flex-col items-center justify-center">
                      <span className="text-3xl font-800 text-muted-foreground">?</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-center text-muted leading-relaxed mb-6">
                  Complete the assessment to reveal your score
                </p>

                <div className="w-full h-px bg-border mb-5" aria-hidden="true" />

                <p className="text-2xs font-700 text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  What we&apos;ll assess
                </p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {previewCategories.map((cat) => (
                    <span key={cat} className="skill-chip bg-secondary text-muted border-border">
                      {cat}
                    </span>
                  ))}
                  <span className="skill-chip bg-secondary text-muted-foreground border-border">
                    +5 more
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
