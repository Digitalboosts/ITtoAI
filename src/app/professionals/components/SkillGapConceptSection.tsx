'use client';
import React, { useEffect, useRef, useState } from 'react';

const gapSkills = [
  { name: 'Core Programming', score: 88 },
  { name: 'System Design', score: 79 },
  { name: 'LLM Engineering', score: 41 },
  { name: 'RAG & AI Agents', score: 34 },
];

function getScoreColor(score: number): string {
  if (score >= 70) return 'var(--success)';
  if (score >= 45) return 'var(--accent)';
  return 'var(--warning)';
}

export default function SkillGapConceptSection() {
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
      id="skill-gap"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-white relative overflow-hidden"
      aria-labelledby="skill-gap-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* Left: Text */}
          <div>
            <span className="section-label mb-5 inline-flex reveal-child stagger-1">The Skill-Gap Concept</span>
            <h2
              id="skill-gap-heading"
              className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] mb-5 reveal-child stagger-2"
            >
              The gap is smaller
              <br />
              <span className="text-gradient-primary">than it looks.</span>
            </h2>
            <p className="text-base sm:text-lg text-muted leading-relaxed mb-6 reveal-child stagger-3">
              Most of what an AI-enabled role requires, you already have — programming fundamentals, system design, debugging, delivery discipline. The real gap is a focused set of AI-specific capabilities layered on top.
            </p>
            <p className="text-base sm:text-lg text-muted leading-relaxed reveal-child stagger-4">
              ITtoAI maps your existing skills against your target role and identifies exactly which capabilities to add — not everything you&apos;d need to learn from zero.
            </p>
          </div>

          {/* Right: Gap Visual */}
          <div className="reveal-child stagger-3">
            <div className="bg-card rounded-2xl border border-border shadow-card p-6 sm:p-8" role="region" aria-label="AI skill-gap concept example">
              <p className="label-text text-muted mb-5">EXAMPLE: SKILL GAP BREAKDOWN</p>
              <div className="space-y-4 mb-6">
                {gapSkills.map((skill, i) => (
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
              <div className="bg-secondary rounded-xl p-4">
                <p className="label-text text-muted mb-2">WHAT THIS MEANS</p>
                <p className="text-sm text-foreground leading-relaxed">
                  Strong foundations already in place. The focused gap to close sits in LLM engineering and applied AI systems.
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                Illustrative example. Actual gaps depend on your role-specific assessment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
