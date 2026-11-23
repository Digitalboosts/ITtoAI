'use client';
import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { JobListing } from '../../data';

function MetaItem({ icon, text }: { icon: string; text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-600 text-muted">
      <Icon name={icon} size={15} className="text-muted-foreground flex-shrink-0" aria-hidden="true" />
      {text}
    </span>
  );
}

interface JobDetailHeaderProps {
  job: JobListing;
  saved: boolean;
  onToggleSave: () => void;
}

export default function JobDetailHeader({ job, saved, onToggleSave }: JobDetailHeaderProps) {
  return (
    <>
      {/* Demonstration data notice */}
      <div style={{ background: 'rgba(245,158,11,0.08)', borderBottom: '1px solid rgba(245,158,11,0.2)' }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-center gap-2 text-center flex-wrap">
          <Icon name="InformationCircleIcon" size={16} className="flex-shrink-0" style={{ color: '#D97706' }} aria-hidden="true" />
          <p className="text-sm font-600" style={{ color: '#92400E' }}>
            Example listing with a fictional company — for demonstration only, not a live vacancy.
          </p>
        </div>
      </div>

      <section className="relative pt-10 pb-12 lg:pt-14 lg:pb-16 overflow-hidden bg-grid-overlay" aria-label="Job header">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
          aria-hidden="true"
        />
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
          <a href="/jobs" className="inline-flex items-center gap-1.5 text-sm font-600 text-muted hover:text-foreground transition-colors mb-6">
            <Icon name="ArrowLeftIcon" size={14} aria-hidden="true" />
            Back to AI Jobs
          </a>

          <div className="bg-card rounded-2xl border border-border shadow-card p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <div className="min-w-0">
                <span
                  className="inline-flex items-center text-2xs font-700 px-2.5 py-1 rounded-full mb-3"
                  style={{ background: 'rgba(37,99,235,0.08)', color: 'var(--accent)', border: '1px solid rgba(37,99,235,0.2)' }}
                >
                  {job.aiSpecialization}
                </span>
                <h1 className="text-2xl sm:text-3xl font-800 tracking-tight text-foreground leading-snug mb-1.5">
                  {job.title}
                </h1>
                <p className="text-base font-600 text-muted">{job.company}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2.5 mb-6 pb-6 border-b border-border">
              <MetaItem icon="MapPinIcon" text={job.location} />
              <MetaItem icon="HomeIcon" text={job.workMode} />
              <MetaItem icon="BriefcaseIcon" text={job.experience} />
              <MetaItem icon="ClockIcon" text={job.jobType} />
              <MetaItem icon="CurrencyDollarIcon" text={job.salary ?? 'Compensation not disclosed'} />
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="/contact" className="btn-primary">
                Apply Now
                <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={onToggleSave}
                aria-pressed={saved}
                className="btn-secondary"
              >
                <Icon name="BookmarkIcon" size={16} variant={saved ? 'solid' : 'outline'} className={saved ? 'text-accent' : undefined} aria-hidden="true" />
                {saved ? 'Saved' : 'Save Job'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
