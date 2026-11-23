export interface ProgramPhase {
  title: string;
  description: string;
}

export interface ProgramData {
  id: string;
  icon: string;
  currentRole: string;
  targetRole: string;
  duration: string;
  skillAreas: string[];
  practicalProjects: string[];
  assessment: string;
  verification: string;
  careerRelevance: string;
  overview: string;
  fullSkillList: string[];
  outcomes: string[];
  whoItsFor: string[];
  prerequisites: string;
  curriculum: ProgramPhase[];
}

export const programs: ProgramData[] = [
  {
    id: 'swe-to-ai-engineer',
    icon: 'CodeBracketIcon',
    currentRole: 'Software Engineer',
    targetRole: 'AI Engineer',
    duration: '10–12 weeks',
    skillAreas: ['LLMs', 'RAG', 'AI Agents', 'AI Evaluation'],
    practicalProjects: ['AI Research Agent', 'Enterprise RAG Assistant'],
    assessment: 'Role-specific technical assessment covering LLM engineering, agent design and evaluation methodology.',
    verification: 'Verified ITtoAI profile with assessed skills and reviewed project submissions.',
    careerRelevance: 'Maps directly to AI Engineer hiring requirements — tool-using agents, retrieval systems and evaluation rigor.',
    overview: 'For software engineers who already have solid system design, debugging and production experience. This program focuses squarely on the specific skills that separate a general software engineer from an AI Engineer — not a full software engineering curriculum from scratch.',
    fullSkillList: ['LLM Engineering', 'RAG', 'AI Agents', 'AI Evaluation', 'Prompt Engineering', 'Vector Databases', 'AI System Design'],
    outcomes: [
      'Design and build LLM-powered features using retrieval-augmented generation.',
      'Build tool-using AI agents that handle multi-step tasks and realistic failure cases.',
      'Write evaluation suites that catch quality regressions before users do.',
      'Talk through the production tradeoffs — cost, latency, reliability — of AI systems in an interview.',
    ],
    whoItsFor: [
      'Software engineers with production experience who want to move into AI Engineer roles.',
      'Engineers comfortable with system design and debugging complex systems.',
      'Not intended as a first introduction to programming or software engineering fundamentals.',
    ],
    prerequisites: 'Comfortable writing production code and reasoning about system design. No prior AI experience required.',
    curriculum: [
      { title: 'Foundations', description: 'LLM engineering fundamentals — prompting, context design and working with model APIs.' },
      { title: 'Retrieval & Grounding', description: 'RAG architecture, vector search and retrieval quality evaluation.' },
      { title: 'Agents & Orchestration', description: 'Tool-calling patterns, multi-step planning and designing for graceful failure.' },
      { title: 'Evaluation & Production', description: 'AI evaluation methodology, deployment patterns and monitoring for AI systems.' },
      { title: 'Capstone & Verification', description: 'Build a practical project end-to-end and complete the role-specific technical assessment.' },
    ],
  },
  {
    id: 'developer-to-genai-app-engineer',
    icon: 'CommandLineIcon',
    currentRole: 'Developer',
    targetRole: 'GenAI Application Engineer',
    duration: '8–10 weeks',
    skillAreas: ['LLMs', 'RAG', 'FastAPI', 'AI System Design'],
    practicalProjects: ['Production AI API', 'AI Document Intelligence'],
    assessment: 'Technical assessment covering LLM API integration, RAG architecture and production deployment.',
    verification: 'Verified ITtoAI profile with assessed skills and reviewed project submissions.',
    careerRelevance: 'Reflects the day-to-day work of GenAI application teams — shipping AI features into real products.',
    overview: 'For developers who want to add generative AI capability to real applications. The focus is practical: integrating LLM APIs, building retrieval-grounded features, and shipping them reliably — not machine learning theory.',
    fullSkillList: ['LLM Engineering', 'RAG', 'FastAPI', 'AI System Design', 'AI Deployment', 'LLM APIs'],
    outcomes: [
      'Integrate LLM APIs into existing backend services with proper error handling.',
      'Build a retrieval-augmented feature grounded in real, messy data.',
      'Deploy an AI-powered API with attention to cost, latency and reliability.',
      'Explain the tradeoffs behind a GenAI feature’s design in a technical interview.',
    ],
    whoItsFor: [
      'Developers with working experience in Python or similar backend languages.',
      'Engineers who want to move into GenAI application development, not model research.',
    ],
    prerequisites: 'Working experience building and shipping APIs or backend services.',
    curriculum: [
      { title: 'LLM API Integration', description: 'Working with model APIs, structured prompting and context management.' },
      { title: 'RAG for Applications', description: 'Building retrieval-augmented features grounded in real product data.' },
      { title: 'Production Deployment', description: 'Shipping AI-powered services with FastAPI, with attention to cost and latency.' },
      { title: 'Capstone & Verification', description: 'Build a practical project end-to-end and complete the role-specific technical assessment.' },
    ],
  },
  {
    id: 'data-professional-to-ai-engineer',
    icon: 'ChartBarIcon',
    currentRole: 'Data Professional',
    targetRole: 'AI Engineer',
    duration: '10–12 weeks',
    skillAreas: ['LLMs', 'RAG', 'AI Evaluation', 'Cloud'],
    practicalProjects: ['AI Document Intelligence', 'Enterprise RAG Assistant'],
    assessment: 'Technical assessment covering applied AI, data pipelines for RAG and evaluation methodology.',
    verification: 'Verified ITtoAI profile with assessed skills and reviewed project submissions.',
    careerRelevance: 'Builds on existing data expertise to meet AI engineering requirements around retrieval and evaluation.',
    overview: 'For data analysts and data engineers who already understand data pipelines and want to move into AI engineering. The program builds directly on that data foundation, extending it toward retrieval, applied AI and evaluation.',
    fullSkillList: ['LLM Engineering', 'RAG', 'AI Evaluation', 'Cloud', 'Data Pipelines', 'AI Fundamentals'],
    outcomes: [
      'Build data pipelines that feed retrieval-augmented AI systems reliably.',
      'Apply core LLM engineering concepts to existing data workflows.',
      'Design an evaluation approach for AI system output quality.',
      'Talk through data-to-AI pipeline decisions in a technical interview.',
    ],
    whoItsFor: [
      'Data analysts and data engineers with existing SQL, data pipeline or analytics experience.',
      'Professionals looking to move from data-focused roles into applied AI engineering.',
    ],
    prerequisites: 'Working experience with data pipelines, SQL or applied data analysis.',
    curriculum: [
      { title: 'AI Fundamentals for Data Professionals', description: 'Core AI/ML concepts and terminology, framed around existing data experience.' },
      { title: 'Data Pipelines for RAG', description: 'Building and maintaining the data pipelines that feed retrieval systems.' },
      { title: 'Applied AI & Evaluation', description: 'Applying LLM engineering concepts to data workflows, with evaluation methodology.' },
      { title: 'Capstone & Verification', description: 'Build a practical project end-to-end and complete the role-specific technical assessment.' },
    ],
  },
  {
    id: 'devops-to-mlops',
    icon: 'CloudIcon',
    currentRole: 'DevOps',
    targetRole: 'MLOps / AI Infrastructure',
    duration: '8–10 weeks',
    skillAreas: ['Docker', 'Cloud', 'AI System Design', 'AI Evaluation'],
    practicalProjects: ['Production AI API', 'Enterprise RAG Assistant'],
    assessment: 'Technical assessment covering AI deployment, infrastructure design and system monitoring.',
    verification: 'Verified ITtoAI profile with assessed skills and reviewed project submissions.',
    careerRelevance: 'Aligned with MLOps and AI infrastructure hiring requirements at technology companies.',
    overview: 'For DevOps engineers who already understand CI/CD, containerisation and cloud infrastructure. This program extends that foundation to the specific demands of deploying and operating AI systems in production.',
    fullSkillList: ['Docker', 'Cloud', 'AI System Design', 'AI Evaluation', 'ML Pipelines', 'Model Monitoring'],
    outcomes: [
      'Build CI/CD pipelines for AI and machine learning models.',
      'Implement monitoring and alerting for model performance and drift.',
      'Deploy AI services with attention to reliability and rollback procedures.',
      'Talk through AI infrastructure design tradeoffs in a technical interview.',
    ],
    whoItsFor: [
      'DevOps and platform engineers with existing CI/CD and cloud infrastructure experience.',
      'Engineers moving toward MLOps or AI infrastructure specialisation.',
    ],
    prerequisites: 'Working experience with CI/CD pipelines, containerisation and cloud infrastructure.',
    curriculum: [
      { title: 'AI Deployment Fundamentals', description: 'Containerising and deploying AI services, with attention to cost and latency.' },
      { title: 'Infrastructure & Monitoring', description: 'Building ML pipelines and implementing monitoring for model performance and drift.' },
      { title: 'Reliability & Evaluation', description: 'Rollback and incident response procedures for AI systems, and evaluation methodology.' },
      { title: 'Capstone & Verification', description: 'Build a practical project end-to-end and complete the role-specific technical assessment.' },
    ],
  },
];

export function getProgramBySlug(slug: string): ProgramData | undefined {
  return programs.find((program) => program.id === slug);
}
