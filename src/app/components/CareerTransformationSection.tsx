'use client';
import React, { useEffect, useRef } from 'react';
import CareerCard, { CareerCardData } from './CareerCard';
import Icon from '@/components/ui/AppIcon';

const careerPaths: CareerCardData[] = [
  { fromRole: 'Software Engineer', toRole: 'AI Engineer', skills: ['LLM Engineering', 'AI Agents', 'RAG'], icon: 'CodeBracketIcon' },
  { fromRole: 'Python Developer', toRole: 'GenAI Engineer', skills: ['LLMs', 'RAG', 'AI Evaluation'], icon: 'CommandLineIcon' },
  { fromRole: 'Java Developer', toRole: 'AI Application Engineer', skills: ['LLM APIs', 'FastAPI', 'AI Deployment'], icon: 'CpuChipIcon' },
  { fromRole: 'QA Engineer', toRole: 'AI QA Engineer', skills: ['AI Testing', 'AI Evaluation', 'LLM QA'], icon: 'CheckBadgeIcon' },
  { fromRole: 'DevOps Engineer', toRole: 'MLOps Engineer', skills: ['ML Pipelines', 'AI Infra', 'Model Monitoring'], icon: 'CloudIcon' },
  { fromRole: 'Data Analyst', toRole: 'AI / Data Analyst', skills: ['LLM Analytics', 'AI Automation', 'Data Pipelines'], icon: 'ChartBarIcon' },
  { fromRole: 'Business Analyst', toRole: 'AI Business Analyst', skills: ['AI Workflows', 'AI Automation', 'Prompt Design'], icon: 'BriefcaseIcon' },
  { fromRole: 'Product Manager', toRole: 'AI Product Manager', skills: ['AI Product Design', 'LLM UX', 'AI Metrics'], icon: 'RocketLaunchIcon' },
];

export default function CareerTransformationSection() {
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
      id="careers"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-background"
      aria-labelledby="careers-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label mb-5 inline-flex reveal-child stagger-1">Career Transformation</span>
          <h2
            id="careers-heading"
            className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] mb-5 reveal-child stagger-2"
          >
            Your next AI role may be{' '}
            <span className="text-gradient-primary">closer than you think.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed reveal-child stagger-3">
            Build on the experience you already have and add the AI capabilities your target role requires.
          </p>
        </div>

        {/* Cards Grid — 8 cards, 4 cols desktop, 2 cols tablet, 1 col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {/* Row 1: col-1 SoftwareEngineer, col-2 PythonDev, col-3 JavaDev, col-4 QAEngineer */}
          {/* Row 2: col-1 DevOps, col-2 DataAnalyst, col-3 BusinessAnalyst, col-4 ProductManager */}
          {careerPaths.map((card, i) => (
            <div key={card.fromRole} className={`reveal-child stagger-${Math.min(i + 1, 8)}`}>
              <CareerCard card={card} />
            </div>
          ))}
        </div>

        <div className="text-center reveal-child stagger-5">
          <a href="/career" className="btn-secondary">
            Find My AI Career Path
            <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}