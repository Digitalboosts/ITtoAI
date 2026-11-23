'use client';
import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { JobListing, isMatchedSkill } from '../../data';

// Illustrative recommended-preparation copy per AI specialization. Keyed loosely
// so any future job with a matching specialization inherits sensible guidance.
const preparationBySpecialization: Record<string, { learning: string; project: string }> = {
  'LLM Engineering': { learning: 'LLM API integration and production deployment patterns', project: 'Production AI API' },
  RAG: { learning: 'Retrieval-augmented generation architecture and evaluation', project: 'Enterprise RAG Assistant' },
  'AI Agents': { learning: 'Tool-calling and multi-step agent orchestration', project: 'AI Research Agent' },
  MLOps: { learning: 'Model deployment, monitoring and infrastructure design', project: 'Production AI API' },
  'AI Evaluation': { learning: 'Evaluation methodology and testing for AI systems', project: 'AI Research Agent' },
  'AI Product': { learning: 'AI product design and responsible AI fundamentals', project: 'AI Document Intelligence' },
};

function getMatchColor(pct: number): string {
  if (pct >= 80) return 'var(--success)';
  if (pct >= 50) return 'var(--accent)';
  return 'var(--warning)';
}

export default function YourMatchSection({ job }: { job: JobListing }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-child').forEach((el, i) => {
              setTimeout(() => el.classList.add('is-visible'), i * 70);
            });
            setTimeout(() => setAnimated(true), 300);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const matchedSkills = job.requiredSkills.filter(isMatchedSkill);
  const missingSkills = job.requiredSkills.filter((s) => !isMatchedSkill(s));
  const matchColor = getMatchColor(job.matchPercentage);
  const prep = preparationBySpecialization[job.aiSpecialization] ?? {
    learning: 'the specific skill gaps below',
    project: 'a relevant practical project',
  };

  return (
    <section id="your-match" ref={sectionRef} className="py-16 lg:py-20 dark-section bg-dot-overlay" aria-labelledby="your-match-heading">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 justify-center mb-6 reveal-child stagger-1">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-700 border"
            style={{ background: 'rgba(245,158,11,0.12)', color: '#FCD34D', borderColor: 'rgba(245,158,11,0.25)' }}
            role="note"
          >
            <Icon name="InformationCircleIcon" size={12} aria-hidden="true" />
            Example — Signed-In Preview
          </span>
        </div>

        <div className="text-center max-w-xl mx-auto mb-10 reveal-child stagger-2">
          <h2 id="your-match-heading" className="section-heading-clamp font-800 tracking-tight text-white leading-[1.1] mb-4">
            Your Match
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            This is what a signed-in ITtoAI member sees here, based on their verified skill profile. Sign in and complete your{' '}
            <a href="/assessment" className="underline text-blue-300 hover:text-blue-200">AI Readiness Assessment</a> to see your own match.
          </p>
        </div>

        <div className="dark-card-bg rounded-2xl border p-6 sm:p-8 reveal-child stagger-3">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 pb-8 border-b border-dark-border">
            <div
              className="flex items-center justify-center w-24 h-24 rounded-full border-4 flex-shrink-0"
              style={{ borderColor: `${matchColor}33`, background: `conic-gradient(${matchColor} 0%, ${matchColor} ${animated ? job.matchPercentage : 0}%, rgba(255,255,255,0.1) ${animated ? job.matchPercentage : 0}%)`, transition: 'background 1.2s cubic-bezier(0.16,1,0.3,1)' }}
              aria-hidden="true"
            >
              <div className="w-16 h-16 rounded-full bg-[#111F35] flex flex-col items-center justify-center">
                <span className="text-xl font-800 leading-none" style={{ color: matchColor }}>{job.matchPercentage}%</span>
              </div>
            </div>
            <div className="text-center sm:text-left">
              <p className="label-text text-slate-400 mb-1.5">MATCH SCORE FOR THIS ROLE</p>
              <p className="text-sm text-slate-300 leading-relaxed max-w-md">
                Based on verified skills against {job.title}&apos;s required capabilities. A higher score reflects closer skill alignment — it does not guarantee an interview or offer.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div>
              <div className="flex items-center gap-1.5 mb-3">
                <Icon name="CheckCircleIcon" size={14} className="text-success" variant="solid" aria-hidden="true" />
                <p className="text-2xs font-700 text-success uppercase tracking-wider">Matched Skills</p>
              </div>
              {matchedSkills.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {matchedSkills.map((skill) => (
                    <span key={skill} className="skill-chip text-success border-success/30" style={{ background: 'rgba(16,185,129,0.1)' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">No overlap with current profile yet.</p>
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5 mb-3">
                <Icon name="ExclamationTriangleIcon" size={14} className="text-warning" aria-hidden="true" />
                <p className="text-2xs font-700 text-warning uppercase tracking-wider">Skill Gaps</p>
              </div>
              {missingSkills.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {missingSkills.map((skill) => (
                    <span key={skill} className="skill-chip text-warning border-warning/30" style={{ background: 'rgba(245,158,11,0.1)' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">Fully covered by current profile.</p>
              )}
            </div>
          </div>

          <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="label-text text-slate-400 mb-2">RECOMMENDED PREPARATION</p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Focus on <strong className="text-white">{prep.learning}</strong>, then build practical evidence with a project like{' '}
              <strong className="text-white">{prep.project}</strong>. Revisit the relevant section of the AI Readiness Assessment to track progress.
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-400 text-center mt-6 reveal-child stagger-4 max-w-lg mx-auto leading-relaxed">
          Illustrative example. Match scores reflect assessed skill alignment — they do not guarantee an interview, offer or hiring outcome.
        </p>
      </div>
    </section>
  );
}
