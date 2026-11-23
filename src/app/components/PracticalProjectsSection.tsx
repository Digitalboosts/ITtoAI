'use client';
import React, { useEffect, useRef } from 'react';
import ProjectCard, { ProjectCardData } from './ProjectCard';
import Icon from '@/components/ui/AppIcon';

const projects: ProjectCardData[] = [
  {
    title: 'Enterprise RAG Assistant',
    description: 'Build a production-grade Retrieval-Augmented Generation system for enterprise document search and Q&A.',
    tags: ['RAG', 'LLMs', 'Vector DB', 'Python'],
    complexity: 'Advanced',
    deliverables: ['Architecture doc', 'GitHub repo', 'Deployment', 'Evaluation report'],
  },
  {
    title: 'AI Research Agent',
    description: 'Design and implement an autonomous AI agent that uses tools to research, synthesise and report on technical topics.',
    tags: ['Agents', 'LLMs', 'Tools', 'Evaluation'],
    complexity: 'Advanced',
    deliverables: ['Architecture doc', 'GitHub repo', 'Deployment', 'Evaluation report'],
  },
  {
    title: 'Multi-Agent Workflow',
    description: 'Architect a multi-agent system where specialised agents collaborate through orchestrated tool calling.',
    tags: ['Agents', 'Tool Calling', 'Orchestration'],
    complexity: 'Advanced',
    deliverables: ['Architecture doc', 'GitHub repo', 'Deployment', 'Evaluation report'],
  },
  {
    title: 'AI Document Intelligence',
    description: 'Extract, classify and reason over structured and unstructured documents using multimodal AI capabilities.',
    tags: ['Multimodal AI', 'OCR', 'LLMs'],
    complexity: 'Intermediate',
    deliverables: ['Architecture doc', 'GitHub repo', 'Deployment', 'Evaluation report'],
  },
  {
    title: 'Production AI API',
    description: 'Deploy a scalable, monitored AI inference API with proper error handling, rate limiting and observability.',
    tags: ['FastAPI', 'Docker', 'Cloud'],
    complexity: 'Intermediate',
    deliverables: ['Architecture doc', 'GitHub repo', 'Deployment', 'Evaluation report'],
  },
];

export default function PracticalProjectsSection() {
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
      id="projects"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-secondary"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label mb-5 inline-flex reveal-child stagger-1">Practical Projects</span>
          <h2
            id="projects-heading"
            className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] mb-5 reveal-child stagger-2"
          >
            You won&apos;t graduate with another AI certificate.
            <br />
            <span className="text-gradient-primary">You&apos;ll graduate with proof you can build AI.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed reveal-child stagger-3">
            Real AI capability comes from building, testing and deploying real systems.
          </p>
        </div>

        {/* Projects Grid — 5 cards: row1 = 3 cols, row2 = 2 cols centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {/* Row 1: EnterpriseRAG, AIResearchAgent, MultiAgentWorkflow */}
          {/* Row 2: AIDocumentIntelligence (col-start-1), ProductionAIAPI (col-start-2) */}
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`reveal-child stagger-${i + 2} ${i === 3 ? 'lg:col-start-1' : ''} ${i === 4 ? 'lg:col-start-2' : ''}`}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <div className="text-center reveal-child stagger-5">
          <a href="/programs" className="btn-primary">
            Explore AI Programs
            <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}