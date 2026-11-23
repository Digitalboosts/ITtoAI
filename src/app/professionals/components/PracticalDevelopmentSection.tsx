'use client';
import React, { useEffect, useRef } from 'react';
import ProjectCard, { ProjectCardData } from '@/app/components/ProjectCard';
import Icon from '@/components/ui/AppIcon';

const projects: ProjectCardData[] = [
  {
    title: 'Enterprise RAG Assistant',
    description: 'Build a production-grade Retrieval-Augmented Generation system for enterprise document search and Q&A.',
    tags: ['RAG', 'LLMs', 'Vector DB', 'Python'],
    complexity: 'Advanced',
  },
  {
    title: 'AI Research Agent',
    description: 'Design and implement an autonomous AI agent that uses tools to research, synthesise and report on technical topics.',
    tags: ['Agents', 'LLMs', 'Tools', 'Evaluation'],
    complexity: 'Advanced',
  },
  {
    title: 'Production AI API',
    description: 'Deploy a scalable, monitored AI inference API with proper error handling, rate limiting and observability.',
    tags: ['FastAPI', 'Docker', 'Cloud'],
    complexity: 'Intermediate',
  },
];

export default function PracticalDevelopmentSection() {
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
      id="practical-development"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-secondary"
      aria-labelledby="practical-development-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label mb-5 inline-flex reveal-child stagger-1">Practical Development</span>
          <h2
            id="practical-development-heading"
            className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] mb-5 reveal-child stagger-2"
          >
            Skills are proven by
            <br />
            <span className="text-gradient-primary">building, not by watching.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed reveal-child stagger-3">
            The AI layer is developed through real, applied projects — the same way your existing IT skills were built.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {projects.map((project, i) => (
            <div key={project.title} className={`reveal-child stagger-${i + 2}`}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <div className="text-center reveal-child stagger-5">
          <a href="/programs" className="btn-secondary">
            See All Practical Projects
            <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
