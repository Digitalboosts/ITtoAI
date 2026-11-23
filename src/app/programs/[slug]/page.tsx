import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { programs, getProgramBySlug } from '../data';
import ProgramDetailHeader from './components/ProgramDetailHeader';
import CurriculumSection from './components/CurriculumSection';
import ProgramOutcomesSection from './components/ProgramOutcomesSection';
import ProgramEvidenceSection from './components/ProgramEvidenceSection';

interface PageParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return programs.map((program) => ({ slug: program.id }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    return { title: 'Program Not Found | ITtoAI' };
  }

  const title = `${program.currentRole} to ${program.targetRole} Program | ITtoAI`;
  return {
    title,
    description: program.overview,
    alternates: { canonical: `/programs/${program.id}` },
    openGraph: {
      title,
      description: program.overview,
      url: `/programs/${program.id}`,
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: program.overview,
    },
  };
}

export default async function ProgramDetailPage({ params }: PageParams) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ittoai.in';
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Programs', item: `${siteUrl}/programs` },
      { '@type': 'ListItem', position: 2, name: `${program.currentRole} to ${program.targetRole}`, item: `${siteUrl}/programs/${program.id}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main id="main-content">
        <ProgramDetailHeader program={program} />
        <CurriculumSection curriculum={program.curriculum} />
        <ProgramOutcomesSection program={program} />
        <ProgramEvidenceSection program={program} />
      </main>
      <Footer />
    </>
  );
}
