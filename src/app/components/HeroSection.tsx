'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const currentITSkills = ['Python', 'Java', '.NET', 'QA', 'DevOps', 'Cloud', 'Data'];
const aiSkills = ['LLMs', 'RAG', 'AI Agents', 'AI Eval', 'AI Automation', 'AI Design'];
const aiRoles = ['AI Engineer', 'GenAI Engineer', 'MLOps Engineer', 'AI App Engineer'];

export default function HeroSection() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const lines = svgRef?.current?.querySelectorAll('.line-connector');
    if (!lines) return;
    const timer = setTimeout(() => {
      lines?.forEach((line, i) => {
        setTimeout(() => line?.classList?.add('is-drawn'), i * 200);
      });
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-grid-overlay"
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
                AI Workforce Transformation Platform
              </span>
            </div>

            <h1 className="animate-in-up-delay-1 hero-text-clamp font-800 tracking-tight text-foreground leading-[1.05] mb-6">
              Your IT Career.<br />
              <span className="text-gradient-hero">Upgraded for AI.</span>
            </h1>

            <p className="animate-in-up-delay-2 text-base sm:text-lg text-muted leading-relaxed mb-8 max-w-[520px]">
              AI is changing what companies expect from technology professionals. ITtoAI helps you identify your AI skill gaps, build practical AI capabilities, prove what you can do, and become ready for the next generation of technology roles.
            </p>

            <div className="animate-in-up-delay-3 flex flex-wrap gap-3 mb-8">
              <a href="/assessment#begin" className="btn-primary">
                Check My AI Readiness
                <Icon name="ArrowRightIcon" size={16} variant="outline" aria-hidden="true" />
              </a>
              <a href="#companies" className="btn-secondary">
                Hire AI Talent
              </a>
            </div>

            <div className="animate-in-up-delay-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Software Engineers · Developers · QA · DevOps · Data Professionals · IT Professionals
              </p>
            </div>
          </div>

          {/* Right: AI Career Transformation Visualization */}
          <div className="relative flex items-center justify-center float-gentle" aria-label="AI career transformation visualization" role="img">
            <div className="w-full max-w-[520px] mx-auto">
              <svg
                ref={svgRef}
                viewBox="0 0 520 480"
                className="w-full h-auto"
                aria-hidden="true"
                role="presentation"
              >
                {/* Stage 1: Current IT */}
                <g>
                  <rect x="20" y="20" width="140" height="200" rx="10" fill="white" stroke="#E2E8F0" strokeWidth="1.5" />
                  <text x="90" y="44" textAnchor="middle" fontSize="8" fill="#64748B" fontFamily="Manrope, sans-serif" fontWeight="700" letterSpacing="1">CURRENT IT</text>
                  <line x1="30" y1="52" x2="150" y2="52" stroke="#E2E8F0" strokeWidth="1" />
                  {currentITSkills?.map((skill, i) => (
                    <g key={skill}>
                      <rect x="30" y={64 + i * 22} width="100" height="16" rx="8" fill="#F1F5F9" />
                      <text x="80" y={76 + i * 22} textAnchor="middle" fontSize="8.5" fill="#0F172A" fontFamily="Manrope, sans-serif" fontWeight="600">{skill}</text>
                    </g>
                  ))}
                </g>

                {/* Arrow + AI label */}
                <g>
                  <line x1="160" y1="120" x2="195" y2="120" stroke="#2563EB" strokeWidth="2" strokeDasharray="4 3" />
                  <polygon points="195,115 205,120 195,125" fill="#2563EB" />
                  <rect x="163" y="104" width="30" height="18" rx="9" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1" />
                  <text x="178" y="116" textAnchor="middle" fontSize="8" fill="#2563EB" fontFamily="Manrope, sans-serif" fontWeight="800">+ AI</text>
                </g>

                {/* Stage 2: AI Skill Gap */}
                <g>
                  <rect x="205" y="20" width="140" height="200" rx="10" fill="white" stroke="#BFDBFE" strokeWidth="1.5" />
                  <rect x="205" y="20" width="140" height="200" rx="10" fill="url(#accentGrad)" opacity="0.04" />
                  <text x="275" y="44" textAnchor="middle" fontSize="8" fill="#2563EB" fontFamily="Manrope, sans-serif" fontWeight="700" letterSpacing="1">AI SKILL GAP</text>
                  <line x1="215" y1="52" x2="335" y2="52" stroke="#BFDBFE" strokeWidth="1" />
                  {aiSkills?.map((skill, i) => (
                    <g key={skill}>
                      <rect x="215" y={64 + i * 25} width="110" height="18" rx="9" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1" />
                      <text x="270" y={77 + i * 25} textAnchor="middle" fontSize="8.5" fill="#1B3A6B" fontFamily="Manrope, sans-serif" fontWeight="600">{skill}</text>
                    </g>
                  ))}
                </g>

                {/* Stage 3: AI-Ready Roles */}
                <g>
                  <rect x="20" y="250" width="160" height="130" rx="10" fill="#0F172A" stroke="#1E3A5F" strokeWidth="1.5" />
                  <text x="100" y="273" textAnchor="middle" fontSize="8" fill="#60A5FA" fontFamily="Manrope, sans-serif" fontWeight="700" letterSpacing="1">AI-READY PROFESSIONAL</text>
                  <line x1="30" y1="281" x2="170" y2="281" stroke="#1E3A5F" strokeWidth="1" />
                  {aiRoles?.map((role, i) => (
                    <g key={role}>
                      <circle cx="35" cy={298 + i * 22} r="3" fill="#2563EB" />
                      <text x="44" y={303 + i * 22} fontSize="9" fill="#F1F5F9" fontFamily="Manrope, sans-serif" fontWeight="600">{role}</text>
                    </g>
                  ))}
                </g>

                {/* Stage 4: Opportunity */}
                <g>
                  <rect x="205" y="250" width="140" height="130" rx="10" fill="#1B3A6B" stroke="#2563EB" strokeWidth="1.5" />
                  <text x="275" y="273" textAnchor="middle" fontSize="8" fill="#93C5FD" fontFamily="Manrope, sans-serif" fontWeight="700" letterSpacing="1">OPPORTUNITY</text>
                  <line x1="215" y1="281" x2="335" y2="281" stroke="#2563EB" strokeWidth="1" />
                  <circle cx="275" cy="305" r="22" fill="none" stroke="#2563EB" strokeWidth="1.5" opacity="0.6" />
                  <circle cx="275" cy="305" r="14" fill="none" stroke="#2563EB" strokeWidth="1.5" opacity="0.4" />
                  <circle cx="275" cy="305" r="7" fill="#2563EB" />
                  <text x="275" y="341" textAnchor="middle" fontSize="8.5" fill="#93C5FD" fontFamily="Manrope, sans-serif" fontWeight="700">Verified AI Talent</text>
                  <text x="275" y="355" textAnchor="middle" fontSize="7.5" fill="#60A5FA" fontFamily="Manrope, sans-serif" fontWeight="500">AI Career Opportunities</text>
                  <text x="275" y="368" textAnchor="middle" fontSize="7.5" fill="#60A5FA" fontFamily="Manrope, sans-serif" fontWeight="500">Evidence-Based Profile</text>
                </g>

                {/* Connecting arrows between stages */}
                {/* IT → Gap (already shown above) */}
                {/* Gap → Roles */}
                <line x1="275" y1="222" x2="275" y2="248" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="4 3" className="line-connector" />
                <polygon points="270,248 275,258 280,248" fill="#2563EB" />
                {/* Roles → Opportunity */}
                <line x1="182" y1="315" x2="203" y2="315" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="4 3" className="line-connector" />
                <polygon points="203,310 213,315 203,320" fill="#60A5FA" />

                {/* Floating nodes */}
                <circle cx="390" cy="60" r="5" fill="#2563EB" opacity="0.7" className="node-pulse" />
                <circle cx="420" cy="120" r="3.5" fill="#6366F1" opacity="0.6" className="node-pulse-delay-1" />
                <circle cx="400" cy="180" r="4" fill="#2563EB" opacity="0.5" className="node-pulse-delay-2" />
                <circle cx="450" cy="90" r="3" fill="#93C5FD" opacity="0.8" className="node-pulse-delay-3" />
                <circle cx="440" cy="160" r="4.5" fill="#6366F1" opacity="0.4" className="node-pulse" />
                <line x1="390" y1="60" x2="420" y2="120" stroke="#2563EB" strokeWidth="0.8" opacity="0.25" />
                <line x1="420" y1="120" x2="400" y2="180" stroke="#6366F1" strokeWidth="0.8" opacity="0.25" />
                <line x1="390" y1="60" x2="450" y2="90" stroke="#93C5FD" strokeWidth="0.8" opacity="0.2" />
                <line x1="450" y1="90" x2="440" y2="160" stroke="#2563EB" strokeWidth="0.8" opacity="0.2" />

                {/* Readiness score badge */}
                <g className="float-gentle-delay">
                  <rect x="365" y="270" width="140" height="80" rx="10" fill="white" stroke="#E2E8F0" strokeWidth="1.5" filter="url(#shadow)" />
                  <text x="435" y="292" textAnchor="middle" fontSize="7.5" fill="#64748B" fontFamily="Manrope, sans-serif" fontWeight="600" letterSpacing="0.5">AI READINESS</text>
                  <text x="435" y="318" textAnchor="middle" fontSize="26" fill="#1B3A6B" fontFamily="Manrope, sans-serif" fontWeight="800">72</text>
                  <text x="435" y="332" textAnchor="middle" fontSize="8" fill="#64748B" fontFamily="Manrope, sans-serif" fontWeight="500">/ 100</text>
                  <rect x="375" y="338" width="120" height="5" rx="2.5" fill="#E2E8F0" />
                  <rect x="375" y="338" width="86" height="5" rx="2.5" fill="url(#progressGrad)" />
                </g>

                <defs>
                  <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#6366F1" />
                  </linearGradient>
                  <linearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#6366F1" />
                  </linearGradient>
                  <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0F172A" floodOpacity="0.08" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}