'use client';
import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function CareerHero() {
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
                Career Path Explorer
              </span>
            </div>

            <h1 className="animate-in-up-delay-1 hero-text-clamp font-800 tracking-tight text-foreground leading-[1.05] mb-6">
              Know your
              <br />
              <span className="text-gradient-hero">next career move.</span>
            </h1>

            <p className="animate-in-up-delay-2 text-base sm:text-lg text-muted leading-relaxed mb-8 max-w-[520px]">
              Explore how real technology roles map onto AI-enabled roles — and see exactly what skills, projects and learning close the gap.
            </p>

            <div className="animate-in-up-delay-3 flex flex-wrap gap-3 mb-8">
              <a href="/assessment#begin" className="btn-primary">
                Check My AI Readiness
                <Icon name="ArrowRightIcon" size={16} variant="outline" aria-hidden="true" />
              </a>
              <a href="#explorer" className="btn-secondary">
                Explore Career Paths
              </a>
            </div>

            <div className="animate-in-up-delay-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                9 career paths · Skills, projects, learning &amp; assessment focus for each
              </p>
            </div>
          </div>

          {/* Right: Example path preview */}
          <div className="relative flex items-center justify-center" aria-label="Example career path preview" role="img">
            <div className="w-full max-w-[420px] mx-auto">
              <div className="bg-card rounded-2xl border border-border shadow-card p-6 sm:p-8 float-gentle" role="region" aria-label="Example career path: Software Engineer to AI Engineer">
                <p className="label-text text-muted mb-6">EXAMPLE PATH</p>

                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(37,99,235,0.08)' }}
                    aria-hidden="true"
                  >
                    <Icon name="CodeBracketIcon" size={20} className="text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-600 text-muted">Software Engineer</p>
                    <div className="flex items-center gap-1.5">
                      <Icon name="ArrowRightIcon" size={12} className="text-accent flex-shrink-0" aria-hidden="true" />
                      <p className="text-sm font-700 text-foreground truncate">AI Engineer</p>
                    </div>
                  </div>
                </div>

                <div className="w-full h-px bg-border mb-5" aria-hidden="true" />

                <p className="text-2xs font-700 text-muted-foreground uppercase tracking-wider mb-3">Skills to add</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {['LLM Engineering', 'AI Agents', 'RAG', 'AI Evaluation'].map((skill) => (
                    <span
                      key={skill}
                      className="skill-chip text-accent border-accent/20"
                      style={{ background: 'rgba(37,99,235,0.06)' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon name="MapIcon" size={13} className="text-accent flex-shrink-0" aria-hidden="true" />
                  9 real career paths mapped &mdash; explore your own below
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
