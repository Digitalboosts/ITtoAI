// Static configuration for the AI Readiness Assessment.
// Pure data only — no scoring or React logic here (see assessment-engine.ts).

export type ProfileKey = 'role' | 'experience' | 'technology' | 'aiExperience' | 'targetRole';

export interface ProfileField {
  key: ProfileKey;
  label: string;
  helper: string;
  options: string[];
}

export type ProfileSelections = Record<ProfileKey, string | null>;

export const EMPTY_PROFILE: ProfileSelections = {
  role: null,
  experience: null,
  technology: null,
  aiExperience: null,
  targetRole: null,
};

export const PROFILE_FIELDS: ProfileField[] = [
  {
    key: 'role',
    label: 'Current role',
    helper: 'What best describes your current position?',
    options: [
      'Software Engineer',
      'Developer',
      'QA Engineer',
      'DevOps Engineer',
      'Cloud Engineer',
      'Data Professional',
      'Business Analyst',
      'Product Manager',
      'Other',
    ],
  },
  {
    key: 'experience',
    label: 'Years of experience',
    helper: 'Total time working in technology.',
    options: ['< 1 year', '1–3 years', '3–5 years', '5–10 years', '10+ years'],
  },
  {
    key: 'technology',
    label: 'Primary technology',
    helper: 'The stack you work in most.',
    options: ['Python', 'Java', 'JavaScript / TypeScript', '.NET / C#', 'Data / SQL', 'Cloud / DevOps', 'Other'],
  },
  {
    key: 'aiExperience',
    label: 'Current AI experience',
    helper: 'How much hands-on AI work have you done?',
    options: ['Not yet', 'Exploring AI tools', 'Built small AI projects', 'Working with AI professionally', 'Advanced / Production AI'],
  },
  {
    key: 'targetRole',
    label: 'Target AI role',
    helper: 'Where you’d like to head next.',
    options: [
      'AI Engineer',
      'GenAI Engineer',
      'AI Application Engineer',
      'AI QA Engineer',
      'MLOps Engineer',
      'AI/Data Engineer',
      'AI Business Analyst',
      'AI Product Manager',
      'Not sure yet',
    ],
  },
];

// A rough self-reported baseline (0-100) blended into category scoring alongside
// quiz-question correctness, so one right/wrong answer doesn't swing a whole
// category between 0 and 100. See assessment-engine.ts for how it's used.
export const AI_EXPERIENCE_BASELINE: Record<string, number> = {
  'Not yet': 12,
  'Exploring AI tools': 30,
  'Built small AI projects': 50,
  'Working with AI professionally': 70,
  'Advanced / Production AI': 88,
};

export interface QuestionOption {
  id: string;
  label: string;
}

export interface Question {
  id: string;
  category: string;
  points: number;
  prompt: string;
  scenario?: string;
  options: QuestionOption[];
  correctOptionId: string;
}

// 10 questions, one per scored category, 10 points each (100 total).
// Kept short and scenario-based per spec — this is a quick check, not an exam.
export const QUESTIONS: Question[] = [
  {
    id: 'q-programming',
    category: 'Programming',
    points: 10,
    prompt: 'Which of these matters most when writing production code other engineers will maintain?',
    options: [
      { id: 'a', label: 'Clever one-liners that minimize line count' },
      { id: 'b', label: 'Readable, well-tested, documented code' },
      { id: 'c', label: 'Avoiding comments entirely' },
      { id: 'd', label: 'Always using the newest language features' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'q-ai-fundamentals',
    category: 'AI Fundamentals',
    points: 10,
    prompt: 'What best describes the difference between traditional software and a machine learning model?',
    options: [
      { id: 'a', label: 'ML models are always faster to run' },
      { id: 'b', label: 'Traditional software follows explicit rules; ML models learn patterns from data' },
      { id: 'c', label: 'There is no meaningful difference' },
      { id: 'd', label: 'ML models never make mistakes' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'q-llm-engineering',
    category: 'LLM Engineering',
    points: 10,
    prompt: 'What is "prompt engineering" primarily concerned with?',
    options: [
      { id: 'a', label: 'Writing backend REST APIs' },
      { id: 'b', label: 'Designing and refining inputs to get reliable, high-quality outputs from an LLM' },
      { id: 'c', label: 'Training a foundation model from scratch' },
      { id: 'd', label: 'Managing GPU hardware in a data center' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'q-rag',
    category: 'RAG',
    points: 10,
    scenario: 'You need an LLM application to answer questions using private company documents.',
    prompt: 'Which architecture is most appropriate?',
    options: [
      { id: 'a', label: 'Standard web search' },
      { id: 'b', label: 'RAG (retrieval-augmented generation)' },
      { id: 'c', label: 'Static HTML' },
      { id: 'd', label: 'CDN' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'q-ai-agents',
    category: 'AI Agents',
    points: 10,
    prompt: 'What primarily distinguishes an "AI agent" from a single LLM call?',
    options: [
      { id: 'a', label: 'Agents are written in a different programming language' },
      { id: 'b', label: 'Agents can plan, use tools and take multi-step actions toward a goal' },
      { id: 'c', label: 'Agents don’t require any AI model' },
      { id: 'd', label: 'Agents only work with images' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'q-ai-evaluation',
    category: 'AI Evaluation',
    points: 10,
    prompt: 'Why is evaluation especially important for LLM-based applications?',
    options: [
      { id: 'a', label: 'LLMs never produce incorrect or inconsistent outputs' },
      { id: 'b', label: 'Outputs can be inconsistent or wrong, so systematic testing is needed to measure quality and catch regressions' },
      { id: 'c', label: 'Evaluation is only needed once, before launch' },
      { id: 'd', label: 'Evaluation replaces the need for good prompts' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'q-ai-workflow',
    category: 'AI Workflow Integration',
    points: 10,
    prompt: 'What’s the most effective way to introduce AI into an existing product?',
    options: [
      { id: 'a', label: 'Replace the entire product at once with no testing' },
      { id: 'b', label: 'Identify a specific, well-scoped workflow, integrate AI there, and measure impact before expanding' },
      { id: 'c', label: 'Add AI features randomly across the UI' },
      { id: 'd', label: 'Wait until every team member is an AI expert' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'q-cloud',
    category: 'Cloud & Deployment',
    points: 10,
    prompt: 'When deploying an AI-powered service to production, what is a key operational concern beyond model accuracy?',
    options: [
      { id: 'a', label: 'Latency, cost and monitoring under real traffic' },
      { id: 'b', label: 'The color scheme of the admin dashboard' },
      { id: 'c', label: 'Whether the training data was public' },
      { id: 'd', label: 'None — accuracy is the only concern' },
    ],
    correctOptionId: 'a',
  },
  {
    id: 'q-system-design',
    category: 'AI System Design',
    points: 10,
    prompt: 'When designing a system that combines an LLM with your company’s data, what’s a key architectural consideration?',
    options: [
      { id: 'a', label: 'Skipping error handling since LLMs are reliable' },
      { id: 'b', label: 'How the system retrieves, grounds and validates information before and after the LLM call' },
      { id: 'c', label: 'Only the frontend visual design' },
      { id: 'd', label: 'Avoiding any caching' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'q-responsible-ai',
    category: 'Responsible AI',
    points: 10,
    prompt: 'Which practice best reflects responsible AI development?',
    options: [
      { id: 'a', label: 'Ignoring bias and privacy concerns to ship faster' },
      { id: 'b', label: 'Considering fairness, privacy, transparency and potential misuse throughout development' },
      { id: 'c', label: 'Only checking for issues after public complaints' },
      { id: 'd', label: 'Assuming AI outputs are always neutral and unbiased' },
    ],
    correctOptionId: 'b',
  },
];

export const TOTAL_POSSIBLE_POINTS = QUESTIONS.reduce((sum, q) => sum + q.points, 0);

// Fallback recommended target role when the user selects "Not sure yet",
// keyed by the category the user scored highest in.
export const CATEGORY_TO_ROLE: Record<string, string> = {
  Programming: 'AI Application Engineer',
  'AI Fundamentals': 'AI Engineer',
  'LLM Engineering': 'GenAI Engineer',
  RAG: 'GenAI Engineer',
  'AI Agents': 'AI Application Engineer',
  'AI Evaluation': 'AI QA Engineer',
  'AI Workflow Integration': 'AI Business Analyst',
  'Cloud & Deployment': 'MLOps Engineer',
  'AI System Design': 'MLOps Engineer',
  'Responsible AI': 'AI QA Engineer',
};

// Illustrative example score pool used only for the randomized, clearly-labeled
// demo shown when no real user result exists yet.
export const EXAMPLE_SCORE_POOL = [68, 72, 76, 81, 84, 87, 91];
