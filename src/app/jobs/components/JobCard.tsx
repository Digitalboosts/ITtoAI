import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { JobListing } from '../data';

export interface JobWithMatch extends JobListing {
  matchedSkills: string[];
  missingSkills: string[];
}

function getMatchColor(pct: number): string {
  if (pct >= 80) return 'var(--success)';
  if (pct >= 50) return 'var(--accent)';
  return 'var(--warning)';
}

function MetaItem({ icon, text }: { icon: string; text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-600 text-muted">
      <Icon name={icon} size={13} className="text-muted-foreground flex-shrink-0" aria-hidden="true" />
      {text}
    </span>
  );
}

export default function JobCard({ job }: { job: JobWithMatch }) {
  const matchColor = getMatchColor(job.matchPercentage);

  return (
    <article className="bg-card rounded-2xl border border-border shadow-card card-hover p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <h3 className="text-lg font-800 text-foreground leading-snug">{job.title}</h3>
            <span
              className="text-2xs font-700 px-2.5 py-1 rounded-full flex-shrink-0"
              style={{ background: 'rgba(37,99,235,0.08)', color: 'var(--accent)', border: '1px solid rgba(37,99,235,0.2)' }}
            >
              {job.aiSpecialization}
            </span>
          </div>
          <p className="text-sm font-600 text-muted">{job.company}</p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <div
            className="flex items-center justify-center w-16 h-16 rounded-full border-4 flex-shrink-0"
            style={{ borderColor: `${matchColor}33`, background: `conic-gradient(${matchColor} 0%, ${matchColor} ${job.matchPercentage}%, #E2E8F0 ${job.matchPercentage}%)` }}
            aria-hidden="true"
          >
            <div className="w-11 h-11 rounded-full bg-card flex flex-col items-center justify-center">
              <span className="text-xs font-800 leading-none" style={{ color: matchColor }}>{job.matchPercentage}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-5 pb-5 border-b border-border">
        <MetaItem icon="MapPinIcon" text={job.location} />
        <MetaItem icon="BriefcaseIcon" text={job.experience} />
        <MetaItem icon="HomeIcon" text={job.workMode} />
        <MetaItem icon="ClockIcon" text={job.jobType} />
        {job.salary && <MetaItem icon="CurrencyDollarIcon" text={job.salary} />}
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-6">
        <div>
          <div className="flex items-center gap-1.5 mb-2.5">
            <Icon name="CheckCircleIcon" size={14} className="text-success" variant="solid" aria-hidden="true" />
            <p className="text-2xs font-700 text-success uppercase tracking-wider">Matched Skills</p>
          </div>
          {job.matchedSkills.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {job.matchedSkills.map((skill) => (
                <span key={skill} className="skill-chip text-success border-success/30" style={{ background: 'rgba(16,185,129,0.08)' }}>
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No overlap with current profile yet.</p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-1.5 mb-2.5">
            <Icon name="ExclamationTriangleIcon" size={14} className="text-warning" aria-hidden="true" />
            <p className="text-2xs font-700 text-warning uppercase tracking-wider">Missing Skills</p>
          </div>
          {job.missingSkills.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {job.missingSkills.map((skill) => (
                <span key={skill} className="skill-chip text-warning border-warning/30" style={{ background: 'rgba(245,158,11,0.08)' }}>
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">Fully covered by current profile.</p>
          )}
        </div>
      </div>

      <a href={`/jobs/${job.id}`} className="btn-primary w-full sm:w-auto justify-center">
        View Job
        <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
      </a>
    </article>
  );
}
