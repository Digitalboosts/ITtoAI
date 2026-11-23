'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import { AssessmentResult, getSkillTier } from '../../lib/assessment-engine';

interface Props {
  result: AssessmentResult;
}

const insightGroups = [
  {
    id: 'strength',
    icon: 'StarIcon',
    title: 'Strengths',
    description: 'Already strong — a solid base to build the rest of the profile on.',
    color: 'var(--success)',
    bg: 'rgba(16,185,129,0.08)',
  },
  {
    id: 'developing',
    icon: 'ArrowTrendingUpIcon',
    title: 'Developing Skills',
    description: 'Real progress here — a bit more depth makes these production-ready.',
    color: 'var(--accent)',
    bg: 'rgba(37,99,235,0.08)',
  },
  {
    id: 'gap',
    icon: 'ExclamationTriangleIcon',
    title: 'Priority Skill Gaps',
    description: 'The areas with the biggest impact if closed next.',
    color: 'var(--warning)',
    bg: 'rgba(245,158,11,0.08)',
  },
] as const;

export default function SkillInsightsSection({ result }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section id="insights" ref={sectionRef} className="py-20 lg:py-28 bg-white" aria-labelledby="insights-heading">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label mb-5 inline-flex reveal-child stagger-1">Skill Insights</span>
          <h2 id="insights-heading" className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] mb-5 reveal-child stagger-2">
            What the numbers
            <br />
            <span className="text-gradient-primary">actually mean.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed reveal-child stagger-3">
            Every skill in the breakdown falls into one of three buckets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {insightGroups.map((group, i) => {
            const groupSkills = result.skills.filter((s) => getSkillTier(s.score) === group.id);
            return (
              <div key={group.id} className={`bg-card rounded-xl border border-border p-6 card-hover reveal-child stagger-${i + 2}`}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: group.bg }} aria-hidden="true">
                  <Icon name={group.icon} size={20} style={{ color: group.color }} />
                </div>
                <h3 className="text-base font-700 text-foreground mb-2.5">{group.title}</h3>
                <p className="text-sm text-muted leading-relaxed mb-5">{group.description}</p>
                <div className="flex flex-wrap gap-2">
                  {groupSkills.length === 0 && (
                    <span className="text-xs text-muted-foreground">None in this bucket right now.</span>
                  )}
                  {groupSkills.map((skill) => (
                    <span key={skill.name} className="skill-chip border" style={{ background: group.bg, color: group.color, borderColor: `${group.color}4d` }}>
                      {skill.name} · {skill.score}%
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
