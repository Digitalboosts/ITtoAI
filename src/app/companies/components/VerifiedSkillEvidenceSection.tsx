'use client';
import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const verifiedSkills = [
  { name: 'Python', score: 92 },
  { name: 'LLM Engineering', score: 87 },
  { name: 'RAG', score: 84 },
  { name: 'AI Agents', score: 79 },
];

const assessments = [
  { name: 'Technical Assessment', status: 'Passed', score: 91 },
  { name: 'AI System Design', status: 'Passed', score: 88 },
  { name: 'Code Review', status: 'Passed', score: 85 },
];

export default function VerifiedSkillEvidenceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-child').forEach((el, i) => {
              setTimeout(() => el.classList.add('is-visible'), i * 80);
            });
            setTimeout(() => setAnimated(true), 500);
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
      id="verified-evidence"
      ref={sectionRef}
      className="py-20 lg:py-28 dark-section bg-dot-overlay"
      aria-labelledby="verified-evidence-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label-dark mb-5 inline-flex reveal-child stagger-1">Verified Skill Evidence</span>
          <h2
            id="verified-evidence-heading"
            className="section-heading-clamp font-800 tracking-tight text-white leading-[1.1] mb-5 reveal-child stagger-2"
          >
            See the evidence behind
            <br />
            <span className="text-gradient-primary">every skill claim.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed reveal-child stagger-3">
            Every candidate profile on ITtoAI is backed by verified skills and completed assessments — not self-reported ratings.
          </p>
        </div>

        <div className="flex items-center gap-2 justify-center mb-6 reveal-child stagger-4">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-700 border"
            style={{ background: 'rgba(245,158,11,0.12)', color: '#FCD34D', borderColor: 'rgba(245,158,11,0.25)' }}
            role="note"
          >
            <Icon name="InformationCircleIcon" size={12} aria-hidden="true" />
            Example Candidate Profile — For Illustration Only
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">

          {/* Candidate Profile + Verified Skills */}
          <div className="dark-card-bg rounded-2xl border p-6 sm:p-7 reveal-child stagger-4" role="region" aria-label="Example candidate profile with verified skills">
            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-dark-border">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(37,99,235,0.15)' }}
                aria-hidden="true"
              >
                <Icon name="UserCircleIcon" size={20} className="text-blue-300" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-700 text-white">Candidate Profile</h3>
                  <span className="verified-badge">
                    <Icon name="CheckBadgeIcon" size={10} variant="solid" aria-hidden="true" />
                    Verified
                  </span>
                </div>
                <p className="text-xs text-slate-400">GenAI Engineer</p>
              </div>
            </div>

            <p className="label-text text-slate-400 mb-4">VERIFIED SKILLS</p>
            <div className="space-y-3">
              {verifiedSkills.map((skill, i) => (
                <div key={skill.name} className="flex items-center gap-3">
                  <span className="text-sm font-600 text-slate-200 w-32 flex-shrink-0">{skill.name}</span>
                  <div className="flex-1 progress-bar-bg" style={{ background: 'rgba(255,255,255,0.08)' }} role="progressbar" aria-valuenow={skill.score} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill.name}: ${skill.score}`}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: animated ? `${skill.score}%` : '0%',
                        background: 'linear-gradient(90deg, #2563EB, #6366F1)',
                        transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-700 text-blue-300 w-8 text-right">{skill.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Assessment Evidence */}
          <div className="dark-card-bg rounded-2xl border p-6 sm:p-7 reveal-child stagger-5" role="region" aria-label="Example assessment evidence">
            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-dark-border">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(37,99,235,0.15)' }}
                aria-hidden="true"
              >
                <Icon name="ClipboardDocumentCheckIcon" size={20} className="text-blue-300" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-700 text-white">Assessment Evidence</h3>
                <p className="text-xs text-slate-400">3 of 3 completed</p>
              </div>
            </div>

            <div className="space-y-3">
              {assessments.map((assessment) => (
                <div
                  key={assessment.name}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon name="CheckCircleIcon" size={16} className="text-success flex-shrink-0" variant="solid" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="text-sm font-600 text-slate-200 truncate">{assessment.name}</p>
                      <p className="text-xs text-slate-400">{assessment.status}</p>
                    </div>
                  </div>
                  <span className="text-sm font-700 text-blue-300 flex-shrink-0">{assessment.score}/100</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
