export interface InterviewStage {
  stage: string;
  description: string;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  workMode: string;
  experience: string;
  jobType: string;
  technology: string;
  salary?: string;
  aiSpecialization: string;
  overview: string;
  responsibilities: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  aiTechStack: string[];
  interviewProcess: InterviewStage[];
  matchPercentage: number;
}

// Illustrative candidate skill profile — the same example persona used across
// the site's demo AI Readiness Assessment result (Python Developer, 72/100).
export const CANDIDATE_SKILLS: Record<string, number> = {
  Python: 91,
  Cloud: 81,
  'System Design': 76,
  RAG: 74,
  'LLM Engineering': 68,
  'AI Agents': 52,
  'AI Evaluation': 43,
};

export function isMatchedSkill(skill: string): boolean {
  return (CANDIDATE_SKILLS[skill] ?? 0) >= 60;
}

export const jobs: JobListing[] = [
  {
    id: 'ai-application-engineer',
    title: 'AI Application Engineer',
    company: 'Nimbus Systems',
    location: 'London',
    workMode: 'Remote',
    experience: 'Mid-level',
    jobType: 'Full-time',
    technology: 'Python',
    salary: '$120k–150k',
    aiSpecialization: 'LLM Engineering',
    overview:
      'Nimbus Systems is looking for an AI Application Engineer to help embed large language model capability into its core product suite. You will work closely with backend and product teams to ship reliable, production-grade AI features — not just prototypes.',
    responsibilities: [
      'Design and build LLM-powered features using retrieval-augmented generation and structured prompting.',
      'Integrate third-party and open-source LLM APIs into existing backend services.',
      'Own the reliability, latency and cost profile of AI features in production.',
      'Collaborate with product and design on what AI capability should — and should not — do.',
      'Write evaluation suites to catch regressions in model behaviour before release.',
    ],
    requiredSkills: ['Python', 'FastAPI', 'RAG', 'LLM APIs', 'Cloud'],
    preferredSkills: ['Vector Databases', 'AI Evaluation', 'System Design'],
    aiTechStack: ['Python', 'FastAPI', 'LangChain', 'OpenAI API', 'Pinecone', 'Docker'],
    interviewProcess: [
      { stage: 'Application Review', description: 'Initial review of your profile, projects and assessed skills.' },
      { stage: 'Technical Screen', description: 'A conversation covering LLM engineering fundamentals and past project work.' },
      { stage: 'Practical Exercise', description: 'Build a small RAG-based feature against a provided dataset.' },
      { stage: 'Team Interview', description: 'Meet the engineering team and discuss the practical exercise in depth.' },
    ],
    matchPercentage: 87,
  },
  {
    id: 'genai-engineer',
    title: 'GenAI Engineer',
    company: 'Solstice Data Co.',
    location: 'Bengaluru',
    workMode: 'Hybrid',
    experience: 'Senior',
    jobType: 'Full-time',
    technology: 'Python',
    salary: '$150k+',
    aiSpecialization: 'RAG',
    overview:
      'Solstice Data Co. is building GenAI capability into its analytics platform. As a Senior GenAI Engineer, you will lead the design of retrieval and generation systems that turn unstructured data into reliable, explainable answers.',
    responsibilities: [
      'Architect retrieval-augmented generation pipelines across large, messy data sources.',
      'Define and run evaluation methodology for generation quality and factual accuracy.',
      'Mentor engineers building on top of the GenAI platform.',
      'Partner with data engineering on the pipelines that feed retrieval systems.',
      'Represent GenAI capability decisions to non-technical stakeholders.',
    ],
    requiredSkills: ['Python', 'LLM Engineering', 'RAG', 'AI Evaluation'],
    preferredSkills: ['MLOps', 'AI System Design', 'Team Leadership'],
    aiTechStack: ['Python', 'LlamaIndex', 'Vector Databases', 'Cloud', 'Evaluation Frameworks'],
    interviewProcess: [
      { stage: 'Application Review', description: 'Initial review of your profile, projects and assessed skills.' },
      { stage: 'Technical Screen', description: 'Deep dive on RAG architecture and evaluation approach.' },
      { stage: 'Practical Exercise', description: 'Design a retrieval system for a large, evolving dataset.' },
      { stage: 'Team Interview', description: 'Discuss mentoring and cross-team collaboration experience.' },
    ],
    matchPercentage: 78,
  },
  {
    id: 'mlops-engineer',
    title: 'MLOps Engineer',
    company: 'Vertex Cloud Technologies',
    location: 'Singapore',
    workMode: 'Hybrid',
    experience: 'Mid-level',
    jobType: 'Full-time',
    technology: 'Cloud',
    salary: '$120k–150k',
    aiSpecialization: 'MLOps',
    overview:
      'Vertex Cloud Technologies needs an MLOps Engineer to build the infrastructure that keeps AI systems reliable in production — from deployment pipelines to real-time model monitoring.',
    responsibilities: [
      'Build and maintain CI/CD pipelines for machine learning and AI models.',
      'Implement monitoring and alerting for model performance and drift.',
      'Containerise and deploy AI services across cloud infrastructure.',
      'Work with data science and engineering teams to productionise models safely.',
      'Establish rollback and incident response procedures for AI systems.',
    ],
    requiredSkills: ['Docker', 'Cloud', 'ML Pipelines', 'Model Monitoring'],
    preferredSkills: ['Kubernetes', 'AI Evaluation', 'Infrastructure as Code'],
    aiTechStack: ['Docker', 'Kubernetes', 'Cloud', 'Model Monitoring Tools', 'CI/CD Pipelines'],
    interviewProcess: [
      { stage: 'Application Review', description: 'Initial review of your profile, projects and assessed skills.' },
      { stage: 'Technical Screen', description: 'A conversation covering deployment pipelines and infrastructure design.' },
      { stage: 'Practical Exercise', description: 'Diagnose and resolve a model-monitoring scenario in a sandbox environment.' },
      { stage: 'Team Interview', description: 'Meet the platform team and discuss incident-response experience.' },
    ],
    matchPercentage: 34,
  },
  {
    id: 'ai-qa-engineer',
    title: 'AI QA Engineer',
    company: 'Northbridge Analytics',
    location: 'New York',
    workMode: 'On-site',
    experience: 'Mid-level',
    jobType: 'Full-time',
    technology: 'Python',
    salary: '$90k–120k',
    aiSpecialization: 'AI Evaluation',
    overview:
      'Northbridge Analytics is hiring an AI QA Engineer to build rigorous testing and evaluation practices around its AI-powered analytics features — ensuring model outputs are accurate, safe and consistent.',
    responsibilities: [
      'Design test suites for LLM-based features, including regression and edge-case testing.',
      'Build evaluation frameworks to measure output quality and safety.',
      'Partner with engineering to triage and reproduce AI-specific defects.',
      'Track and report on model quality metrics over time.',
      'Advocate for testable, observable AI system design.',
    ],
    requiredSkills: ['Python', 'AI Testing', 'AI Evaluation', 'LLM QA'],
    preferredSkills: ['Python Test Automation', 'AI Fundamentals', 'Responsible AI'],
    aiTechStack: ['Python', 'Evaluation Frameworks', 'Prompt Regression Tools', 'CI/CD Pipelines'],
    interviewProcess: [
      { stage: 'Application Review', description: 'Initial review of your profile, projects and assessed skills.' },
      { stage: 'Technical Screen', description: 'A conversation covering test design for LLM-based systems.' },
      { stage: 'Practical Exercise', description: 'Write an evaluation suite for a sample AI feature.' },
      { stage: 'Team Interview', description: 'Meet the QA and engineering teams to discuss quality practices.' },
    ],
    matchPercentage: 41,
  },
  {
    id: 'ai-agent-developer',
    title: 'AI Agent Developer',
    company: 'Clearwater AI Labs',
    location: 'Remote',
    workMode: 'Remote',
    experience: 'Senior',
    jobType: 'Contract',
    technology: 'Python',
    salary: '$150k+',
    aiSpecialization: 'AI Agents',
    overview:
      'Clearwater AI Labs is looking for a contract AI Agent Developer to design autonomous agents capable of planning, using tools and completing multi-step tasks reliably.',
    responsibilities: [
      'Design and build tool-using AI agents for real-world task automation.',
      'Implement planning, memory and tool-orchestration patterns.',
      'Evaluate agent reliability and failure modes under real workloads.',
      'Iterate quickly on a fixed-term engagement with clear deliverables.',
      'Document agent architecture for internal handover.',
    ],
    requiredSkills: ['Python', 'AI Agents', 'Tool Calling', 'LLMs'],
    preferredSkills: ['Multi-Agent Systems', 'AI Evaluation', 'Prompt Engineering'],
    aiTechStack: ['Python', 'LangGraph', 'Tool-Calling APIs', 'Vector Databases'],
    interviewProcess: [
      { stage: 'Application Review', description: 'Initial review of your profile, projects and assessed skills.' },
      { stage: 'Technical Screen', description: 'A conversation covering agent design and tool-orchestration patterns.' },
      { stage: 'Practical Exercise', description: 'Prototype a small tool-using agent against a provided task.' },
      { stage: 'Final Interview', description: 'Discuss engagement scope, deliverables and handover expectations.' },
    ],
    matchPercentage: 38,
  },
  {
    id: 'ai-product-manager',
    title: 'AI Product Manager',
    company: 'Meridian Software Group',
    location: 'Singapore',
    workMode: 'Hybrid',
    experience: 'Lead',
    jobType: 'Full-time',
    technology: 'Other',
    salary: '$150k+',
    aiSpecialization: 'AI Product',
    overview:
      'Meridian Software Group is hiring a Lead AI Product Manager to define the roadmap for its AI-powered product line — balancing user value, technical feasibility and responsible AI practice.',
    responsibilities: [
      'Define product strategy and roadmap for AI-powered features.',
      'Partner with engineering and design on AI-specific UX patterns.',
      'Define and track metrics for AI product quality and adoption.',
      'Own responsible AI review for new features before launch.',
      'Communicate AI product decisions to leadership and customers.',
    ],
    requiredSkills: ['AI Product Design', 'LLM UX', 'AI Metrics', 'Responsible AI'],
    preferredSkills: ['Stakeholder Management', 'AI Fundamentals', 'Data-Informed Decision Making'],
    aiTechStack: ['Product Analytics Tools', 'AI Evaluation Dashboards', 'Roadmapping Tools'],
    interviewProcess: [
      { stage: 'Application Review', description: 'Initial review of your profile and product experience.' },
      { stage: 'Product Case Study', description: 'Walk through how you would scope and launch an AI-powered feature.' },
      { stage: 'Cross-Functional Panel', description: 'Meet engineering, design and data partners to discuss collaboration style.' },
      { stage: 'Leadership Interview', description: 'Discuss product strategy and responsible AI judgement with leadership.' },
    ],
    matchPercentage: 15,
  },
  {
    id: 'ai-business-analyst',
    title: 'AI Business Analyst',
    company: 'Arclight Technologies',
    location: 'Remote',
    workMode: 'Remote',
    experience: 'Entry-level',
    jobType: 'Full-time',
    technology: 'Other',
    salary: '$90k–120k',
    aiSpecialization: 'AI Product',
    overview:
      'Arclight Technologies is looking for an AI Business Analyst to identify and scope opportunities to embed AI automation into existing business workflows.',
    responsibilities: [
      'Map existing business processes to identify AI automation opportunities.',
      'Write clear requirements and prompts for AI-enabled workflow features.',
      'Work with engineering to validate feasibility of proposed AI workflows.',
      'Measure and report on the impact of deployed AI automation.',
      'Support stakeholder training on new AI-enabled processes.',
    ],
    requiredSkills: ['System Design', 'AI Workflows', 'AI Automation', 'Prompt Design'],
    preferredSkills: ['Process Mapping', 'AI Fundamentals', 'Stakeholder Communication'],
    aiTechStack: ['Workflow Automation Tools', 'Prompt Design Tools', 'Process Mapping Tools'],
    interviewProcess: [
      { stage: 'Application Review', description: 'Initial review of your profile and relevant coursework or experience.' },
      { stage: 'Analyst Interview', description: 'A conversation covering process analysis and requirements writing.' },
      { stage: 'Practical Exercise', description: 'Map a sample business process and propose an AI automation opportunity.' },
      { stage: 'Team Interview', description: 'Meet the business analysis team and discuss working style.' },
    ],
    matchPercentage: 32,
  },
  {
    id: 'ai-data-engineer',
    title: 'AI/Data Engineer',
    company: 'Lumen Digital Ventures',
    location: 'Bengaluru',
    workMode: 'Remote',
    experience: 'Mid-level',
    jobType: 'Full-time',
    technology: 'Python',
    salary: '$120k–150k',
    aiSpecialization: 'RAG',
    overview:
      'Lumen Digital Ventures needs an AI/Data Engineer to build the data pipelines and analytics layer that power its AI-driven reporting products.',
    responsibilities: [
      'Build and maintain data pipelines feeding AI-powered analytics features.',
      'Implement LLM-based analytics and summarisation over structured and unstructured data.',
      'Automate recurring data and AI workflows to reduce manual effort.',
      'Ensure data quality and lineage across AI-facing pipelines.',
      'Collaborate with data science on model-ready datasets.',
    ],
    requiredSkills: ['Python', 'LLM Analytics', 'AI Automation', 'Data Pipelines'],
    preferredSkills: ['SQL', 'Cloud', 'RAG'],
    aiTechStack: ['Python', 'Data Pipeline Tools', 'Cloud', 'LLM Analytics Tools'],
    interviewProcess: [
      { stage: 'Application Review', description: 'Initial review of your profile, projects and assessed skills.' },
      { stage: 'Technical Screen', description: 'A conversation covering data pipeline design and AI-assisted analytics.' },
      { stage: 'Practical Exercise', description: 'Design a pipeline for a sample AI-driven reporting scenario.' },
      { stage: 'Team Interview', description: 'Meet the data engineering team and discuss collaboration with data science.' },
    ],
    matchPercentage: 44,
  },
];

export function getJobBySlug(slug: string): JobListing | undefined {
  return jobs.find((job) => job.id === slug);
}
