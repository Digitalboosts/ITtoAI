'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const categories = [
  { icon: 'CodeBracketIcon', title: 'Programming', description: 'Core coding fluency across languages and paradigms.' },
  { icon: 'CpuChipIcon', title: 'AI Fundamentals', description: 'Core AI/ML concepts, terminology and how models work.' },
  { icon: 'CommandLineIcon', title: 'LLM Engineering', description: 'Prompting, context design and working with LLM APIs.' },
  { icon: 'CircleStackIcon', title: 'RAG', description: 'Retrieval-augmented generation and grounding AI in real data.' },
  { icon: 'Cog8ToothIcon', title: 'AI Agents', description: 'Tool use, orchestration and autonomous task execution.' },
  { icon: 'ClipboardDocumentCheckIcon', title: 'AI Evaluation', description: 'Testing, benchmarking and measuring AI system quality.' },
  { icon: 'ArrowPathIcon', title: 'AI Workflow Integration', description: 'Embedding AI into existing products and processes.' },
  { icon: 'CloudIcon', title: 'Cloud & Deployment', description: 'Shipping and operating AI systems in production.' },
  { icon: 'Square3Stack3DIcon', title: 'AI System Design', description: 'Architecting reliable, scalable AI-powered systems.' },
  { icon: 'ShieldCheckIcon', title: 'Responsible AI', description: 'Safety, bias, privacy and ethical AI practices.' },
];

export default function AssessmentCategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-child').forEach((el, i) => {
              setTimeout(() => el.classList.add('is-visible'), i * 50);
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
    <section
      id="categories"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-secondary"
      aria-labelledby="categories-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label mb-5 inline-flex reveal-child stagger-1">What Gets Assessed</span>
          <h2
            id="categories-heading"
            className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] mb-5 reveal-child stagger-2"
          >
            Ten categories.
            <br />
            <span className="text-gradient-primary">One complete picture.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed reveal-child stagger-3">
            Each section evaluates a distinct capability — from core programming through to responsible AI practice.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((category, i) => (
            <div
              key={category.title}
              className={`bg-card rounded-xl border border-border p-5 card-hover reveal-child stagger-${Math.min(i + 2, 8)}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(37,99,235,0.08)' }}
                  aria-hidden="true"
                >
                  <Icon name={category.icon} size={17} className="text-accent" />
                </div>
                <span className="text-2xs font-700 text-muted-foreground">{`0${i + 1}`.slice(-2)}/10</span>
              </div>
              <h3 className="text-sm font-700 text-foreground mb-1.5">{category.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
