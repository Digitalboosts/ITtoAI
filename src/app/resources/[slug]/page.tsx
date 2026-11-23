import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { resources, getResourceBySlug, getRelatedResources } from '../data';
import ArticleHeader from './components/ArticleHeader';
import ArticleBody from './components/ArticleBody';
import CareerCTASection from './components/CareerCTASection';
import RelatedResourcesSection from './components/RelatedResourcesSection';

interface PageParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.id }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    return { title: 'Resource Not Found | ITtoAI' };
  }

  return {
    title: `${resource.title} | ITtoAI Resources`,
    description: resource.excerpt,
    authors: [{ name: resource.author }],
    alternates: { canonical: `/resources/${resource.id}` },
    openGraph: {
      title: resource.title,
      description: resource.excerpt,
      url: `/resources/${resource.id}`,
      type: 'article',
      publishedTime: resource.publishedDate,
      authors: [resource.author],
      tags: [resource.category],
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: resource.title,
      description: resource.excerpt,
    },
  };
}

export default async function ResourceArticlePage({ params }: PageParams) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  const related = getRelatedResources(resource);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ittoai.in';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: resource.title,
    description: resource.excerpt,
    author: { '@type': 'Organization', name: resource.author },
    publisher: { '@type': 'Organization', name: 'ITtoAI', logo: { '@type': 'ImageObject', url: `${siteUrl}/assets/images/app_logo.png` } },
    datePublished: resource.publishedDate,
    dateModified: resource.publishedDate,
    mainEntityOfPage: `${siteUrl}/resources/${resource.id}`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Resources', item: `${siteUrl}/resources` },
      { '@type': 'ListItem', position: 2, name: resource.category, item: `${siteUrl}/resources` },
      { '@type': 'ListItem', position: 3, name: resource.title, item: `${siteUrl}/resources/${resource.id}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main id="main-content">
        <article>
          <ArticleHeader resource={resource} />
          <ArticleBody sections={resource.sections} />
        </article>
        <CareerCTASection />
        <RelatedResourcesSection related={related} />
      </main>
      <Footer />
    </>
  );
}
