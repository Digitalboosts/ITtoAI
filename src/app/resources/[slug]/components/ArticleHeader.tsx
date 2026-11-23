import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { Resource, ResourceFormat } from '../../data';

function formatStyle(format: ResourceFormat) {
  if (format === 'Guide') {
    return { background: 'rgba(99,102,241,0.08)', color: 'var(--accent-secondary)', border: '1px solid rgba(99,102,241,0.2)' };
  }
  if (format === 'Report') {
    return { background: 'rgba(245,158,11,0.08)', color: 'var(--warning)', border: '1px solid rgba(245,158,11,0.2)' };
  }
  return { background: 'rgba(16,185,129,0.08)', color: 'var(--success)', border: '1px solid rgba(16,185,129,0.2)' };
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function ArticleHeader({ resource }: { resource: Resource }) {
  return (
    <section className="relative pt-10 pb-0 overflow-hidden bg-grid-overlay" aria-label="Article header">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-muted flex-wrap">
            <li>
              <a href="/resources" className="hover:text-foreground transition-colors font-600">Resources</a>
            </li>
            <li aria-hidden="true" className="text-muted-foreground">/</li>
            <li className="text-muted-foreground">{resource.category}</li>
          </ol>
        </nav>

        {/* Category + format */}
        <div className="flex items-center gap-3 mb-5">
          <span className="inline-flex items-center gap-1.5 text-2xs font-700 text-accent uppercase tracking-wider">
            <Icon name={resource.categoryIcon} size={14} aria-hidden="true" />
            {resource.category}
          </span>
          <span className="text-2xs font-700 px-2.5 py-1 rounded-full" style={formatStyle(resource.format)}>
            {resource.format}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-800 tracking-tight text-foreground leading-[1.1] mb-6 max-w-3xl">
          {resource.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted mb-10 pb-10 border-b border-border">
          <span className="inline-flex items-center gap-1.5 font-600 text-foreground">
            <Icon name="UserCircleIcon" size={16} className="text-muted-foreground" aria-hidden="true" />
            {resource.author}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="CalendarDaysIcon" size={15} className="text-muted-foreground" aria-hidden="true" />
            <time dateTime={resource.publishedDate}>{formatDate(resource.publishedDate)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="ClockIcon" size={15} className="text-muted-foreground" aria-hidden="true" />
            {resource.readTime}
          </span>
        </div>
      </div>

      {/* Hero visual */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div
          className="w-full h-56 sm:h-72 rounded-2xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #1B3A6B 0%, #2563EB 60%, #6366F1 100%)' }}
          role="img"
          aria-label={`Illustrative header graphic for ${resource.title}`}
        >
          <Icon name={resource.categoryIcon} size={64} className="text-white/90" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
