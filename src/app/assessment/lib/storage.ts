// localStorage persistence for the frontend-only assessment flow.
// Nothing here ever leaves the browser — no network calls.

import { AnswerMap, AssessmentResult } from './assessment-engine';
import { ProfileSelections } from './assessment-data';

const STORAGE_KEY = 'ittoai_assessment_v1';

export type AssessmentStep = 'profile' | 'quiz' | 'result';

export interface StoredAssessmentState {
  step: AssessmentStep;
  profile: ProfileSelections;
  answers: AnswerMap;
  currentQuestionIndex: number;
  result: AssessmentResult | null;
}

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function loadAssessmentState(): StoredAssessmentState | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredAssessmentState;
  } catch {
    return null;
  }
}

export function saveAssessmentState(state: StoredAssessmentState): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable (private browsing, quota, etc.) — fail silently,
    // the in-memory React state still works for the current session.
  }
}

export function clearAssessmentState(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // no-op
  }
}
