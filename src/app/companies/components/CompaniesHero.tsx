'use client';
import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { useHireTalentModalOptional } from '../context/HireTalentModalContext';

const matchedSkills = ['Python', 'RAG', 'LLM Engineering', 'AI Agents'];

export default function CompaniesHero() {
  const hireModal = useHireTalentModalOptional();

  return (
    <section
      className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-grid-overlay"
      id="hero"
      aria-label="Hero section"
    >
      {/* Background gradient orbs */}
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
                For Companies &amp; Hiring Teams
              </span>
            </div>

            <h1 className="animate-in-up-delay-1 hero-text-clamp font-800 tracking-tight text-foreground leading-[1.05] mb-6">
              Hire AI-ready talent.<br />
              <span className="text-gradient-hero">Build an AI-ready workforce.</span>
            </h1>

            <p className="animate-in-up-delay-2 text-base sm:text-lg text-muted leading-relaxed mb-8 max-w-[520px]">
              Traditional resumes can list AI keywords without demonstrating practical capability. ITtoAI helps you hire technology professionals with verified, evidence-based AI skills — and grow the capability of the team you already have.
            </p>

            <div className="animate-in-up-delay-3 flex flex-wrap gap-3 mb-8">
              {hireModal ? (
                <button type="button" onClick={hireModal.openModal} className="btn-primary">
                  Hire AI Talent
                  <Icon name="ArrowRightIcon" size={16} variant="outline" aria-hidden="true" />
                </button>
              ) : (
                <a href="#companies" className="btn-primary">
                  Hire AI Talent
                  <Icon name="ArrowRightIcon" size={16} variant="outline" aria-hidden="true" />
                </a>
              )}
              <a href="#enterprise" className="btn-secondary">
                Transform Our Workforce
              </a>
            </div>

            <div className="animate-in-up-delay-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Skills-First Hiring · Verified Evidence · Practical Capability
              </p>
            </div>
          </div>

          {/* Right: Candidate match preview */}
          <div className="relative flex items-center justify-center" aria-label="Candidate match preview" role="img">
            <div className="w-full max-w-[440px] mx-auto">
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

              <div className="bg-card rounded-2xl border border-border shadow-card p-6 float-gentle" role="region" aria-label="Example candidate match card">
                <div className="flex items-start justify-between gap-4 mb-5 pb-5 border-b border-border">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(37,99,235,0.08)' }}
                      aria-hidden="true"
                    >
                      <Icon name="UserCircleIcon" size={22} className="text-accent" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-700 text-foreground truncate">Example Candidate</p>
                        <span className="verified-badge flex-shrink-0">
                          <Icon name="CheckBadgeIcon" size={10} variant="solid" aria-hidden="true" />
                          Verified
                        </span>
                      </div>
                      <p className="text-xs text-muted truncate">AI Application Engineer</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-accent/20 flex-shrink-0"
                    style={{ background: 'conic-gradient(var(--accent) 0%, var(--accent) 94%, #E2E8F0 94%)' }}
                    aria-hidden="true"
                  >
                    <div className="w-9 h-9 rounded-full bg-card flex items-center justify-center">
                      <span className="text-2xs font-700 text-accent">94%</span>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="text-2xs font-700 text-muted uppercase tracking-wider mb-0.5">Match Score</p>
                    <p className="text-sm font-600 text-foreground truncate">for GenAI Engineer role</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {matchedSkills.map((skill) => (
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
                  <Icon name="CheckCircleIcon" size={13} className="text-success flex-shrink-0" variant="solid" aria-hidden="true" />
                  Verified via 2 projects &middot; 3 assessments
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
