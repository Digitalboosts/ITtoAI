import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { jobs, getJobBySlug } from '../data';
import JobDetailView from './components/JobDetailView';

interface PageParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.id }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    return { title: 'Job Not Found | ITtoAI' };
  }

  return {
    title: `${job.title} at ${job.company} | ITtoAI`,
    description: `${job.title} — an example AI job listing at ${job.company} (${job.location}) for demonstration purposes.`,
    robots: { index: false, follow: true },
  };
}

export default async function JobDetailPage({ params }: PageParams) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  return (
    <>
      <Header />
      <main id="main-content">
        <JobDetailView job={job} />
      </main>
      <Footer />
    </>
  );
}
