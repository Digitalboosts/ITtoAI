import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactHero from './components/ContactHero';
import ContactSection from './components/ContactSection';

export const metadata: Metadata = {
  title: 'Contact | ITtoAI',
  description: 'How can we help? Get AI career guidance, hire AI-ready talent, or transform your workforce — tell us what you need.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | ITtoAI',
    description: 'Get AI career guidance, hire AI-ready talent, or transform your workforce — tell us what you need.',
    url: '/contact',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | ITtoAI',
    description: 'Get AI career guidance, hire AI-ready talent, or transform your workforce — tell us what you need.',
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <ContactHero />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
