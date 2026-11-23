'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import RoleCard from '@/app/components/RoleCard';

interface RecommendedProject {
  title: string;
  description: string;
  complexity: 'Intermediate' | 'Advanced';
}

interface CareerPath {
  id: string;
  currentRole: string;
  targetRole: string;
  icon: string;
  currentSkills: string[];
  aiSkillsRequired: string[];
  skillGap: string[];
  recommendedProjects: RecommendedProject[];
  recommendedLearning: string[];
  assessmentFocus: string[];
}

const projectCatalog: Record<string, RecommendedProject> = {
  ragAssistant: { title: 'Enterprise RAG Assistant', description: 'A production-grade Retrieval-Augmented Generation system for enterprise document search and Q&A.', complexity: 'Advanced' },
  researchAgent: { title: 'AI Research Agent', description: 'An autonomous AI agent that uses tools to research, synthesise and report on technical topics.', complexity: 'Advanced' },
  multiAgent: { title: 'Multi-Agent Workflow', description: 'A multi-agent system where specialised agents collaborate through orchestrated tool calling.', complexity: 'Advanced' },
  docIntelligence: { title: 'AI Document Intelligence', description: 'Extract, classify and reason over documents using multimodal AI capabilities.', complexity: 'Intermediate' },
  productionApi: { title: 'Production AI API', description: 'A scalable, monitored AI inference API with proper error handling and observability.', complexity: 'Intermediate' },
};

const careerPaths: CareerPath[] = [
  {
    id: 'swe-to-ai-engineer',
    currentRole: 'Software Engineer',
    targetRole: 'AI Engineer',
    icon: 'CodeBracketIcon',
    currentSkills: ['System Design', 'APIs', 'Data Structures', 'Debugging'],
    aiSkillsRequired: ['LLM Engineering', 'AI Agents', 'RAG', 'AI Evaluation'],
    skillGap: ['AI Agents', 'AI Evaluation'],
    recommendedProjects: [projectCatalog.researchAgent, projectCatalog.ragAssistant],
    recommendedLearning: ['LLM engineering fundamentals', 'Building and evaluating AI agents', 'Retrieval-augmented generation patterns'],
    assessmentFocus: ['LLM Engineering', 'AI Agents', 'RAG', 'AI Evaluation'],
  },
  {
    id: 'python-to-genai-engineer',
    currentRole: 'Python Developer',
    targetRole: 'GenAI Engineer',
    icon: 'CommandLineIcon',
    currentSkills: ['Python', 'APIs', 'Data Structures', 'Testing'],
    aiSkillsRequired: ['LLMs', 'RAG', 'AI Evaluation', 'Prompt Engineering'],
    skillGap: ['RAG', 'AI Evaluation'],
    recommendedProjects: [projectCatalog.ragAssistant, projectCatalog.productionApi],
    recommendedLearning: ['Prompting and context design', 'RAG system architecture', 'AI evaluation methodology'],
    assessmentFocus: ['AI Fundamentals', 'LLM Engineering', 'RAG', 'AI Evaluation'],
  },
  {
    id: 'java-to-ai-app-engineer',
    currentRole: 'Java Developer',
    targetRole: 'AI Application Engineer',
    icon: 'CpuChipIcon',
    currentSkills: ['Java', 'OOP Design', 'APIs', 'System Design'],
    aiSkillsRequired: ['LLM APIs', 'FastAPI', 'AI Deployment', 'RAG'],
    skillGap: ['LLM APIs', 'AI Deployment'],
    recommendedProjects: [projectCatalog.productionApi, projectCatalog.docIntelligence],
    recommendedLearning: ['Working with LLM APIs', 'AI service deployment patterns', 'RAG fundamentals'],
    assessmentFocus: ['LLM Engineering', 'Cloud & Deployment', 'AI System Design', 'RAG'],
  },
  {
    id: 'dotnet-to-ai-app-engineer',
    currentRole: '.NET Developer',
    targetRole: 'AI Application Engineer',
    icon: 'Square3Stack3DIcon',
    currentSkills: ['C# / .NET', 'APIs', 'System Design', 'Cloud'],
    aiSkillsRequired: ['LLM APIs', 'AI Deployment', 'RAG', 'AI Workflow Integration'],
    skillGap: ['LLM APIs', 'AI Workflow Integration'],
    recommendedProjects: [projectCatalog.productionApi, projectCatalog.docIntelligence],
    recommendedLearning: ['Working with LLM APIs', 'Integrating AI into existing applications', 'RAG fundamentals'],
    assessmentFocus: ['LLM Engineering', 'AI Workflow Integration', 'Cloud & Deployment', 'AI System Design'],
  },
  {
    id: 'qa-to-ai-qa-engineer',
    currentRole: 'QA Engineer',
    targetRole: 'AI QA Engineer',
    icon: 'CheckBadgeIcon',
    currentSkills: ['Test Design', 'Automation', 'Debugging', 'QA Process'],
    aiSkillsRequired: ['AI Testing', 'AI Evaluation', 'LLM QA', 'Prompt Testing'],
    skillGap: ['AI Evaluation', 'LLM QA'],
    recommendedProjects: [projectCatalog.researchAgent, projectCatalog.productionApi],
    recommendedLearning: ['AI evaluation methodology', 'Testing LLM-based systems', 'Prompt regression testing'],
    assessmentFocus: ['AI Evaluation', 'AI Fundamentals', 'Responsible AI', 'LLM Engineering'],
  },
  {
    id: 'devops-to-mlops-engineer',
    currentRole: 'DevOps Engineer',
    targetRole: 'MLOps Engineer',
    icon: 'CloudIcon',
    currentSkills: ['CI/CD', 'Cloud Infra', 'Docker', 'Monitoring'],
    aiSkillsRequired: ['ML Pipelines', 'AI Infra', 'Model Monitoring', 'AI Deployment'],
    skillGap: ['ML Pipelines', 'Model Monitoring'],
    recommendedProjects: [projectCatalog.productionApi, projectCatalog.ragAssistant],
    recommendedLearning: ['ML pipeline design', 'Model monitoring and observability', 'AI infrastructure patterns'],
    assessmentFocus: ['Cloud & Deployment', 'AI System Design', 'AI Workflow Integration', 'AI Evaluation'],
  },
  {
    id: 'data-analyst-to-ai-data-analyst',
    currentRole: 'Data Analyst',
    targetRole: 'AI/Data Analyst',
    icon: 'ChartBarIcon',
    currentSkills: ['SQL', 'Data Visualization', 'Reporting', 'Statistics'],
    aiSkillsRequired: ['LLM Analytics', 'AI Automation', 'Data Pipelines', 'Prompt Design'],
    skillGap: ['LLM Analytics', 'AI Automation'],
    recommendedProjects: [projectCatalog.docIntelligence, projectCatalog.productionApi],
    recommendedLearning: ['AI-assisted data analysis', 'Building automated AI workflows', 'Prompt design for analytics'],
    assessmentFocus: ['AI Fundamentals', 'AI Workflow Integration', 'Programming', 'RAG'],
  },
  {
    id: 'ba-to-ai-business-analyst',
    currentRole: 'Business Analyst',
    targetRole: 'AI Business Analyst',
    icon: 'BriefcaseIcon',
    currentSkills: ['Requirements Analysis', 'Stakeholder Management', 'Process Mapping', 'Documentation'],
    aiSkillsRequired: ['AI Workflows', 'AI Automation', 'Prompt Design', 'AI Product Design'],
    skillGap: ['AI Workflows', 'Prompt Design'],
    recommendedProjects: [projectCatalog.docIntelligence, projectCatalog.multiAgent],
    recommendedLearning: ['Designing AI-enabled workflows', 'Prompt design fundamentals', 'Evaluating AI feature fit'],
    assessmentFocus: ['AI Fundamentals', 'AI Workflow Integration', 'Responsible AI', 'AI System Design'],
  },
  {
    id: 'pm-to-ai-product-manager',
    currentRole: 'Product Manager',
    targetRole: 'AI Product Manager',
    icon: 'RocketLaunchIcon',
    currentSkills: ['Product Strategy', 'Roadmapping', 'Stakeholder Management', 'User Research'],
    aiSkillsRequired: ['AI Product Design', 'LLM UX', 'AI Metrics', 'Responsible AI'],
    skillGap: ['LLM UX', 'AI Metrics'],
    recommendedProjects: [projectCatalog.researchAgent, projectCatalog.docIntelligence],
    recommendedLearning: ['Designing AI product experiences', 'Metrics for AI product quality', 'Responsible AI for product teams'],
    assessmentFocus: ['AI Fundamentals', 'AI System Design', 'Responsible AI', 'AI Workflow Integration'],
  },
];

function complexityStyle(complexity: 'Intermediate' | 'Advanced') {
  return complexity === 'Advanced'
    ? { background: 'rgba(99,102,241,0.12)', color: '#A5B4FC', border: '1px solid rgba(99,102,241,0.25)' }
    : { background: 'rgba(16,185,129,0.12)', color: '#6EE7B7', border: '1px solid rgba(16,185,129,0.25)' };
}

export default function CareerPathExplorer() {
  const [selectedId, setSelectedId] = useState(careerPaths[0].id);
  const selectedPath = careerPaths.find((p) => p.id === selectedId) ?? careerPaths[0];

  return (
    <>
      {/* Selector */}
      <section id="explorer" className="py-20 lg:py-24 bg-white" aria-labelledby="explorer-heading">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-label mb-5 inline-flex">Step 1</span>
            <h2
              id="explorer-heading"
              className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] mb-5"
            >
              Select your
              <br />
              <span className="text-gradient-primary">current role.</span>
            </h2>
            <p className="text-base sm:text-lg text-muted leading-relaxed">
              Each card shows the AI role it maps to. Pick yours to see the full path.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" role="group" aria-label="Select your current role">
            {careerPaths.map((path) => {
              const selected = path.id === selectedId;
              return (
                <button
                  key={path.id}
                  type="button"
                  onClick={() => setSelectedId(path.id)}
                  aria-pressed={selected}
                  className="text-left w-full rounded-xl transition-shadow"
                  style={selected ? { boxShadow: '0 0 0 2px var(--accent)', borderRadius: 'calc(var(--radius) + 0.25rem)' } : undefined}
                >
                  <RoleCard roleData={{ role: path.currentRole, direction: path.targetRole, icon: path.icon }} />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detail / Visualization panel */}
      <section className="py-20 lg:py-24 dark-section bg-dot-overlay" aria-labelledby="path-detail-heading">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-4">
            <span className="section-label-dark mb-5 inline-flex">Step 2</span>
          </div>

          <div key={selectedId} className="animate-in-up">
            <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(37,99,235,0.15)' }}
                aria-hidden="true"
              >
                <Icon name={selectedPath.icon} size={22} className="text-blue-300" />
              </div>
              <h2 id="path-detail-heading" className="section-heading-clamp font-800 tracking-tight text-white leading-[1.1] text-center">
                {selectedPath.currentRole}
                <Icon name="ArrowRightIcon" size={28} className="inline-block mx-3 text-blue-300 align-middle" aria-hidden="true" />
                <span className="text-gradient-primary">{selectedPath.targetRole}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-6 items-start">

              {/* Skills column */}
              <div className="dark-card-bg rounded-2xl border p-6 sm:p-7" role="region" aria-label="Skills breakdown">
                <p className="label-text text-slate-400 mb-3">CURRENT SKILLS</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedPath.currentSkills.map((skill) => (
                    <span key={skill} className="skill-chip text-slate-200 border-white/10" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="label-text text-slate-400 mb-3">AI SKILLS REQUIRED</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedPath.aiSkillsRequired.map((skill) => (
                    <span key={skill} className="skill-chip text-blue-300 border-accent/30" style={{ background: 'rgba(37,99,235,0.12)' }}>
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="label-text text-slate-400 mb-3">SKILL GAP</p>
                <div className="flex flex-wrap gap-2">
                  {selectedPath.skillGap.map((gap) => (
                    <span key={gap} className="skill-chip text-warning border-warning/30" style={{ background: 'rgba(245,158,11,0.1)' }}>
                      {gap}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects + Learning column */}
              <div className="flex flex-col gap-6">
                <div className="dark-card-bg rounded-2xl border p-6 sm:p-7" role="region" aria-label="Recommended projects">
                  <p className="label-text text-slate-400 mb-4">RECOMMENDED PROJECTS</p>
                  <div className="space-y-3">
                    {selectedPath.recommendedProjects.map((project) => (
                      <div
                        key={project.title}
                        className="p-3.5 rounded-xl"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <div className="flex items-start justify-between gap-3 mb-1.5">
                          <p className="text-sm font-700 text-white">{project.title}</p>
                          <span className="flex-shrink-0 text-2xs font-700 px-2 py-0.5 rounded-full" style={complexityStyle(project.complexity)}>
                            {project.complexity}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{project.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="dark-card-bg rounded-2xl border p-6 sm:p-7" role="region" aria-label="Recommended learning">
                  <p className="label-text text-slate-400 mb-4">RECOMMENDED LEARNING</p>
                  <ul className="space-y-2.5">
                    {selectedPath.recommendedLearning.map((item, i) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-2xs font-700 text-blue-300"
                          style={{ background: 'rgba(37,99,235,0.15)' }}
                          aria-hidden="true"
                        >
                          {i + 1}
                        </span>
                        <span className="text-sm text-slate-300 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Assessment path */}
            <div className="dark-card-bg rounded-2xl border p-6 sm:p-8 max-w-5xl mx-auto" role="region" aria-label="Assessment path">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div>
                  <p className="label-text text-slate-400 mb-3">ASSESSMENT PATH</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPath.assessmentFocus.map((focus) => (
                      <span key={focus} className="skill-chip text-slate-200 border-white/10" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>
                <a href="/assessment#begin" className="btn-primary flex-shrink-0 justify-center">
                  Check My AI Readiness
                  <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
