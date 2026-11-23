'use client';
import React, { useEffect, useRef } from 'react';

const existingSkills = ['Python', 'Java', 'APIs', 'Databases', 'Cloud', 'Docker', 'System Design'];
const aiSkillsBase = ['Python', 'APIs', 'Cloud', 'System Design'];
const aiSkillsNew = ['LLM Engineering', 'RAG', 'AI Agents', 'AI Evaluation', 'AI Automation', 'AI Deployment'];

export default function TheShiftSection() {
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
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="shift"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-white relative overflow-hidden"
      aria-labelledby="shift-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label mb-5 inline-flex reveal-child stagger-1">
            The Shift
          </span>
          <h2
            id="shift-heading"
            className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] mb-5 reveal-child stagger-2"
          >
            AI isn&apos;t replacing your experience.
            <br />
            <span className="text-gradient-primary">It&apos;s changing the skills around it.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed reveal-child stagger-3">
            Your existing software engineering, data, cloud or IT experience still matters. The opportunity is to add the AI capabilities that modern technology roles increasingly require.
          </p>
        </div>

        {/* Comparison Visual */}
        <div className="relative flex flex-col md:flex-row items-stretch gap-0 max-w-5xl mx-auto reveal-child stagger-4">

          {/* Left: Existing IT */}
          <div className="flex-1 bg-secondary rounded-xl md:rounded-r-none border border-border p-6 sm:p-8">
            <p className="label-text text-muted mb-5">Existing IT Experience</p>
            <div className="flex flex-wrap gap-2">
              {existingSkills?.map((skill) => (
                <span
                  key={skill}
                  className="skill-chip bg-white text-foreground border-border"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Center: + AI Bridge */}
          <div className="flex items-center justify-center z-10 md:-mx-4 my-4 md:my-0">
            <div
              className="flex items-center justify-center w-14 h-14 rounded-full shadow-card border border-accent/20 font-800 text-accent text-sm"
              style={{ background: 'linear-gradient(135deg, #EFF6FF, #EEF2FF)', boxShadow: '0 0 0 4px white' }}
              aria-label="Plus AI"
            >
              + AI
            </div>
          </div>

          {/* Right: AI-Ready Stack */}
          <div
            className="flex-1 rounded-xl md:rounded-l-none border border-accent/25 p-6 sm:p-8"
            style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #EEF2FF 100%)' }}
          >
            <p className="label-text text-accent mb-5">AI-Ready Skill Stack</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {aiSkillsBase?.map((skill) => (
                <span
                  key={skill}
                  className="skill-chip bg-white/70 text-foreground border-accent/20"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="w-full h-px bg-accent/15 my-3" aria-hidden="true" />
            <div className="flex flex-wrap gap-2">
              {aiSkillsNew?.map((skill) => (
                <span
                  key={skill}
                  className="skill-chip text-accent border-accent/30"
                  style={{ background: 'rgba(37,99,235,0.08)' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Statement */}
        <div className="text-center mt-14 reveal-child stagger-5">
          <p className="text-xl sm:text-2xl font-700 text-foreground">
            Don&apos;t restart your career.{' '}
            <span className="text-gradient-primary">Upgrade it.</span>
          </p>
        </div>
      </div>
    </section>
  );
}