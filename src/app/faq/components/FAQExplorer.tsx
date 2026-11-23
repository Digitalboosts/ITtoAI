'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const categories = [
  'Professionals',
  'AI Assessment',
  'Programs',
  'Verified Profiles',
  'Jobs',
  'Employers',
  'Enterprise',
  'Privacy',
] as const;

type Category = (typeof categories)[number];

interface FAQItem {
  id: string;
  category: Category;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 'course-platform',
    category: 'Programs',
    question: 'Is ITtoAI another AI course platform?',
    answer:
      'No. ITtoAI is an AI workforce transformation and talent platform. While it includes structured learning programs, the focus is on skill assessment, evidence of practical capability through real projects, and connecting verified AI-ready professionals with relevant opportunities — not just delivering course content.',
  },
  {
    id: 'ai-experience-needed',
    category: 'Professionals',
    question: 'Do I need AI experience?',
    answer:
      'No. ITtoAI is designed specifically for IT professionals who are transitioning into AI roles. Your existing technical experience — whether in software engineering, DevOps, data, QA or any other technology discipline — is the starting point. ITtoAI helps you identify what to add.',
  },
  {
    id: 'java-transition',
    category: 'Professionals',
    question: 'Can a Java developer transition to AI?',
    answer:
      'Yes. Java developers typically have strong foundations in object-oriented programming, system design and APIs. ITtoAI maps these existing skills against the requirements of AI application engineering roles and identifies the practical AI capabilities to add.',
  },
  {
    id: 'python-transition',
    category: 'Professionals',
    question: 'Can a Python developer become an AI engineer?',
    answer:
      'Python developers are well-positioned for AI engineering roles. The transition typically involves adding LLM engineering, RAG systems, AI agents and production deployment skills on top of existing Python proficiency. ITtoAI helps you identify and build these specific capabilities.',
  },
  {
    id: 'assessment-how',
    category: 'AI Assessment',
    question: 'How does the AI Readiness Assessment work?',
    answer:
      'The AI Readiness Assessment evaluates your existing technical skills and experience against the requirements of your target AI role. It identifies specific skill gaps and provides a readiness profile. The methodology is role-specific — a DevOps engineer transitioning to MLOps will be assessed differently from a Python developer targeting GenAI engineering.',
  },
  {
    id: 'skills-verified',
    category: 'Verified Profiles',
    question: 'How are skills verified?',
    answer:
      'Skill verification on ITtoAI is evidence-based. It combines technical assessments, completed project submissions, and practical evaluations. The goal is to build a profile that demonstrates what you can actually build — not just what you have studied or which certificates you hold.',
  },
  {
    id: 'guarantee-jobs',
    category: 'Jobs',
    question: 'Does ITtoAI guarantee jobs?',
    answer:
      'No. ITtoAI does not guarantee employment, placement, salary increases or career outcomes. What ITtoAI provides is a structured path to build practical AI capability, a verified profile that demonstrates what you can do, and connections to relevant AI opportunities. Outcomes depend on individual effort, skills developed and market conditions.',
  },
  {
    id: 'companies-hire',
    category: 'Employers',
    question: 'Can companies hire through ITtoAI?',
    answer:
      'Yes. ITtoAI is designed to connect companies with verified, AI-ready professionals. Rather than filtering resumes for AI keywords, companies can access candidates with assessed skills, completed projects and evidence of practical capability. Hiring features are being developed and will be available as the platform grows.',
  },
  {
    id: 'workforce-transform',
    category: 'Enterprise',
    question: 'Can companies transform their existing workforce?',
    answer:
      'Yes. ITtoAI offers workforce transformation capabilities for technology teams — including team-level AI readiness assessment, role mapping, skill gap identification and structured transformation programs. These enterprise features are being developed and will be available progressively.',
  },
  {
    id: 'user-information',
    category: 'Privacy',
    question: 'How does ITtoAI handle user information?',
    answer:
      'ITtoAI takes data privacy seriously. Assessment results, skill profiles and project data belong to the professional. Information is used to provide the platform experience and is not sold to third parties. Full details will be available in the Privacy Policy.',
  },
];

export default function FAQExplorer() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [openId, setOpenId] = useState<string | null>(null);
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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach((cat) => {
      counts[cat] = faqs.filter((f) => f.category === cat).length;
    });
    return counts;
  }, []);

  const filteredFaqs = useMemo(() => {
    const query = search.trim().toLowerCase();
    return faqs.filter((faq) => {
      const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
      const matchesSearch =
        query === '' || faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const toggleOpen = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  const clearFilters = () => {
    setSearch('');
    setActiveCategory('All');
  };

  return (
    <section id="explore" ref={sectionRef} className="pb-20 lg:pb-28" aria-labelledby="explore-heading">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="explore-heading" className="sr-only">Browse frequently asked questions</h2>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8 reveal-child stagger-1">
          <div className="relative">
            <Icon
              name="MagnifyingGlassIcon"
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              aria-label="Search frequently asked questions"
              className="w-full rounded-full border border-border bg-card pl-11 pr-11 py-3.5 text-sm text-foreground placeholder:text-muted-foreground shadow-card focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-muted hover:bg-secondary transition-colors"
              >
                <Icon name="XMarkIcon" size={14} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-4 reveal-child stagger-2" role="group" aria-label="Filter by category">
          <button
            type="button"
            onClick={() => setActiveCategory('All')}
            aria-pressed={activeCategory === 'All'}
            className="px-4 py-2 rounded-full text-sm font-600 border transition-colors"
            style={
              activeCategory === 'All'
                ? { background: 'var(--accent)', color: 'var(--accent-foreground)', borderColor: 'var(--accent)' }
                : { background: 'var(--card)', color: 'var(--foreground)', borderColor: 'var(--border)' }
            }
          >
            All <span className="opacity-70">({faqs.length})</span>
          </button>
          {categories.map((cat) => {
            const selected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={selected}
                className="px-4 py-2 rounded-full text-sm font-600 border transition-colors"
                style={
                  selected
                    ? { background: 'var(--accent)', color: 'var(--accent-foreground)', borderColor: 'var(--accent)' }
                    : { background: 'var(--card)', color: 'var(--foreground)', borderColor: 'var(--border)' }
                }
              >
                {cat} <span className="opacity-70">({categoryCounts[cat]})</span>
              </button>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground mb-10 reveal-child stagger-3">
          Showing {filteredFaqs.length} of {faqs.length} questions
        </p>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto space-y-2 reveal-child stagger-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 px-6 bg-secondary rounded-xl border border-dashed border-border">
              <p className="text-base font-700 text-foreground mb-2">No matching questions</p>
              <p className="text-sm text-muted mb-5">Try a different search term or category.</p>
              <button type="button" onClick={clearFilters} className="btn-secondary">
                Clear filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-card rounded-xl border transition-colors ${isOpen ? 'border-accent/25' : 'border-border'}`}
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl min-h-[56px]"
                    onClick={() => toggleOpen(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    id={`faq-question-${faq.id}`}
                  >
                    <span className="min-w-0">
                      <span
                        className="inline-block text-2xs font-700 text-accent uppercase tracking-wider mb-1.5"
                      >
                        {faq.category}
                      </span>
                      <span className="block text-sm sm:text-base font-600 text-foreground leading-snug pr-2">
                        {faq.question}
                      </span>
                    </span>
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                      style={{ background: isOpen ? 'rgba(37,99,235,0.1)' : 'var(--secondary)' }}
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
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-question-${faq.id}`}
                    className={`faq-answer ${isOpen ? 'is-open' : ''}`}
                  >
                    <p className="px-5 pb-5 text-sm sm:text-base text-muted leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions */}
        <div className="text-center mt-14 reveal-child stagger-5">
          <p className="text-sm text-muted mb-4">Still have questions?</p>
          <a href="/contact" className="btn-secondary">
            Contact Us
            <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
