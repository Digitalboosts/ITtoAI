import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { ProgramData } from '../../data';

export default function ProgramDetailHeader({ program }: { program: ProgramData }) {
  return (
    <section className="relative pt-10 pb-14 overflow-hidden bg-grid-overlay" aria-label="Program header">
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
        aria-hidden="true"
      />
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-muted flex-wrap">
            <li>
              <a href="/programs" className="hover:text-foreground transition-colors font-600">Programs</a>
            </li>
            <li aria-hidden="true" className="text-muted-foreground">/</li>
            <li className="text-muted-foreground">{program.targetRole}</li>
          </ol>
        </nav>

        <div className="bg-card rounded-2xl border border-border shadow-card p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
            <div className="flex items-start gap-4 min-w-0">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(37,99,235,0.08)' }}
                aria-hidden="true"
              >
                <Icon name={program.icon} size={26} className="text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-600 text-muted mb-1">{program.currentRole}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <Icon name="ArrowRightIcon" size={16} className="text-accent flex-shrink-0" aria-hidden="true" />
                  <h1 className="text-2xl sm:text-3xl font-800 text-foreground leading-snug">{program.targetRole}</h1>
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

          <p className="text-sm sm:text-base text-muted leading-relaxed mb-7 pb-7 border-b border-border">{program.overview}</p>

          <div className="flex flex-wrap gap-3">
            <a href="/contact" className="btn-primary">
              Explore Program
              <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
            </a>
            <a href="/assessment#begin" className="btn-secondary">
              Check My AI Readiness
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
