'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import { JobListing } from '../../data';

interface InterviewProcessSectionProps {
  job: JobListing;
  saved: boolean;
  onToggleSave: () => void;
}

export default function InterviewProcessSection({ job, saved, onToggleSave }: InterviewProcessSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-child').forEach((el, i) => {
              setTimeout(() => el.classList.add('is-visible'), i * 80);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-20 bg-secondary" aria-labelledby="interview-process-heading">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 reveal-child stagger-1">
          <p className="label-text text-accent mb-3">Interview Process</p>
          <h2 id="interview-process-heading" className="text-xl sm:text-2xl font-800 tracking-tight text-foreground">
            What to expect
          </h2>
        </div>

        <div className="relative reveal-child stagger-2">
          <div
            className="hidden md:block absolute top-6 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, var(--border), var(--border), transparent)' }}
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
            {job.interviewProcess.map((step, i) => (
              <div key={step.stage} className="flex md:flex-col gap-4 md:gap-0 md:text-center">
                <div
                  className="relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center bg-card flex-shrink-0 md:mx-auto md:mb-4"
                  style={{ borderColor: 'var(--accent)' }}
                  aria-hidden="true"
                >
                  <span className="text-sm font-800 text-accent">{i + 1}</span>
                </div>
                <div>
                  <h3 className="text-sm font-700 text-foreground mb-1.5">{step.stage}</h3>
                  <p className="text-xs text-muted leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing CTAs */}
        <div className="max-w-lg mx-auto text-center mt-16 reveal-child stagger-3">
          <div className="bg-card rounded-2xl border border-border shadow-card p-8">
            <h3 className="text-lg font-800 text-foreground mb-2">Ready to take the next step?</h3>
            <p className="text-sm text-muted leading-relaxed mb-6">
              Applying connects you with the ITtoAI team — your verified profile and assessed skills go with you.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-5">
              <a href="/contact" className="btn-primary">
                Apply Now
                <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
              </a>
              <button type="button" onClick={onToggleSave} aria-pressed={saved} className="btn-secondary">
                <Icon name="BookmarkIcon" size={16} variant={saved ? 'solid' : 'outline'} className={saved ? 'text-accent' : undefined} aria-hidden="true" />
                {saved ? 'Saved' : 'Save Job'}
              </button>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This is an example listing. Match scores and outcomes are illustrative and do not guarantee employment or hiring.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
