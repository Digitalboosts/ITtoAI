'use client';
import React from 'react';
import Icon from '@/components/ui/AppIcon';

const foundationSkills = ['System Design', 'APIs', 'Cloud', 'Debugging', 'Production Ops'];
const aiLayerSkills = ['LLM Engineering', 'RAG', 'AI Agents', 'AI Evaluation'];

export default function ProfessionalsHero() {
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
                For Technology Professionals
              </span>
            </div>

            <h1 className="animate-in-up-delay-1 hero-text-clamp font-800 tracking-tight text-foreground leading-[1.05] mb-6">
              Your experience is valuable.<br />
              <span className="text-gradient-hero">Add the AI layer.</span>
            </h1>

            <p className="animate-in-up-delay-2 text-base sm:text-lg text-muted leading-relaxed mb-8 max-w-[520px]">
              Don&apos;t restart your IT career. Build on the skills you already have and add the AI capabilities required for the next generation of technology roles.
            </p>

            <div className="animate-in-up-delay-3 flex flex-wrap gap-3 mb-8">
              <a href="/assessment#begin" className="btn-primary">
                Check My AI Readiness
                <Icon name="ArrowRightIcon" size={16} variant="outline" aria-hidden="true" />
              </a>
              <a href="#paths" className="btn-secondary">
                Explore AI Career Paths
              </a>
            </div>

            <div className="animate-in-up-delay-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Software Engineers · Developers · QA · DevOps · Data &amp; Business Professionals
              </p>
            </div>
          </div>

          {/* Right: Experience + AI Layer visual */}
          <div className="relative flex items-center justify-center" aria-label="IT experience plus AI layer visualization" role="img">
            <div className="w-full max-w-[440px] mx-auto">

              {/* Floating skill nodes */}
              <div className="absolute -top-4 -right-2 hidden sm:block" aria-hidden="true">
                <div className="w-3 h-3 rounded-full bg-accent opacity-70 node-pulse" />
              </div>
              <div className="absolute top-1/3 -right-6 hidden sm:block" aria-hidden="true">
                <div className="w-2.5 h-2.5 rounded-full bg-accent-secondary opacity-60 node-pulse-delay-1" />
              </div>

              {/* Card 1: IT Foundation */}
              <div className="bg-card rounded-2xl border border-border shadow-card p-6 float-gentle">
                <p className="label-text text-muted mb-4">Your IT Foundation</p>
                <div className="flex flex-wrap gap-2">
                  {foundationSkills.map((skill) => (
                    <span key={skill} className="skill-chip bg-secondary text-foreground border-border">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* + AI connector */}
              <div className="flex items-center justify-center -my-4 relative z-10">
                <div
                  className="flex items-center justify-center w-14 h-14 rounded-full shadow-card border border-accent/20 font-800 text-accent text-sm"
                  style={{ background: 'linear-gradient(135deg, #EFF6FF, #EEF2FF)', boxShadow: '0 0 0 4px var(--card)' }}
                  aria-label="Plus AI"
                >
                  + AI
                </div>
              </div>

              {/* Card 2: AI Layer */}
              <div
                className="rounded-2xl border border-accent/25 p-6 mb-5 float-gentle-delay"
                style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #EEF2FF 100%)' }}
              >
                <p className="label-text text-accent mb-4">AI Layer Added</p>
                <div className="flex flex-wrap gap-2">
                  {aiLayerSkills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-chip text-accent border-accent/30"
                      style={{ background: 'rgba(37,99,235,0.08)' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 3: AI-Ready Role badge */}
              <div className="dark-card-bg rounded-2xl border p-5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-2xs font-700 text-slate-400 uppercase tracking-wider mb-1">Result</p>
                  <p className="text-sm font-700 text-white truncate">AI-Ready Professional</p>
                </div>
                <span className="verified-badge flex-shrink-0">
                  <Icon name="CheckBadgeIcon" size={10} variant="solid" aria-hidden="true" />
                  On Track
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
