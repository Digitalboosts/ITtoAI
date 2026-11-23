import React from 'react';
import { ProgramPhase } from '../../data';

export default function CurriculumSection({ curriculum }: { curriculum: ProgramPhase[] }) {
  return (
    <section className="py-16 lg:py-20 bg-white" aria-labelledby="curriculum-heading">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
        <p className="label-text text-accent mb-3">Curriculum</p>
        <h2 id="curriculum-heading" className="text-xl sm:text-2xl font-800 tracking-tight text-foreground mb-10">
          How the program is structured
        </h2>

        <div className="relative">
          <div
            className="absolute left-5 top-2 bottom-2 w-px"
            style={{ background: 'linear-gradient(180deg, transparent, var(--border), var(--border), transparent)' }}
            aria-hidden="true"
          />
          <ol className="space-y-8">
            {curriculum.map((phase, i) => (
              <li key={phase.title} className="flex gap-5">
                <div
                  className="relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center bg-card flex-shrink-0"
                  style={{ borderColor: 'var(--accent)' }}
                  aria-hidden="true"
                >
                  <span className="text-sm font-800 text-accent">{i + 1}</span>
                </div>
                <div className="pt-1.5">
                  <h3 className="text-base font-700 text-foreground mb-1.5">{phase.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{phase.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
