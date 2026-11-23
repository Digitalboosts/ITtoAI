'use client';
import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useAssessment } from '../context/AssessmentContext';
import { getScoreColor } from '../lib/assessment-engine';
import LeadCaptureModal from './LeadCaptureModal';

function LockedState() {
  return (
    <div className="dark-card-bg rounded-2xl border p-6 sm:p-8 text-center" role="region" aria-label="Your AI readiness score, not yet calculated">
      <p className="label-text text-slate-400 mb-4">YOUR AI READINESS</p>
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center justify-center w-24 h-24 rounded-full border-4 border-dark-border flex-shrink-0" aria-hidden="true">
          <span className="text-4xl font-800 text-slate-500">?</span>
        </div>
      </div>
      <h3 className="text-xl font-800 text-white mb-3">Your AI readiness score is waiting.</h3>
      <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-7 max-w-md mx-auto">
        Complete the quick assessment to reveal your personalized result — score, skill breakdown, gaps and a recommended career direction.
      </p>
      <a href="#begin" className="btn-primary">
        Start Assessment
        <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
      </a>
    </div>
  );
}

function CalculatedState() {
  const { result, profile } = useAssessment();
  const [animated, setAnimated] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(t);
  }, []);

  if (!result) return null;

  return (
    <>
      <div className="dark-card-bg rounded-2xl border p-6 sm:p-8" role="region" aria-label="Your AI readiness result">
        {/* AI Readiness Score */}
        <div className="flex items-center justify-between mb-6 pb-5 border-b border-dark-border">
          <div>
            <p className="label-text text-slate-400 mb-1">AI READINESS SCORE</p>
            <div className="flex items-end gap-1">
              <span className="text-5xl font-800 text-white">{result.overall}</span>
              <span className="text-xl font-600 text-slate-400 pb-1">/ 100</span>
            </div>
          </div>
          <div
            className="flex items-center justify-center w-16 h-16 rounded-full border-4 border-accent/25 flex-shrink-0"
            style={{ background: `conic-gradient(var(--accent) 0%, var(--accent) ${animated ? result.overall : 0}%, rgba(255,255,255,0.1) ${animated ? result.overall : 0}%)`, transition: 'background 1.2s cubic-bezier(0.16,1,0.3,1)' }}
            aria-hidden="true"
          >
            <div className="w-10 h-10 rounded-full bg-[#111F35] flex items-center justify-center">
              <span className="text-xs font-700 text-blue-300">{result.overall}%</span>
            </div>
          </div>
        </div>

        {/* Skill Breakdown */}
        <div className="mb-6">
          <p className="label-text text-slate-400 mb-4">SKILL BREAKDOWN</p>
          <div className="space-y-3">
            {result.skills.map((skill, i) => (
              <div key={skill.name} className="flex items-center gap-3">
                <span className="text-sm font-600 text-slate-200 w-36 flex-shrink-0">{skill.name}</span>
                <div className="flex-1 progress-bar-bg" style={{ background: 'rgba(255,255,255,0.08)' }} role="progressbar" aria-valuenow={skill.score} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill.name}: ${skill.score}`}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: animated ? `${skill.score}%` : '0%',
                      background: `linear-gradient(90deg, ${getScoreColor(skill.score)}, ${getScoreColor(skill.score)}cc)`,
                      transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`,
                    }}
                  />
                </div>
                <span className="text-sm font-700 w-8 text-right" style={{ color: getScoreColor(skill.score) }}>{skill.score}</span>
              </div>
            ))}
          </div>
          <p className="text-2xs text-slate-500 mt-3 leading-relaxed">
            Based on your quick assessment answers — one scenario per category, not a full certification exam.
          </p>
        </div>

        {/* Skill Gaps */}
        <div className="mb-6">
          <p className="label-text text-slate-400 mb-3">SKILL GAPS</p>
          <div className="flex flex-wrap gap-2">
            {result.gaps.map((gap) => (
              <span key={gap.name} className="skill-chip text-warning border-warning/30" style={{ background: 'rgba(245,158,11,0.1)' }}>
                {gap.name}
              </span>
            ))}
          </div>
        </div>

        {/* Recommended Career Direction */}
        <div>
          <p className="label-text text-slate-400 mb-3">RECOMMENDED CAREER DIRECTION</p>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-600 text-slate-200 rounded-lg px-3 py-1.5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              {result.currentRoleLabel}
            </span>
            <Icon name="ArrowRightIcon" size={14} className="text-blue-300" aria-hidden="true" />
            <span className="text-sm font-700 rounded-lg px-3 py-1.5 text-blue-300" style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)' }}>
              {result.recommendedRole}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-5 mt-6">
        <a href="/career" className="inline-flex items-center gap-1.5 text-sm font-700 text-blue-300 hover:text-blue-200 transition-colors">
          View My Career Roadmap
          <Icon name="ArrowRightIcon" size={14} aria-hidden="true" />
        </a>
        <button type="button" onClick={() => setLeadModalOpen(true)} className="btn-primary">
          I Want to Build My AI Career
          <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
        </button>
      </div>

      <LeadCaptureModal
        open={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        defaults={{
          currentRole: profile.role ?? '',
          yearsExperience: profile.experience ?? '',
          targetRole: result.recommendedRole,
        }}
      />
    </>
  );
}

export default function ResultPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { hydrated, step } = useAssessment();

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

  const isComplete = hydrated && step === 'result';

  return (
    <section id="result-preview" ref={sectionRef} className="py-20 lg:py-28 dark-section bg-dot-overlay" aria-labelledby="result-preview-heading">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="section-label-dark mb-5 inline-flex reveal-child stagger-1">
            {isComplete ? 'Your Result' : "What You'll Receive"}
          </span>
          <h2 id="result-preview-heading" className="section-heading-clamp font-800 tracking-tight text-white leading-[1.1] mb-5 reveal-child stagger-2">
            A clear picture of
            <br />
            <span className="text-gradient-primary">where you stand.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed reveal-child stagger-3">
            {isComplete
              ? 'Your results turn ten quick questions into a single, actionable readiness report.'
              : 'Complete the assessment to turn ten quick questions into a single, actionable readiness report.'}
          </p>
        </div>

        <div className="max-w-3xl mx-auto reveal-child stagger-4">
          {!hydrated ? (
            <div className="dark-card-bg rounded-2xl border p-6 sm:p-8 h-72 animate-pulse" aria-hidden="true" />
          ) : isComplete ? (
            <CalculatedState />
          ) : (
            <LockedState />
          )}
        </div>
      </div>
    </section>
  );
}
