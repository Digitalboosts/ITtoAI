// Pure, frontend-only scoring engine for the AI Readiness Assessment.
// No network calls, no backend — everything here is deterministic given
// (profile, answers) so it can be swapped for a real API later without
// touching any UI component (all components consume `AssessmentResult`).

import {
  AI_EXPERIENCE_BASELINE,
  CATEGORY_TO_ROLE,
  EXAMPLE_SCORE_POOL,
  ProfileSelections,
  QUESTIONS,
  TOTAL_POSSIBLE_POINTS,
} from './assessment-data';

export type AnswerMap = Record<string, string>; // questionId -> selected optionId

export interface SkillScore {
  name: string;
  score: number;
}

export interface SkillGap extends SkillScore {
  target: number;
  priority: 'High Priority' | 'Priority';
}

export type ReadinessTier = 'Advanced' | 'Strong Foundation' | 'Developing' | 'Early Stage';

export interface AssessmentResult {
  overall: number;
  tier: ReadinessTier;
  currentRoleLabel: string;
  recommendedRole: string;
  usedFallbackRecommendation: boolean;
  skills: SkillScore[];
  strengths: SkillScore[];
  developing: SkillScore[];
  gaps: SkillGap[];
  narrative: string;
  correctCount: number;
  totalQuestions: number;
}

export function getReadinessTier(score: number): ReadinessTier {
  if (score >= 86) return 'Advanced';
  if (score >= 71) return 'Strong Foundation';
  if (score >= 41) return 'Developing';
  return 'Early Stage';
}

export function getTierColor(tier: ReadinessTier): string {
  switch (tier) {
    case 'Advanced':
      return 'var(--success)';
    case 'Strong Foundation':
      return 'var(--accent)';
    case 'Developing':
      return 'var(--warning)';
    default:
      return '#EF4444';
  }
}

export function getSkillTier(score: number): 'strength' | 'developing' | 'gap' {
  if (score >= 80) return 'strength';
  if (score >= 60) return 'developing';
  return 'gap';
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'var(--success)';
  if (score >= 60) return 'var(--accent)';
  return 'var(--warning)';
}

// Combines a technology + generic role into a friendlier label, e.g.
// "Developer" + "Python" -> "Python Developer". Matches how the site talks
// about roles elsewhere (e.g. "Python Developer -> AI Application Engineer").
export function getCurrentRoleLabel(profile: ProfileSelections): string {
  const { role, technology } = profile;
  if (!role) return 'IT Professional';

  const techPrefix: Record<string, string> = {
    Python: 'Python',
    Java: 'Java',
    'JavaScript / TypeScript': 'JavaScript',
    '.NET / C#': '.NET',
  };

  if ((role === 'Developer' || role === 'Software Engineer') && technology && techPrefix[technology]) {
    return `${techPrefix[technology]} Developer`;
  }
  return role;
}

/**
 * Category score blends quiz-question correctness with the user's
 * self-reported AI experience level. A single multiple-choice question per
 * category can't carry a fully granular score on its own, so a wrong answer
 * lands around 25-40 rather than a misleading hard 0, and a right answer is
 * nudged by how much real AI experience the person already reports having.
 */
function scoreCategory(isCorrect: boolean, aiExperience: string | null): number {
  const baseline: number = aiExperience && aiExperience in AI_EXPERIENCE_BASELINE
    ? AI_EXPERIENCE_BASELINE[aiExperience]
    : AI_EXPERIENCE_BASELINE['Not yet'];
  const correctness = isCorrect ? 100 : 32;
  return Math.round(correctness * 0.75 + baseline * 0.25);
}

// Lowest 2-3 categories, as specified: always the bottom 2, plus a 3rd only
// when it isn't already a strength (>=80) — so a single real weak spot isn't
// padded out with two categories that are actually fine.
function selectGaps(sortedAsc: SkillScore[]): SkillGap[] {
  const includeThird = sortedAsc[2] !== undefined && sortedAsc[2].score < 80;
  const picked = sortedAsc.slice(0, includeThird ? 3 : 2);
  return picked.map((s, i) => ({
    ...s,
    target: Math.min(95, s.score + 20),
    priority: i === 0 ? 'High Priority' : 'Priority',
  }));
}

function buildNarrative(strengths: SkillScore[], recommendedRole: string): string {
  if (strengths.length === 0) {
    return `Based on your answers, ${recommendedRole} is a reasonable starting direction — the quick assessment above is a first signal, not a final verdict.`;
  }
  const names = strengths.slice(0, 2).map((s) => s.name).join(' and ');
  return `Your strongest areas right now are ${names}. Building on that toward ${recommendedRole} plays to what you already do well while filling in the rest.`;
}

export function calculateAssessmentResult(profile: ProfileSelections, answers: AnswerMap): AssessmentResult {
  let earnedPoints = 0;
  let correctCount = 0;

  const skills: SkillScore[] = QUESTIONS.map((q) => {
    const isCorrect = answers[q.id] === q.correctOptionId;
    if (isCorrect) {
      earnedPoints += q.points;
      correctCount += 1;
    }
    return { name: q.category, score: scoreCategory(isCorrect, profile.aiExperience) };
  });

  const overall = Math.round(skills.reduce((sum, s) => sum + s.score, 0) / skills.length);
  const tier = getReadinessTier(overall);

  const sortedAsc = [...skills].sort((a, b) => a.score - b.score);
  const sortedDesc = [...skills].sort((a, b) => b.score - a.score);

  const strengths = sortedDesc.filter((s) => getSkillTier(s.score) === 'strength');
  const developing = skills.filter((s) => getSkillTier(s.score) === 'developing');
  const gaps = selectGaps(sortedAsc);

  const usedFallbackRecommendation = !profile.targetRole || profile.targetRole === 'Not sure yet';
  const recommendedRole = usedFallbackRecommendation
    ? CATEGORY_TO_ROLE[sortedDesc[0]?.name] ?? 'AI Engineer'
    : profile.targetRole!;

  const currentRoleLabel = getCurrentRoleLabel(profile);
  const narrative = buildNarrative(strengths.length ? strengths : sortedDesc, recommendedRole);

  return {
    overall,
    tier,
    currentRoleLabel,
    recommendedRole,
    usedFallbackRecommendation,
    skills,
    strengths,
    developing,
    gaps,
    narrative,
    correctCount,
    totalQuestions: QUESTIONS.length,
  };
}

// Deterministic point-total formula kept explicit (rather than inferred from
// the blended category average) so the "earned / max * 100" relationship
// asked for in the spec stays visible and auditable in code.
export function calculatePointsBasedScore(answers: AnswerMap): number {
  const earned = QUESTIONS.reduce((sum, q) => (answers[q.id] === q.correctOptionId ? sum + q.points : sum), 0);
  return Math.round((earned / TOTAL_POSSIBLE_POINTS) * 100);
}

// --- Illustrative example generator (Section 2) ---------------------------
// Produces a fresh, randomized, clearly-labeled demo result. Never persisted,
// never treated as a user's real result — regenerated on every page load
// where no real result exists yet.

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function jitter(base: number, spread: number): number {
  const value = base + Math.round((Math.random() - 0.5) * 2 * spread);
  return Math.max(20, Math.min(97, value));
}

const EXAMPLE_ROLE_PAIRS: [string, string][] = [
  ['Python Developer', 'AI Application Engineer'],
  ['DevOps Engineer', 'MLOps Engineer'],
  ['QA Engineer', 'AI QA Engineer'],
  ['Java Developer', 'GenAI Engineer'],
  ['Data Professional', 'AI/Data Engineer'],
  ['Business Analyst', 'AI Business Analyst'],
];

export function generateExampleResult(): AssessmentResult {
  const overall = pick(EXAMPLE_SCORE_POOL);
  const [currentRoleLabel, recommendedRole] = pick(EXAMPLE_ROLE_PAIRS);

  const skills: SkillScore[] = QUESTIONS.map((q) => ({
    name: q.category,
    score: jitter(overall, 22),
  }));

  const sortedAsc = [...skills].sort((a, b) => a.score - b.score);
  const sortedDesc = [...skills].sort((a, b) => b.score - a.score);
  const strengths = sortedDesc.filter((s) => getSkillTier(s.score) === 'strength');
  const developing = skills.filter((s) => getSkillTier(s.score) === 'developing');
  const gaps = selectGaps(sortedAsc);

  return {
    overall,
    tier: getReadinessTier(overall),
    currentRoleLabel,
    recommendedRole,
    usedFallbackRecommendation: false,
    skills,
    strengths,
    developing,
    gaps,
    narrative: buildNarrative(strengths.length ? strengths : sortedDesc, recommendedRole),
    correctCount: Math.round((overall / 100) * QUESTIONS.length),
    totalQuestions: QUESTIONS.length,
  };
}
