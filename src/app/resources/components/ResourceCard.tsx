import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { Resource, ResourceFormat } from '../data';

function formatStyle(format: ResourceFormat) {
  if (format === 'Guide') {
    return { background: 'rgba(99,102,241,0.08)', color: 'var(--accent-secondary)', border: '1px solid rgba(99,102,241,0.2)' };
  }
  if (format === 'Report') {
    return { background: 'rgba(245,158,11,0.08)', color: 'var(--warning)', border: '1px solid rgba(245,158,11,0.2)' };
  }
  return { background: 'rgba(16,185,129,0.08)', color: 'var(--success)', border: '1px solid rgba(16,185,129,0.2)' };
}

export default function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <article className="relative bg-card rounded-xl border border-border p-6 card-hover flex flex-col h-full">
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="inline-flex items-center gap-1.5 text-2xs font-700 text-accent uppercase tracking-wider">
          <Icon name={resource.categoryIcon} size={13} aria-hidden="true" />
          {resource.category}
        </span>
        <span className="text-2xs font-700 px-2 py-0.5 rounded-full flex-shrink-0" style={formatStyle(resource.format)}>
          {resource.format}
        </span>
      </div>

      <h3 className="text-base font-700 text-foreground leading-snug mb-2.5">
        <a href={`/resources/${resource.id}`} className="after:absolute after:inset-0">
          {resource.title}
        </a>
      </h3>
      <p className="text-sm text-muted leading-relaxed mb-5 flex-1">{resource.excerpt}</p>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="text-xs font-600 text-muted-foreground">{resource.author} &middot; 2026</span>
        <span className="text-xs font-600 text-muted-foreground">{resource.readTime}</span>
      </div>
    </article>
  );
}
