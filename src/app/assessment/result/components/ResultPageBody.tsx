'use client';
import React, { useEffect, useState } from 'react';
import { AssessmentResult, generateExampleResult } from '../../lib/assessment-engine';
import { loadAssessmentState } from '../../lib/storage';
import ResultHeader from './ResultHeader';
import OverallReadinessSection from './OverallReadinessSection';
import SkillInsightsSection from './SkillInsightsSection';
import CareerDirectionSection from './CareerDirectionSection';
import NextStepsSection from './NextStepsSection';

export default function ResultPageBody() {
  const [ready, setReady] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isExample, setIsExample] = useState(true);

  useEffect(() => {
    const stored = loadAssessmentState();
    if (stored?.step === 'result' && stored.result) {
      setResult(stored.result);
      setIsExample(false);
    } else {
      // No completed real assessment yet — show a fresh randomized example,
      // clearly labeled, never persisted, never mistaken for a real result.
      setResult(generateExampleResult());
      setIsExample(true);
    }
    setReady(true);
  }, []);

  if (!ready || !result) {
    return <div className="min-h-[60vh]" aria-hidden="true" />;
  }

  return (
    <>
      <ResultHeader isExample={isExample} />
      <OverallReadinessSection result={result} isExample={isExample} />
      <SkillInsightsSection result={result} />
      <CareerDirectionSection result={result} isExample={isExample} />
      <NextStepsSection result={result} isExample={isExample} />
    </>
  );
}
