'use client';
import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { AssessmentResult, getScoreColor, getTierColor } from '../../lib/assessment-engine';

interface Props {
  result: AssessmentResult;
  isExample: boolean;
}

export default function OverallReadinessSection({ result, isExample }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(false);
  const tierColor = getTierColor(result.tier);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-child').forEach((el, i) => {
              setTimeout(() => el.classList.add('is-visible'), i * 70);
            });
            setTimeout(() => setAnimated(true), 350);
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
    <section id="overview" ref={sectionRef} className="py-16 lg:py-20 bg-secondary" aria-labelledby="overview-heading">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="section-label mb-5 inline-flex reveal-child stagger-1">Overall Readiness</span>
          <h2 id="overview-heading" className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1]">
            {isExample ? (
              <>
                Here&apos;s where this
                <br />
                <span className="text-gradient-primary">example profile stands.</span>
              </>
            ) : (
              <>
                Here&apos;s where
                <br />
                <span className="text-gradient-primary">you stand.</span>
              </>
            )}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto bg-card rounded-2xl border border-border shadow-card p-6 sm:p-8 reveal-child stagger-2">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8 mb-8 pb-8 border-b border-border">
            {/* Score */}
            <div className="flex items-center gap-5">
              <div
                className="flex items-center justify-center w-28 h-28 rounded-full border-[6px] flex-shrink-0"
                style={{ borderColor: 'rgba(37,99,235,0.15)', background: `conic-gradient(var(--accent) 0%, var(--accent) ${animated ? result.overall : 0}%, #E2E8F0 ${animated ? result.overall : 0}%)`, transition: 'background 1.4s cubic-bezier(0.16,1,0.3,1)' }}
                aria-hidden="true"
              >
                <div className="w-20 h-20 rounded-full bg-card flex flex-col items-center justify-center">
                  <span className="text-3xl font-800 text-foreground leading-none">{result.overall}</span>
                  <span className="text-2xs font-600 text-muted">/ 100</span>
                </div>
              </div>
              <div>
                <p className="label-text text-muted mb-1.5">AI READINESS SCORE</p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-700" style={{ background: `${tierColor}1a`, color: tierColor }}>
                  {result.tier}
                </span>
              </div>
            </div>

            {/* Role -> Direction */}
            <div className="text-center sm:text-right">
              <p className="label-text text-muted mb-2">CURRENT ROLE → RECOMMENDED DIRECTION</p>
              <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end">
                <span className="text-sm font-600 text-foreground bg-secondary rounded-lg px-3 py-1.5 border border-border">
                  {result.currentRoleLabel}
                </span>
                <Icon name="ArrowRightIcon" size={14} className="text-accent" aria-hidden="true" />
                <span className="text-sm font-700 rounded-lg px-3 py-1.5 text-accent" style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)' }}>
                  {result.recommendedRole}
                </span>
              </div>
            </div>
          </div>

          {/* Full skill breakdown */}
          <p className="label-text text-muted mb-5">SKILL BREAKDOWN</p>
          <div className="space-y-4">
            {result.skills.map((skill, i) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-600 text-foreground">{skill.name}</span>
                  <span className="text-sm font-700" style={{ color: getScoreColor(skill.score) }}>{skill.score}%</span>
                </div>
                <div className="progress-bar-bg" role="progressbar" aria-valuenow={skill.score} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill.name} score`}>
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: animated ? `${skill.score}%` : '0%',
                      background: `linear-gradient(90deg, ${getScoreColor(skill.score)}, ${getScoreColor(skill.score)}cc)`,
                      transitionDelay: `${i * 80}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
            {isExample
              ? 'Illustrative example using randomized demo data. This is not a real assessment result.'
              : 'Based on your quick assessment answers. This score reflects assessed skill alignment with a target role — it does not guarantee employment, interviews or salary outcomes.'}
          </p>
        </div>
      </div>
    </section>
  );
}
