'use client';
import React, { useEffect, useRef } from 'react';
import ProjectCard, { ProjectCardData } from '@/app/components/ProjectCard';
import Icon from '@/components/ui/AppIcon';

const projects: ProjectCardData[] = [
  {
    title: 'Enterprise RAG Assistant',
    description: 'A production-grade Retrieval-Augmented Generation system for enterprise document search and Q&A.',
    tags: ['RAG', 'LLMs', 'Vector DB', 'Python'],
    complexity: 'Advanced',
  },
  {
    title: 'AI Research Agent',
    description: 'An autonomous AI agent that uses tools to research, synthesise and report on technical topics.',
    tags: ['Agents', 'LLMs', 'Tools', 'Evaluation'],
    complexity: 'Advanced',
  },
  {
    title: 'Production AI API',
    description: 'A scalable, monitored AI inference API with proper error handling, rate limiting and observability.',
    tags: ['FastAPI', 'Docker', 'Cloud'],
    complexity: 'Intermediate',
  },
];

const evidenceIncludes = [
  { icon: 'CodeBracketIcon', label: 'Working code repository' },
  { icon: 'DocumentTextIcon', label: 'Technical write-up' },
  { icon: 'UserGroupIcon', label: 'Reviewer evaluation notes' },
];

export default function ProjectEvidenceSection() {
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
    <section
      id="project-evidence"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-secondary"
      aria-labelledby="project-evidence-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="section-label mb-5 inline-flex reveal-child stagger-1">Candidate Project Evidence</span>
          <h2
            id="project-evidence-heading"
            className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] mb-5 reveal-child stagger-2"
          >
            Judge candidates by
            <br />
            <span className="text-gradient-primary">what they&apos;ve actually built.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed reveal-child stagger-3">
            Each candidate profile links to real, applied AI projects — reviewed for practical capability, not just completion.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-10 reveal-child stagger-3">
          {evidenceIncludes.map((item) => (
            <div key={item.label} className="flex items-center gap-2 bg-card border border-border rounded-lg px-3.5 py-2">
              <Icon name={item.icon} size={15} className="text-accent flex-shrink-0" aria-hidden="true" />
              <span className="text-xs font-600 text-foreground">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 justify-center mb-6 reveal-child stagger-3">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-700 border"
            style={{ background: 'rgba(245,158,11,0.08)', color: '#D97706', borderColor: 'rgba(245,158,11,0.2)' }}
            role="note"
          >
            <Icon name="InformationCircleIcon" size={12} aria-hidden="true" />
            Example candidate projects — demo data
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <div key={project.title} className={`reveal-child stagger-${i + 4}`}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
