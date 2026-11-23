'use client';
import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const skills = [
  { name: 'Python', score: 91 },
  { name: 'LLM Engineering', score: 68 },
  { name: 'RAG', score: 74 },
  { name: 'AI Agents', score: 52 },
  { name: 'AI Evaluation', score: 43 },
  { name: 'Cloud', score: 81 },
  { name: 'System Design', score: 76 },
];

const priorityGaps = ['AI Agents', 'AI Evaluation', 'Production RAG'];

function getScoreColor(score: number): string {
  if (score >= 80) return 'var(--success)';
  if (score >= 60) return 'var(--accent)';
  return 'var(--warning)';
}

export default function ReadinessDashboard() {
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
            setTimeout(() => setAnimated(true), 400);
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
      id="readiness"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-secondary relative"
      aria-labelledby="readiness-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* Left: Text */}
          <div>
            <span className="section-label mb-5 inline-flex reveal-child stagger-1">AI Readiness</span>
            <h2
              id="readiness-heading"
              className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] mb-5 reveal-child stagger-2"
            >
              What&apos;s Your
              <br />
              <span className="text-gradient-primary">AI Readiness?</span>
            </h2>
            <p className="text-base sm:text-lg text-muted leading-relaxed mb-8 reveal-child stagger-3">
              Know where you stand today — and what you need to build next. ITtoAI maps your existing skills against the requirements of your target AI role.
            </p>
            <a href="#readiness" className="btn-primary reveal-child stagger-4" aria-label="Get your AI Readiness Score">
              Get My AI Readiness Score
              <Icon name="ArrowRightIcon" size={16} variant="outline" aria-hidden="true" />
            </a>
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed reveal-child stagger-5 max-w-sm">
              Illustrative example. ITtoAI uses role-specific assessment methodology and evidence to compute readiness.
            </p>
          </div>

          {/* Right: Dashboard Preview */}
          <div className="reveal-child stagger-3">
            <div
              className="bg-card rounded-2xl border border-border shadow-card p-6 sm:p-8"
              role="region"
              aria-label="AI Readiness Dashboard example"
            >
              {/* Score Header */}
              <div className="flex items-center justify-between mb-6 pb-5 border-b border-border">
                <div>
                  <p className="label-text text-muted mb-1">AI READINESS SCORE</p>
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-800 text-foreground">72</span>
                    <span className="text-xl font-600 text-muted pb-1">/ 100</span>
                  </div>
                </div>
                <div
                  className="flex items-center justify-center w-16 h-16 rounded-full border-4 border-accent/20"
                  style={{ background: 'conic-gradient(var(--accent) 0%, var(--accent) 72%, #E2E8F0 72%)' }}
                  aria-hidden="true"
                >
                  <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center">
                    <span className="text-xs font-700 text-accent">72%</span>
                  </div>
                </div>
              </div>

              {/* Skill Bars */}
              <div className="space-y-4 mb-6">
                {skills.map((skill, i) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-600 text-foreground">{skill.name}</span>
                      <span className="text-sm font-700" style={{ color: getScoreColor(skill.score) }}>
                        {skill.score}%
                      </span>
                    </div>
                    <div className="progress-bar-bg" role="progressbar" aria-valuenow={skill.score} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill.name} score`}>
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: animated ? `${skill.score}%` : '0%',
                          background: `linear-gradient(90deg, ${getScoreColor(skill.score)}, ${getScoreColor(skill.score)}cc)`,
                          transitionDelay: `${i * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Career Direction */}
              <div className="bg-secondary rounded-xl p-4 mb-4">
                <p className="label-text text-muted mb-3">RECOMMENDED CAREER DIRECTION</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm font-600 text-foreground bg-card rounded-lg px-3 py-1.5 border border-border">
                    Python Developer
                  </span>
                  <Icon name="ArrowRightIcon" size={14} className="text-accent" aria-hidden="true" />
                  <span
                    className="text-sm font-700 rounded-lg px-3 py-1.5 text-accent"
                    style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)' }}
                  >
                    AI Application Engineer
                  </span>
                </div>
              </div>

              {/* Priority Gaps */}
              <div>
                <p className="label-text text-muted mb-3">PRIORITY SKILL GAPS</p>
                <div className="flex flex-wrap gap-2">
                  {priorityGaps.map((gap) => (
                    <span
                      key={gap}
                      className="skill-chip text-warning border-warning/30"
                      style={{ background: 'rgba(245,158,11,0.08)' }}
                    >
                      {gap}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}