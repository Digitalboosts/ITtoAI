'use client';
import React, { useEffect, useRef } from 'react';
import FeatureCard, { FeatureCardData } from '@/app/components/FeatureCard';
import Icon from '@/components/ui/AppIcon';

const resumeKeywords = ['AI / ML', 'Machine Learning', 'ChatGPT Prompting', 'Generative AI', 'Data Science'];

const painPoints: FeatureCardData[] = [
  {
    icon: 'DocumentMagnifyingGlassIcon',
    title: 'Keyword Inflation',
    description: 'Resumes can list "AI", "LLM" or "Machine Learning" without any evidence of hands-on capability behind them.',
  },
  {
    icon: 'QuestionMarkCircleIcon',
    title: 'No Proof of Work',
    description: 'A line item on a resume doesn’t show whether a candidate can actually build, evaluate or ship an AI system.',
  },
  {
    icon: 'ScaleIcon',
    title: 'Inconsistent Signals',
    description: 'Certificates and course completions vary widely in rigor, making it hard to compare candidates fairly.',
  },
];

export default function ResumeProblemSection() {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="resume-problem"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-secondary"
      aria-labelledby="resume-problem-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label mb-5 inline-flex reveal-child stagger-1">The Problem</span>
          <h2
            id="resume-problem-heading"
            className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] mb-5 reveal-child stagger-2"
          >
            Resumes don&apos;t prove
            <br />
            <span className="text-gradient-primary">practical AI capability.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed reveal-child stagger-3">
            Traditional resumes can contain AI keywords without demonstrating that a candidate can actually apply them.
          </p>
        </div>

        {/* Mock resume visual */}
        <div className="max-w-2xl mx-auto mb-10 reveal-child stagger-4">
          <div className="bg-card rounded-xl border border-dashed border-border p-6 sm:p-7">
            <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-border">
              <Icon name="DocumentTextIcon" size={16} className="text-muted-foreground" aria-hidden="true" />
              <span className="text-xs font-600 text-muted-foreground">Example resume — skills section</span>
            </div>
            <p className="label-text text-muted mb-3">SKILLS</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {resumeKeywords.map((skill) => (
                <span key={skill} className="skill-chip bg-secondary text-muted border-border">
                  {skill}
                </span>
              ))}
            </div>
            <div
              className="flex items-start gap-2.5 rounded-lg p-3.5"
              style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}
            >
              <Icon name="ExclamationTriangleIcon" size={16} className="text-warning flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-foreground leading-relaxed">
                Keywords alone don&apos;t confirm hands-on capability, production experience, or the ability to ship real AI systems.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {painPoints.map((point, i) => (
            <div key={point.title} className={`reveal-child stagger-${Math.min(i + 5, 8)}`}>
              <FeatureCard feature={point} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
