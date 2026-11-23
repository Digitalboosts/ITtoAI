import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import TheShiftSection from './components/TheShiftSection';
import ReadinessDashboard from './components/ReadinessDashboard';
import CareerTransformationSection from './components/CareerTransformationSection';
import ProcessTimeline from './components/ProcessTimeline';
import TransformationProgramSection from './components/TransformationProgramSection';
import PracticalProjectsSection from './components/PracticalProjectsSection';
import VerifiedProfile from './components/VerifiedProfile';
import SocialProofSection from './components/SocialProofSection';
import EmployerPipeline from './components/EmployerPipeline';
import WhyITtoAISection from './components/WhyITtoAISection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection />
        <TheShiftSection />
        <ReadinessDashboard />
        <CareerTransformationSection />
        <ProcessTimeline />
        <TransformationProgramSection />
        <PracticalProjectsSection />
        <VerifiedProfile />
        <SocialProofSection />
        <EmployerPipeline />
        <WhyITtoAISection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}