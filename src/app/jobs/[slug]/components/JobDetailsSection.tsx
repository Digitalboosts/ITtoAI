'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import { JobListing } from '../../data';

export default function JobDetailsSection({ job }: { job: JobListing }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-child').forEach((el, i) => {
              setTimeout(() => el.classList.add('is-visible'), i * 70);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-20 bg-white" aria-labelledby="job-details-heading">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="job-details-heading" className="sr-only">Job details</h2>

        <div className="space-y-10">
          {/* Overview */}
          <div className="reveal-child stagger-1">
            <p className="label-text text-accent mb-3">Overview</p>
            <p className="text-base text-foreground leading-relaxed">{job.overview}</p>
          </div>

          {/* Responsibilities */}
          <div className="reveal-child stagger-2">
            <p className="label-text text-accent mb-3">Responsibilities</p>
            <ul className="space-y-2.5">
              {job.responsibilities.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Icon name="CheckCircleIcon" size={16} className="text-accent flex-shrink-0 mt-0.5" variant="solid" aria-hidden="true" />
                  <span className="text-sm sm:text-base text-muted leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Required / Preferred skills */}
          <div className="grid sm:grid-cols-2 gap-8 reveal-child stagger-3">
            <div>
              <p className="label-text text-accent mb-3">Required Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {job.requiredSkills.map((skill) => (
                  <span key={skill} className="skill-chip text-accent border-accent/20" style={{ background: 'rgba(37,99,235,0.06)' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="label-text text-muted mb-3">Preferred Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {job.preferredSkills.map((skill) => (
                  <span key={skill} className="skill-chip bg-secondary text-muted border-border">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* AI technology stack */}
          <div className="rounded-xl p-5 sm:p-6 reveal-child stagger-4" style={{ background: 'var(--secondary)' }}>
            <div className="flex items-center gap-1.5 mb-3">
              <Icon name="CpuChipIcon" size={15} className="text-accent" aria-hidden="true" />
              <p className="label-text text-foreground">AI Technology Stack</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {job.aiTechStack.map((tech) => (
                <span key={tech} className="skill-chip bg-card text-foreground border-border">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
