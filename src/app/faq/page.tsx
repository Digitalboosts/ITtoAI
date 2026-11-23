import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQHero from './components/FAQHero';
import FAQExplorer from './components/FAQExplorer';

export const metadata: Metadata = {
  title: 'FAQ | ITtoAI',
  description: 'Common questions about ITtoAI, answered honestly — AI readiness assessments, career transitions, verified profiles, hiring, enterprise workforce transformation and privacy.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ | ITtoAI',
    description: 'Common questions about ITtoAI, answered honestly.',
    url: '/faq',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    type: 'website',
  },
};

// Matches the visible question/answer pairs in FAQExplorer exactly — required for valid FAQPage schema.
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is ITtoAI another AI course platform?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. ITtoAI is an AI workforce transformation and talent platform. While it includes structured learning programs, the focus is on skill assessment, evidence of practical capability through real projects, and connecting verified AI-ready professionals with relevant opportunities — not just delivering course content.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need AI experience?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. ITtoAI is designed specifically for IT professionals who are transitioning into AI roles. Your existing technical experience — whether in software engineering, DevOps, data, QA or any other technology discipline — is the starting point. ITtoAI helps you identify what to add.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a Java developer transition to AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Java developers typically have strong foundations in object-oriented programming, system design and APIs. ITtoAI maps these existing skills against the requirements of AI application engineering roles and identifies the practical AI capabilities to add.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a Python developer become an AI engineer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Python developers are well-positioned for AI engineering roles. The transition typically involves adding LLM engineering, RAG systems, AI agents and production deployment skills on top of existing Python proficiency. ITtoAI helps you identify and build these specific capabilities.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the AI Readiness Assessment work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The AI Readiness Assessment evaluates your existing technical skills and experience against the requirements of your target AI role. It identifies specific skill gaps and provides a readiness profile. The methodology is role-specific — a DevOps engineer transitioning to MLOps will be assessed differently from a Python developer targeting GenAI engineering.',
      },
    },
    {
      '@type': 'Question',
      name: 'How are skills verified?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Skill verification on ITtoAI is evidence-based. It combines technical assessments, completed project submissions, and practical evaluations. The goal is to build a profile that demonstrates what you can actually build — not just what you have studied or which certificates you hold.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does ITtoAI guarantee jobs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. ITtoAI does not guarantee employment, placement, salary increases or career outcomes. What ITtoAI provides is a structured path to build practical AI capability, a verified profile that demonstrates what you can do, and connections to relevant AI opportunities. Outcomes depend on individual effort, skills developed and market conditions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can companies hire through ITtoAI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. ITtoAI is designed to connect companies with verified, AI-ready professionals. Rather than filtering resumes for AI keywords, companies can access candidates with assessed skills, completed projects and evidence of practical capability. Hiring features are being developed and will be available as the platform grows.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can companies transform their existing workforce?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. ITtoAI offers workforce transformation capabilities for technology teams — including team-level AI readiness assessment, role mapping, skill gap identification and structured transformation programs. These enterprise features are being developed and will be available progressively.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does ITtoAI handle user information?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ITtoAI takes data privacy seriously. Assessment results, skill profiles and project data belong to the professional. Information is used to provide the platform experience and is not sold to third parties. Full details will be available in the Privacy Policy.',
      },
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main id="main-content">
        <FAQHero />
        <FAQExplorer />
      </main>
      <Footer />
    </>
  );
}
