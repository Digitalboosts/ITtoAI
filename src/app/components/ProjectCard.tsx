import React from 'react';
import Icon from '@/components/ui/AppIcon';

export interface ProjectCardData {
  title: string;
  description: string;
  tags: string[];
  complexity: 'Intermediate' | 'Advanced';
  deliverables?: string[];
}

interface ProjectCardProps {
  project: ProjectCardData;
  className?: string;
}

const tagColors: Record<string, { bg: string; text: string; border: string }> = {
  RAG: { bg: 'rgba(37,99,235,0.08)', text: 'var(--accent)', border: 'rgba(37,99,235,0.2)' },
  LLMs: { bg: 'rgba(99,102,241,0.08)', text: 'var(--accent-secondary)', border: 'rgba(99,102,241,0.2)' },
  'Vector DB': { bg: 'rgba(139,92,246,0.08)', text: '#7C3AED', border: 'rgba(139,92,246,0.2)' },
  Python: { bg: 'rgba(16,185,129,0.08)', text: 'var(--success)', border: 'rgba(16,185,129,0.2)' },
  Agents: { bg: 'rgba(37,99,235,0.08)', text: 'var(--accent)', border: 'rgba(37,99,235,0.2)' },
  Tools: { bg: 'rgba(99,102,241,0.08)', text: 'var(--accent-secondary)', border: 'rgba(99,102,241,0.2)' },
  Evaluation: { bg: 'rgba(245,158,11,0.08)', text: 'var(--warning)', border: 'rgba(245,158,11,0.2)' },
  Orchestration: { bg: 'rgba(139,92,246,0.08)', text: '#7C3AED', border: 'rgba(139,92,246,0.2)' },
  'Tool Calling': { bg: 'rgba(37,99,235,0.08)', text: 'var(--accent)', border: 'rgba(37,99,235,0.2)' },
  'Multimodal AI': { bg: 'rgba(99,102,241,0.08)', text: 'var(--accent-secondary)', border: 'rgba(99,102,241,0.2)' },
  OCR: { bg: 'rgba(16,185,129,0.08)', text: 'var(--success)', border: 'rgba(16,185,129,0.2)' },
  FastAPI: { bg: 'rgba(16,185,129,0.08)', text: 'var(--success)', border: 'rgba(16,185,129,0.2)' },
  Docker: { bg: 'rgba(37,99,235,0.08)', text: 'var(--accent)', border: 'rgba(37,99,235,0.2)' },
  Cloud: { bg: 'rgba(245,158,11,0.08)', text: 'var(--warning)', border: 'rgba(245,158,11,0.2)' },
};

export default function ProjectCard({ project, className = '' }: ProjectCardProps) {
  return (
    <article
      className={`bg-card rounded-xl border border-border p-6 card-hover flex flex-col h-full ${className}`}
      aria-label={`Project: ${project.title}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-base font-700 text-foreground leading-snug">{project.title}</h3>
        <span
          className="flex-shrink-0 text-2xs font-700 px-2 py-1 rounded-full"
          style={{
            background: project.complexity === 'Advanced' ? 'rgba(99,102,241,0.08)' : 'rgba(16,185,129,0.08)',
            color: project.complexity === 'Advanced' ? 'var(--accent-secondary)' : 'var(--success)',
            border: `1px solid ${project.complexity === 'Advanced' ? 'rgba(99,102,241,0.2)' : 'rgba(16,185,129,0.2)'}`,
          }}
        >
          {project.complexity}
        </span>
      </div>
      <p className="text-sm text-muted leading-relaxed mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((tag) => {
          const colors = tagColors[tag] || { bg: 'rgba(100,116,139,0.08)', text: 'var(--muted)', border: 'rgba(100,116,139,0.2)' };
          return (
            <span
              key={tag}
              className="skill-chip"
              style={{ background: colors.bg, color: colors.text, borderColor: colors.border }}
            >
              {tag}
            </span>
          );
        })}
      </div>
      {project.deliverables && project.deliverables.length > 0 && (
        <div className="mt-auto pt-4 border-t border-border">
          <p className="text-2xs font-700 text-muted-foreground mb-2.5 uppercase tracking-wider">You&apos;ll walk away with</p>
          <ul className="space-y-1.5">
            {project.deliverables.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Icon name="CheckCircleIcon" size={13} className="text-accent flex-shrink-0" variant="solid" aria-hidden="true" />
                <span className="text-xs font-600 text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}