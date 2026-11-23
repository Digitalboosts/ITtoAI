'use client';
import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const teamReadiness = [
  { team: 'Engineering', score: 78, color: '#2563EB' },
  { team: 'Data', score: 64, color: '#6366F1' },
  { team: 'QA', score: 71, color: '#8B5CF6' },
  { team: 'DevOps', score: 82, color: '#7C3AED' },
];

const criticalGaps = ['RAG', 'AI Agents', 'AI Evaluation'];

export default function EnterpriseDashboard() {
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
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="enterprise"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-secondary"
      aria-labelledby="enterprise-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* Left: Text */}
          <div>
            <span className="section-label mb-5 inline-flex reveal-child stagger-1">Enterprise</span>
            <h2
              id="enterprise-heading"
              className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] mb-5 reveal-child stagger-2"
            >
              Your workforce doesn&apos;t need to be replaced.
              <br />
              <span className="text-gradient-primary">It needs to be upgraded.</span>
            </h2>
            <p className="text-base sm:text-lg text-muted leading-relaxed mb-8 reveal-child stagger-3">
              Help your existing technology workforce adapt to AI through skill assessment, role mapping, practical transformation and capability measurement.
            </p>
            <a href="/companies#enterprise" className="btn-primary reveal-child stagger-4">
              Transform Our Workforce
              <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
            </a>
          </div>

          {/* Right: Dashboard Preview */}
          <div className="reveal-child stagger-3">
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

            <div
              className="bg-card rounded-2xl border border-border shadow-card p-6 sm:p-8"
              role="region"
              aria-label="Enterprise workforce AI readiness dashboard"
            >
              <div className="flex items-center justify-between mb-6 pb-5 border-b border-border">
                <div>
                  <p className="label-text text-muted mb-1">WORKFORCE AI READINESS</p>
                  <p className="text-sm text-muted">Technology division overview</p>
                </div>
                <div
                  className="px-3 py-1.5 rounded-lg text-xs font-700"
                  style={{ background: 'rgba(37,99,235,0.08)', color: 'var(--accent)' }}
                >
                  Q3 2026
                </div>
              </div>

              <div className="space-y-5 mb-6">
                {teamReadiness?.map((team, i) => (
                  <div key={team?.team}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-700 text-foreground">{team?.team}</span>
                      <span className="text-sm font-700" style={{ color: team?.color }}>{team?.score}%</span>
                    </div>
                    <div className="progress-bar-bg" role="progressbar" aria-valuenow={team?.score} aria-valuemin={0} aria-valuemax={100} aria-label={`${team?.team} readiness`}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: animated ? `${team?.score}%` : '0%',
                          background: `linear-gradient(90deg, ${team?.color}, ${team?.color}99)`,
                          transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-secondary rounded-xl p-4">
                <p className="label-text text-muted mb-3">CRITICAL SKILL GAPS</p>
                <div className="flex flex-wrap gap-2">
                  {criticalGaps?.map((gap) => (
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