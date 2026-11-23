import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { ProgramData } from '../../data';

export default function ProgramOutcomesSection({ program }: { program: ProgramData }) {
  return (
    <section className="py-16 lg:py-20 bg-secondary" aria-labelledby="outcomes-heading">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="outcomes-heading" className="sr-only">What you&apos;ll learn and who this is for</h2>

        <div className="grid sm:grid-cols-2 gap-8 mb-10">
          <div>
            <p className="label-text text-accent mb-3">Full Skill List</p>
            <div className="flex flex-wrap gap-1.5">
              {program.fullSkillList.map((skill) => (
                <span key={skill} className="skill-chip bg-card text-accent border-accent/20">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="label-text text-muted mb-3">Prerequisites</p>
            <p className="text-sm text-muted leading-relaxed">{program.prerequisites}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          <div className="bg-card rounded-xl border border-border p-6">
            <p className="text-sm font-700 text-foreground mb-4">By the end, you&apos;ll be able to</p>
            <ul className="space-y-2.5">
              {program.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-2.5">
                  <Icon name="CheckCircleIcon" size={15} className="text-success flex-shrink-0 mt-0.5" variant="solid" aria-hidden="true" />
                  <span className="text-sm text-muted leading-relaxed">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <p className="text-sm font-700 text-foreground mb-4">Who this program is for</p>
            <ul className="space-y-2.5">
              {program.whoItsFor.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Icon name="UserCircleIcon" size={15} className="text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm text-muted leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
