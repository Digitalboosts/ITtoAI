'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import { AssessmentResult } from '../../lib/assessment-engine';

interface Props {
  result: AssessmentResult;
  isExample: boolean;
}

const LEARNING_BY_CATEGORY: Record<string, { title: string; description: string; project: string; projectDescription: string; tag?: string }> = {
  Programming: {
    title: 'Modern Python / Backend Fundamentals',
    description: 'Sharpen the core coding fluency everything else in AI engineering builds on.',
    project: 'Refactor & Test a Small Service',
    projectDescription: 'Take an existing script and rebuild it with clean structure, tests and error handling.',
  },
  'AI Fundamentals': {
    title: 'AI & ML Core Concepts',
    description: 'How models are trained, what they can and can’t do, and the vocabulary used across the field.',
    project: 'Model Behavior Notebook',
    projectDescription: 'Experiment with a pretrained model and document what changes its outputs and why.',
  },
  'LLM Engineering': {
    title: 'Prompting & LLM APIs',
    description: 'Structured prompting, context design and working reliably with LLM provider APIs.',
    project: 'LLM-Powered Utility',
    projectDescription: 'Build a small tool that uses an LLM API to solve one real, specific task well.',
  },
  RAG: {
    title: 'Retrieval-Augmented Generation',
    description: 'Grounding LLM answers in real documents instead of relying on the model’s memory alone.',
    project: 'Document Q&A Assistant',
    projectDescription: 'A RAG app that answers questions using a private set of documents you provide.',
    tag: 'Advanced',
  },
  'AI Agents': {
    title: 'AI Agents & Tool Orchestration',
    description: 'Learn how AI agents plan, call tools and complete multi-step tasks autonomously.',
    project: 'AI Research Agent',
    projectDescription: 'An autonomous AI agent that uses tools to research, synthesise and report on technical topics.',
    tag: 'Advanced',
  },
  'AI Evaluation': {
    title: 'Testing & Evaluating AI Systems',
    description: 'Benchmarking, regression testing and measuring quality for non-deterministic systems.',
    project: 'Evaluation Harness',
    projectDescription: 'Build a small test suite that scores an AI feature’s outputs against expected answers.',
  },
  'AI Workflow Integration': {
    title: 'Embedding AI Into Real Products',
    description: 'Scoping a workflow, integrating AI into it, and measuring impact before expanding further.',
    project: 'AI-Assisted Feature',
    projectDescription: 'Add one well-scoped AI-powered feature to an existing app or workflow.',
  },
  'Cloud & Deployment': {
    title: 'Shipping AI Systems to Production',
    description: 'Deploying, monitoring and operating AI-powered services reliably at real traffic.',
    project: 'Deploy & Monitor a Model Endpoint',
    projectDescription: 'Ship an AI service to the cloud with basic monitoring and cost awareness.',
  },
  'AI System Design': {
    title: 'Architecting AI-Powered Systems',
    description: 'Designing reliable, scalable systems that combine LLMs with real data and business logic.',
    project: 'End-to-End AI System Design Doc',
    projectDescription: 'Write and diagram a system design for an AI feature, including failure handling.',
  },
  'Responsible AI': {
    title: 'Responsible & Safe AI Practices',
    description: 'Fairness, privacy, transparency and misuse-prevention across the AI development lifecycle.',
    project: 'AI Risk Review',
    projectDescription: 'Audit an AI feature for bias, privacy and misuse risks and document mitigations.',
  },
};

export default function NextStepsSection({ result, isExample }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const topGap = result.gaps[0];
  const learning = LEARNING_BY_CATEGORY[topGap?.name] ?? LEARNING_BY_CATEGORY['AI Fundamentals'];

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

  const nextStepCards = [
    {
      icon: 'AcademicCapIcon',
      label: 'Recommended Learning',
      title: learning.title,
      description: learning.description,
    },
    {
      icon: 'CodeBracketIcon',
      label: 'Recommended Project',
      title: learning.project,
      description: learning.projectDescription,
      tag: learning.tag,
    },
    {
      icon: 'ClipboardDocumentCheckIcon',
      label: 'Recommended Assessment',
      title: topGap?.name ?? 'AI Fundamentals',
      description: 'Retake the quick assessment later to track progress on this gap.',
      href: '/assessment#begin',
    },
  ];

  return (
    <section id="next-steps" ref={sectionRef} className="py-20 lg:py-28 bg-secondary" aria-labelledby="next-steps-heading">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="section-label mb-5 inline-flex reveal-child stagger-1">Recommended Next Steps</span>
          <h2 id="next-steps-heading" className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] mb-5 reveal-child stagger-2">
            Your next
            <br />
            <span className="text-gradient-primary">priority.</span>
          </h2>
        </div>

        {/* Priority callout */}
        {topGap && (
          <div className="max-w-3xl mx-auto mb-10 reveal-child stagger-3">
            <div className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-5" style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.25)' }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(245,158,11,0.15)' }} aria-hidden="true">
                <Icon name="FlagIcon" size={24} className="text-warning" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-2xs font-700 text-warning uppercase tracking-wider mb-1.5">Your Next Priority</p>
                <h3 className="text-2xl font-800 text-foreground mb-2">
                  {topGap.name} <span className="text-base font-600 text-muted">({topGap.score}% → {topGap.target}%)</span>
                </h3>
                <p className="text-sm sm:text-base text-muted leading-relaxed">
                  Closing this gap has the biggest impact on reaching {result.recommendedRole} readiness — it&apos;s the most foundational capability still missing.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Learning / Project / Assessment */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto mb-14">
          {nextStepCards.map((card, i) => (
            <div key={card.label} className={`bg-card rounded-xl border border-border p-6 card-hover flex flex-col h-full reveal-child stagger-${i + 4}`}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(37,99,235,0.08)' }} aria-hidden="true">
                <Icon name={card.icon} size={20} className="text-accent" />
              </div>
              <p className="text-2xs font-700 text-accent uppercase tracking-wider mb-2">{card.label}</p>
              <div className="flex items-center gap-2 mb-2.5">
                <h3 className="text-base font-700 text-foreground">{card.title}</h3>
                {card.tag && (
                  <span className="text-2xs font-700 px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: 'rgba(99,102,241,0.08)', color: 'var(--accent-secondary)', border: '1px solid rgba(99,102,241,0.2)' }}>
                    {card.tag}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted leading-relaxed flex-1">{card.description}</p>
              {card.href && (
                <a href={card.href} className="inline-flex items-center gap-1.5 text-sm font-700 text-accent mt-4">
                  Go to AI Assessment
                  <Icon name="ArrowRightIcon" size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="max-w-2xl mx-auto text-center reveal-child stagger-5">
          <div className="bg-card rounded-2xl border border-border shadow-card p-8 sm:p-10">
            <h3 className="text-xl font-800 text-foreground mb-3">
              {isExample ? 'Ready to build your own?' : 'Ready to build on this?'}
            </h3>
            <p className="text-sm sm:text-base text-muted leading-relaxed mb-7 max-w-md mx-auto">
              {isExample
                ? 'Turn this example into your own — take the real assessment and start building an evidence-based ITtoAI profile.'
                : 'Map your career path and start building an evidence-based ITtoAI profile.'}
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-5">
              <a href="/career" className="btn-primary">
                Build My Career Roadmap
                <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
              </a>
              <a href="/assessment#begin" className="btn-secondary">
                {isExample ? 'Take My Real Assessment' : 'Retake Assessment'}
              </a>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {isExample
                ? 'This example does not guarantee employment, interviews or salary outcomes. Your own results will depend on your actual assessment responses.'
                : 'This result does not guarantee employment, interviews or salary outcomes.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
