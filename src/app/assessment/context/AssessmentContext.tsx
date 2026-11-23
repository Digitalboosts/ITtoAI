'use client';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { EMPTY_PROFILE, ProfileKey, ProfileSelections, QUESTIONS } from '../lib/assessment-data';
import { AnswerMap, AssessmentResult, calculateAssessmentResult } from '../lib/assessment-engine';
import { AssessmentStep, clearAssessmentState, loadAssessmentState, saveAssessmentState } from '../lib/storage';

interface AssessmentContextValue {
  hydrated: boolean;
  step: AssessmentStep;
  profile: ProfileSelections;
  answers: AnswerMap;
  currentQuestionIndex: number;
  result: AssessmentResult | null;
  setProfileField: (key: ProfileKey, value: string) => void;
  isProfileComplete: boolean;
  profileCompletedCount: number;
  beginQuiz: () => void;
  answerCurrentQuestion: (optionId: string) => void;
  goToPreviousQuestion: () => void;
  goToNextQuestion: () => void;
  calculateResult: () => void;
  retake: () => void;
}

const AssessmentContext = createContext<AssessmentContextValue | null>(null);

export function AssessmentProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [step, setStep] = useState<AssessmentStep>('profile');
  const [profile, setProfile] = useState<ProfileSelections>(EMPTY_PROFILE);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  // Restore any in-progress or completed assessment from a previous visit.
  useEffect(() => {
    const stored = loadAssessmentState();
    if (stored) {
      setStep(stored.step);
      setProfile(stored.profile);
      setAnswers(stored.answers);
      setCurrentQuestionIndex(stored.currentQuestionIndex);
      setResult(stored.result);
    }
    setHydrated(true);
  }, []);

  // Persist on every change, once initial hydration has happened (so we
  // don't overwrite stored state with empty defaults on first render).
  useEffect(() => {
    if (!hydrated) return;
    saveAssessmentState({ step, profile, answers, currentQuestionIndex, result });
  }, [hydrated, step, profile, answers, currentQuestionIndex, result]);

  const profileCompletedCount = useMemo(() => Object.values(profile).filter(Boolean).length, [profile]);
  const isProfileComplete = profileCompletedCount === Object.keys(EMPTY_PROFILE).length;

  const setProfileField = useCallback((key: ProfileKey, value: string) => {
    setProfile((prev) => ({ ...prev, [key]: prev[key] === value ? null : value }));
  }, []);

  const beginQuiz = useCallback(() => {
    setStep('quiz');
    setCurrentQuestionIndex(0);
  }, []);

  const answerCurrentQuestion = useCallback(
    (optionId: string) => {
      const question = QUESTIONS[currentQuestionIndex];
      if (!question) return;
      setAnswers((prev) => ({ ...prev, [question.id]: optionId }));
    },
    [currentQuestionIndex]
  );

  const goToPreviousQuestion = useCallback(() => {
    setCurrentQuestionIndex((i) => Math.max(0, i - 1));
  }, []);

  const goToNextQuestion = useCallback(() => {
    setCurrentQuestionIndex((i) => Math.min(QUESTIONS.length - 1, i + 1));
  }, []);

  const calculateResult = useCallback(() => {
    const computed = calculateAssessmentResult(profile, answers);
    setResult(computed);
    setStep('result');
  }, [profile, answers]);

  const retake = useCallback(() => {
    clearAssessmentState();
    setStep('profile');
    setProfile(EMPTY_PROFILE);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setResult(null);
  }, []);

  const value: AssessmentContextValue = {
    hydrated,
    step,
    profile,
    answers,
    currentQuestionIndex,
    result,
    setProfileField,
    isProfileComplete,
    profileCompletedCount,
    beginQuiz,
    answerCurrentQuestion,
    goToPreviousQuestion,
    goToNextQuestion,
    calculateResult,
    retake,
  };

  return <AssessmentContext.Provider value={value}>{children}</AssessmentContext.Provider>;
}

export function useAssessment(): AssessmentContextValue {
  const ctx = useContext(AssessmentContext);
  if (!ctx) throw new Error('useAssessment must be used within an AssessmentProvider');
  return ctx;
}
