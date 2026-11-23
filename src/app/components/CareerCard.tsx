import React from 'react';
import Icon from '@/components/ui/AppIcon';

export interface CareerCardData {
  fromRole: string;
  toRole: string;
  skills: string[];
  icon: string;
}

interface CareerCardProps {
  card: CareerCardData;
  className?: string;
}

export default function CareerCard({ card, className = '' }: CareerCardProps) {
  return (
    <article
      className={`bg-card rounded-xl border border-border p-5 card-hover group cursor-default ${className}`}
      aria-label={`Career path: ${card.fromRole} to ${card.toRole}`}
    >
      <div className="flex items-start gap-3 mb-4">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(37,99,235,0.08)' }}
          aria-hidden="true"
        >
          <Icon name={card.icon as Parameters<typeof Icon>[0]['name']} size={18} className="text-accent" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-600 text-muted mb-0.5 truncate">{card.fromRole}</p>
          <div className="flex items-center gap-1.5">
            <Icon name="ArrowRightIcon" size={12} className="text-accent flex-shrink-0" aria-hidden="true" />
            <p className="text-sm font-700 text-foreground truncate">{card.toRole}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {card.skills.map((skill) => (
          <span
            key={skill}
            className="skill-chip text-accent border-accent/20"
            style={{ background: 'rgba(37,99,235,0.06)' }}
          >
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
}