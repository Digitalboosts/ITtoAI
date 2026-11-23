'use client';
import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const verifiedSkills = [
  { name: 'Python', score: 94 },
  { name: 'LLM Engineering', score: 91 },
  { name: 'RAG', score: 89 },
  { name: 'AI Agents', score: 85 },
  { name: 'FastAPI', score: 92 },
  { name: 'Docker', score: 88 },
];

const projects = ['Enterprise RAG System', 'AI Agent Framework', 'Production AI API'];
const assessments = ['Technical Assessment', 'AI System Design', 'Practical Project'];

export default function VerifiedProfile() {
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
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="verified"
      ref={sectionRef}
      className="py-20 lg:py-28 dark-section bg-dot-overlay"
      aria-labelledby="verified-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* Left: Text */}
          <div>
            <span className="section-label-dark mb-5 inline-flex reveal-child stagger-1">Verified Talent</span>
            <h2
              id="verified-heading"
              className="section-heading-clamp font-800 tracking-tight text-white leading-[1.1] mb-5 reveal-child stagger-2"
            >
              Don&apos;t just show an AI certificate.
              <br />
              <span className="text-gradient-primary">Show evidence.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 reveal-child stagger-3">
              ITtoAI is designed around practical capability — skills, assessments, projects and experience that demonstrate what you can actually build.
            </p>
            <a href="/companies" className="btn-primary reveal-child stagger-4">
              Explore AI Talent
              <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
            </a>
          </div>

          {/* Right: Example Profile Card */}
          <div className="reveal-child stagger-3">
            {/* Example label */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-700 border"
                style={{ background: 'rgba(245,158,11,0.12)', color: '#FCD34D', borderColor: 'rgba(245,158,11,0.25)' }}
                role="note"
              >
                <Icon name="InformationCircleIcon" size={12} aria-hidden="true" />
                Example Profile — For Illustration Only
              </span>
            </div>

            <div
              className="dark-card-bg rounded-2xl border p-6 sm:p-8"
              role="region"
              aria-label="Example verified AI professional profile"
            >
              {/* Profile Header */}
              <div className="flex items-start justify-between gap-4 mb-6 pb-5 border-b border-dark-border">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-800 text-white">Avnish Kumar</h3>
                    <span className="verified-badge">
                      <Icon name="CheckBadgeIcon" size={10} variant="solid" aria-hidden="true" />
                      ITtoAI Verified
                    </span>
                  </div>
                  <p className="text-sm font-600 text-blue-300 mb-1">AI Application Engineer</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-2xs font-700 text-slate-400 mb-1 uppercase tracking-wider">AI Readiness</p>
                  <div className="flex items-end gap-1 justify-end">
                    <span className="text-3xl font-800 text-white">87</span>
                    <span className="text-sm font-600 text-slate-400 pb-0.5">/ 100</span>
                  </div>
                </div>
              </div>

              {/* Verified Skills */}
              <div className="mb-6">
                <p className="label-text text-slate-400 mb-4">VERIFIED SKILLS</p>
                <div className="space-y-3">
                  {verifiedSkills?.map((skill, i) => (
                    <div key={skill?.name} className="flex items-center gap-3">
                      <span className="text-sm font-600 text-slate-200 w-36 flex-shrink-0">{skill?.name}</span>
                      <div className="flex-1 progress-bar-bg" style={{ background: 'rgba(255,255,255,0.08)' }} role="progressbar" aria-valuenow={skill?.score} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill?.name}: ${skill?.score}`}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: animated ? `${skill?.score}%` : '0%',
                            background: 'linear-gradient(90deg, #2563EB, #6366F1)',
                            transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-700 text-blue-300 w-8 text-right">{skill?.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects + Assessments */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="label-text text-slate-400 mb-3">PROJECTS</p>
                  <ul className="space-y-1.5">
                    {projects?.map((p) => (
                      <li key={p} className="flex items-center gap-2">
                        <Icon name="CheckCircleIcon" size={12} className="text-accent flex-shrink-0" variant="solid" aria-hidden="true" />
                        <span className="text-xs font-600 text-slate-300">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="label-text text-slate-400 mb-3">ASSESSMENTS</p>
                  <ul className="space-y-1.5">
                    {assessments?.map((a) => (
                      <li key={a} className="flex items-center gap-2">
                        <Icon name="CheckCircleIcon" size={12} className="text-accent flex-shrink-0" variant="solid" aria-hidden="true" />
                        <span className="text-xs font-600 text-slate-300">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}