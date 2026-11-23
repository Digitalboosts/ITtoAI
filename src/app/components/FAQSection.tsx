'use client';
import React, { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const faqs = [
  {
    question: 'Is ITtoAI another AI course platform?',
    answer:
      'No. ITtoAI is an AI workforce transformation and talent platform. While it includes structured learning programs, the focus is on skill assessment, evidence of practical capability through real projects, and connecting verified AI-ready professionals with relevant opportunities — not just delivering course content.',
  },
  {
    question: 'Do I need AI experience to join ITtoAI?',
    answer:
      'No. ITtoAI is designed specifically for IT professionals who are transitioning into AI roles. Your existing technical experience — whether in software engineering, DevOps, data, QA or any other technology discipline — is the starting point. ITtoAI helps you identify what to add.',
  },
  {
    question: 'Can a Java developer transition into AI?',
    answer:
      'Yes. Java developers typically have strong foundations in object-oriented programming, system design and APIs. ITtoAI maps these existing skills against the requirements of AI application engineering roles and identifies the practical AI capabilities to add.',
  },
  {
    question: 'Can a Python developer become an AI engineer?',
    answer:
      'Python developers are well-positioned for AI engineering roles. The transition typically involves adding LLM engineering, RAG systems, AI agents and production deployment skills on top of existing Python proficiency. ITtoAI helps you identify and build these specific capabilities.',
  },
  {
    question: 'Does ITtoAI guarantee jobs or placements?',
    answer:
      'No. ITtoAI does not guarantee employment, placement, salary increases or career outcomes. What ITtoAI provides is a structured path to build practical AI capability, a verified profile that demonstrates what you can do, and connections to relevant AI opportunities. Outcomes depend on individual effort, skills developed and market conditions.',
  },
  {
    question: 'How does the AI Readiness Assessment work?',
    answer:
      'The AI Readiness Assessment evaluates your existing technical skills and experience against the requirements of your target AI role. It identifies specific skill gaps and provides a readiness profile. The methodology is role-specific — a DevOps engineer transitioning to MLOps will be assessed differently from a Python developer targeting GenAI engineering.',
  },
  {
    question: 'How are skills verified on ITtoAI?',
    answer:
      'Skill verification on ITtoAI is evidence-based. It combines technical assessments, completed project submissions, and practical evaluations. The goal is to build a profile that demonstrates what you can actually build — not just what you have studied or which certificates you hold.',
  },
  {
    question: 'Can companies hire through ITtoAI?',
    answer:
      'Yes. ITtoAI is designed to connect companies with verified, AI-ready professionals. Rather than filtering resumes for AI keywords, companies can access candidates with assessed skills, completed projects and evidence of practical capability. Hiring features are being developed and will be available as the platform grows.',
  },
  {
    question: 'Can companies use ITtoAI to transform their existing IT workforce?',
    answer:
      'Yes. ITtoAI offers workforce transformation capabilities for technology teams — including team-level AI readiness assessment, role mapping, skill gap identification and structured transformation programs. These enterprise features are being developed and will be available progressively.',
  },
  {
    question: 'How does ITtoAI handle user data?',
    answer:
      'ITtoAI takes data privacy seriously. Assessment results, skill profiles and project data belong to the professional. Data is used to provide the platform experience and is not sold to third parties. Full details will be available in the Privacy Policy.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-secondary"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className={`section-label mb-5 inline-flex reveal-child stagger-1 ${revealed ? 'is-visible' : ''}`}>FAQ</span>
          <h2
            id="faq-heading"
            className={`section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] reveal-child stagger-2 ${revealed ? 'is-visible' : ''}`}
          >
            Common questions
            <br />
            <span className="text-gradient-primary">answered honestly.</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`bg-card rounded-xl border transition-colors reveal-child stagger-${Math.min(i + 2, 8)} ${
                  revealed ? 'is-visible' : ''
                } ${isOpen ? 'border-accent/25' : 'border-border'}`}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl min-h-[56px]"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                >
                  <span className="text-sm sm:text-base font-600 text-foreground leading-snug pr-2">
                    {faq.question}
                  </span>
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      background: isOpen ? 'rgba(37,99,235,0.1)' : 'var(--secondary)',
                    }}
                    aria-hidden="true"
                  >
                    <Icon
                      name={isOpen ? 'MinusIcon' : 'PlusIcon'}
                      size={14}
                      className={isOpen ? 'text-accent' : 'text-muted'}
                    />
                  </span>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  className={`faq-answer ${isOpen ? 'is-open' : ''}`}
                >
                  <p className="px-5 pb-5 text-sm sm:text-base text-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}