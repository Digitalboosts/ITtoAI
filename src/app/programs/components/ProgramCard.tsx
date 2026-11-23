import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { ProgramData } from '../data';

interface ProgramCardProps {
  program: ProgramData;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  return (
    <article className="bg-card rounded-2xl border border-border shadow-card card-hover p-6 sm:p-8 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap mb-6 pb-6 border-b border-border">
        <div className="flex items-start gap-4 min-w-0">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(37,99,235,0.08)' }}
            aria-hidden="true"
          >
            <Icon name={program.icon} size={22} className="text-accent" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-600 text-muted mb-1">{program.currentRole}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <Icon name="ArrowRightIcon" size={14} className="text-accent flex-shrink-0" aria-hidden="true" />
              <h3 className="text-lg sm:text-xl font-800 text-foreground leading-snug">{program.targetRole}</h3>
            </div>
          </div>
        </div>
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-700 flex-shrink-0"
          style={{ background: 'var(--secondary)', color: 'var(--foreground)' }}
        >
          <Icon name="ClockIcon" size={13} className="text-muted" aria-hidden="true" />
          {program.duration}
        </span>
      </div>

      {/* Body grid */}
      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="flex items-center gap-1.5 mb-2.5">
            <Icon name="SparklesIcon" size={13} className="text-muted-foreground" aria-hidden="true" />
            <p className="label-text text-muted">Skill Areas</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {program.skillAreas.map((skill) => (
              <span key={skill} className="skill-chip text-accent border-accent/20" style={{ background: 'rgba(37,99,235,0.06)' }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5 mb-2.5">
            <Icon name="FolderIcon" size={13} className="text-muted-foreground" aria-hidden="true" />
            <p className="label-text text-muted">Practical Projects</p>
          </div>
          <ul className="space-y-1.5">
            {program.practicalProjects.map((project) => (
              <li key={project} className="flex items-center gap-2">
                <Icon name="CheckCircleIcon" size={13} className="text-accent flex-shrink-0" variant="solid" aria-hidden="true" />
                <span className="text-sm text-foreground">{project}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-1.5 mb-2.5">
            <Icon name="ClipboardDocumentCheckIcon" size={13} className="text-muted-foreground" aria-hidden="true" />
            <p className="label-text text-muted">Assessment</p>
          </div>
          <p className="text-sm text-muted leading-relaxed">{program.assessment}</p>
        </div>

        <div>
          <div className="flex items-center gap-1.5 mb-2.5">
            <Icon name="CheckBadgeIcon" size={13} className="text-muted-foreground" aria-hidden="true" />
            <p className="label-text text-muted">Verification</p>
          </div>
          <p className="text-sm text-muted leading-relaxed">{program.verification}</p>
        </div>
      </div>

      {/* Career relevance */}
      <div className="rounded-xl p-4 mb-6" style={{ background: 'var(--secondary)' }}>
        <div className="flex items-center gap-1.5 mb-2">
          <Icon name="BriefcaseIcon" size={13} className="text-accent" aria-hidden="true" />
          <p className="label-text text-accent">Career Relevance</p>
        </div>
        <p className="text-sm text-foreground leading-relaxed">{program.careerRelevance}</p>
      </div>

      <a href={`/programs/${program.id}`} className="btn-primary w-full sm:w-auto justify-center mt-auto">
        Explore Program
        <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
      </a>
    </article>
  );
}
