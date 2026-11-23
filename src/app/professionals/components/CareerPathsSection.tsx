'use client';
import React, { useEffect, useRef } from 'react';
import CareerCard, { CareerCardData } from '@/app/components/CareerCard';

const careerPaths: CareerCardData[] = [
  { fromRole: 'Software Engineer', toRole: 'AI Engineer', skills: ['LLM Engineering', 'AI Agents', 'RAG'], icon: 'CodeBracketIcon' },
  { fromRole: 'Python Developer', toRole: 'GenAI Engineer', skills: ['LLMs', 'RAG', 'AI Evaluation'], icon: 'CommandLineIcon' },
  { fromRole: 'Java Developer', toRole: 'AI Application Engineer', skills: ['LLM APIs', 'FastAPI', 'AI Deployment'], icon: 'CpuChipIcon' },
  { fromRole: 'QA Engineer', toRole: 'AI QA Engineer', skills: ['AI Testing', 'AI Evaluation', 'LLM QA'], icon: 'CheckBadgeIcon' },
  { fromRole: 'DevOps Engineer', toRole: 'MLOps Engineer', skills: ['ML Pipelines', 'AI Infra', 'Model Monitoring'], icon: 'CloudIcon' },
  { fromRole: 'Data Analyst', toRole: 'AI/Data Analyst', skills: ['LLM Analytics', 'AI Automation', 'Data Pipelines'], icon: 'ChartBarIcon' },
  { fromRole: 'Business Analyst', toRole: 'AI Business Analyst', skills: ['AI Workflows', 'AI Automation', 'Prompt Design'], icon: 'BriefcaseIcon' },
  { fromRole: 'Product Manager', toRole: 'AI Product Manager', skills: ['AI Product Design', 'LLM UX', 'AI Metrics'], icon: 'RocketLaunchIcon' },
];

export default function CareerPathsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-child').forEach((el, i) => {
              setTimeout(() => el.classList.add('is-visible'), i * 60);
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
    <section
      id="paths"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-background"
      aria-labelledby="paths-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label mb-5 inline-flex reveal-child stagger-1">Career Transition Paths</span>
          <h2
            id="paths-heading"
            className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] mb-5 reveal-child stagger-2"
          >
            Your next AI role may be{' '}
            <span className="text-gradient-primary">closer than you think.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed reveal-child stagger-3">
            Explore how existing technology roles map onto AI-enabled roles, and the example skills that bridge the gap.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {careerPaths.map((card, i) => (
            <div key={card.fromRole} className={`reveal-child stagger-${Math.min(i + 1, 8)}`}>
              <CareerCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
