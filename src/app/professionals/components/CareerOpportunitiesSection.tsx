'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const opportunityTypes = [
  { icon: 'SparklesIcon', title: 'AI Product Teams', description: 'Teams building AI-native features and products inside established companies.' },
  { icon: 'CpuChipIcon', title: 'Applied AI / ML Platform Teams', description: 'Teams building the infrastructure and tooling that AI systems run on.' },
  { icon: 'CodeBracketIcon', title: 'AI-Enabled Engineering Teams', description: 'Traditional engineering teams increasingly expected to build with AI capabilities.' },
  { icon: 'RocketLaunchIcon', title: 'GenAI Startups & Scale-ups', description: 'Smaller, fast-moving teams building generative AI products from the ground up.' },
  { icon: 'BuildingOfficeIcon', title: 'Enterprise AI Transformation', description: 'Programs helping large organisations adopt AI across existing technology teams.' },
  { icon: 'BriefcaseIcon', title: 'AI Consulting & Delivery', description: 'Consulting and delivery teams implementing AI solutions for client organisations.' },
];

export default function CareerOpportunitiesSection() {
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
      id="opportunities"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="opportunities-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label mb-5 inline-flex reveal-child stagger-1">Career Opportunities</span>
          <h2
            id="opportunities-heading"
            className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] mb-5 reveal-child stagger-2"
          >
            Where AI-ready
            <br />
            <span className="text-gradient-primary">professionals are needed.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed reveal-child stagger-3">
            A verified, AI-ready profile helps you get discovered across a growing range of AI-enabled technology roles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {opportunityTypes.map((item, i) => (
            <div
              key={item.title}
              className={`bg-card rounded-xl border border-border p-6 card-hover reveal-child stagger-${Math.min(i + 2, 8)}`}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: 'rgba(37,99,235,0.08)' }}
                aria-hidden="true"
              >
                <Icon name={item.icon} size={20} className="text-accent" />
              </div>
              <h3 className="text-base font-700 text-foreground mb-2.5">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground max-w-xl mx-auto reveal-child stagger-4">
          ITtoAI connects verified professionals with relevant AI opportunities. It does not guarantee employment, interviews, placement or salary outcomes.
        </p>
      </div>
    </section>
  );
}
