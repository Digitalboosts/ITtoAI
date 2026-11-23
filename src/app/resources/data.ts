export interface ArticleSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export type ResourceFormat = 'Guide' | 'Article' | 'Report';

export interface Resource {
  id: string;
  title: string;
  category: string;
  categoryIcon: string;
  format: ResourceFormat;
  excerpt: string;
  readTime: string;
  author: string;
  publishedDate: string; // ISO date
  sections: ArticleSection[];
}

export const categories = [
  'AI Career',
  'Technical AI',
  'Career Transition',
  'AI Jobs',
  'AI Skills',
  'Interview Preparation',
  'Workforce Transformation',
] as const;

export const categoryIcons: Record<string, string> = {
  'AI Career': 'RocketLaunchIcon',
  'Technical AI': 'CpuChipIcon',
  'Career Transition': 'ArrowPathIcon',
  'AI Jobs': 'BriefcaseIcon',
  'AI Skills': 'SparklesIcon',
  'Interview Preparation': 'ChatBubbleLeftRightIcon',
  'Workforce Transformation': 'BuildingOfficeIcon',
};

const AUTHOR = 'ITtoAI Team';

export const resources: Resource[] = [
  {
    id: 'swe-to-ai-engineer',
    title: 'Software Engineer to AI Engineer',
    category: 'Career Transition',
    categoryIcon: categoryIcons['Career Transition'],
    format: 'Guide',
    excerpt: 'What actually changes — and what stays the same — when a software engineer moves into an AI Engineer role. A practical breakdown of the skill gap.',
    readTime: '7 min read',
    author: AUTHOR,
    publishedDate: '2026-01-14',
    sections: [
      {
        id: 'why-this-transition-makes-sense',
        heading: 'Why This Transition Makes Sense',
        paragraphs: [
          "Companies aren't hiring for \"AI experience\" from scratch — they're hiring engineers who can add AI capability to systems they already know how to build. Software engineers already have the harder half of the job: system design, debugging, and shipping reliable software under real constraints.",
          'The AI Engineer role is not a different profession. It is the same engineering discipline, aimed at a new class of systems — ones that involve models, retrieval and probabilistic behaviour instead of purely deterministic logic.',
        ],
      },
      {
        id: 'what-transfers-directly',
        heading: 'What Transfers Directly',
        paragraphs: [
          'System design, API design, testing discipline, debugging complex distributed systems, and production operations all transfer almost unchanged. AI systems still need to be reliable, observable and maintainable — that discipline does not disappear, it becomes more important.',
        ],
      },
      {
        id: 'the-real-skill-gap',
        heading: 'The Real Skill Gap',
        paragraphs: [
          'The gap is narrower than it looks: LLM engineering (working with model APIs, prompting, context management), retrieval-augmented generation, AI agents, and AI evaluation methodology. These are learnable skills, not a different kind of intelligence.',
          'Most software engineers underestimate how much of their existing judgment — about failure modes, edge cases and system boundaries — applies directly to AI systems, which fail in different but equally analysable ways.',
        ],
      },
      {
        id: 'how-to-build-the-missing-skills',
        heading: 'How to Build the Missing Skills',
        paragraphs: [
          'Structured learning helps establish vocabulary, but the skill itself is built by shipping something real: a retrieval system against messy data, an agent that has to handle failure gracefully, an evaluation suite that catches regressions before users do.',
          'Projects that combine at least two of these — for example, a RAG system with a proper evaluation suite — demonstrate more than either skill in isolation.',
        ],
      },
      {
        id: 'what-employers-actually-look-for',
        heading: 'What Employers Actually Look For',
        paragraphs: [
          'Hiring teams for AI Engineer roles consistently look for evidence of production judgment: can this person ship something that works reliably, not just something that works once in a demo. A portfolio with real, evaluated projects speaks louder than a list of completed courses.',
        ],
      },
    ],
  },
  {
    id: 'python-to-genai',
    title: 'Python Developer to GenAI Engineer',
    category: 'Career Transition',
    categoryIcon: categoryIcons['Career Transition'],
    format: 'Guide',
    excerpt: "Python is already most of the job. Here's exactly what to add — LLM engineering, RAG and evaluation — to make the jump to GenAI Engineer.",
    readTime: '6 min read',
    author: AUTHOR,
    publishedDate: '2026-02-03',
    sections: [
      {
        id: 'python-is-already-most-of-the-job',
        heading: 'Python Is Already Most of the Job',
        paragraphs: [
          "GenAI engineering is written almost entirely in Python. If you're already comfortable with the language, its ecosystem, and building APIs, you are not starting from zero — you're extending a foundation you already have.",
        ],
      },
      {
        id: 'what-genai-engineering-adds',
        heading: 'What GenAI Engineering Adds',
        paragraphs: [
          'The core additions are LLM engineering (structured prompting, context design, working with model APIs), retrieval-augmented generation, and evaluation methodology for generated output. None of these require new programming paradigms — they require new judgment about a new kind of system behaviour.',
        ],
      },
      {
        id: 'working-with-non-deterministic-systems',
        heading: 'Working With Non-Deterministic Systems',
        paragraphs: [
          'The single biggest adjustment is designing around outputs that vary. Traditional software testing assumes deterministic results; GenAI systems need evaluation approaches that measure quality and consistency across a range of acceptable outputs, not a single expected answer.',
        ],
      },
      {
        id: 'a-practical-path-to-get-there',
        heading: 'A Practical Path to Get There',
        paragraphs: [
          "Start with a project that forces the core skills together: build a small RAG system over a real dataset, add basic evaluation, and iterate based on where it fails. That single project teaches more than reading about the concepts separately.",
        ],
      },
      {
        id: 'signals-that-matter-in-an-interview',
        heading: 'Signals That Matter in a GenAI Engineer Interview',
        paragraphs: [
          "Interviewers typically probe for how you think about retrieval quality, prompt failure modes, and cost or latency tradeoffs — not just whether you can call an API. Be ready to talk through a real project's design decisions, not just its outcome.",
        ],
      },
    ],
  },
  {
    id: 'rag-career-guide',
    title: 'RAG Career Guide',
    category: 'Technical AI',
    categoryIcon: categoryIcons['Technical AI'],
    format: 'Guide',
    excerpt: "Retrieval-augmented generation is one of the highest-leverage skills in AI engineering right now. Here's how to actually learn it — not just the theory.",
    readTime: '9 min read',
    author: AUTHOR,
    publishedDate: '2026-02-20',
    sections: [
      {
        id: 'what-rag-actually-is',
        heading: 'What RAG Actually Is',
        paragraphs: [
          'Retrieval-augmented generation combines a search step with a generation step: relevant information is retrieved from a knowledge source, then passed to a language model to produce a grounded answer. It exists because language models alone are unreliable sources of specific, current or proprietary information.',
        ],
      },
      {
        id: 'why-its-high-leverage-right-now',
        heading: "Why It's a High-Leverage Skill Right Now",
        paragraphs: [
          'Most production AI features that need to be factually grounded — internal knowledge assistants, document Q&A, customer support tools — depend on RAG in some form. It sits at the intersection of search, data engineering and AI engineering, which makes it broadly useful across roles.',
        ],
      },
      {
        id: 'the-core-skills-to-learn',
        heading: 'The Core Skills to Learn',
        paragraphs: [
          'Chunking strategy (how documents are split for retrieval), embedding and vector search, retrieval quality evaluation, and prompt design for grounded generation are the four pillars. Each has real depth — chunking alone can make or break retrieval quality.',
          'Beyond the mechanics, the harder skill is diagnosing failure: is a bad answer a retrieval problem or a generation problem? That distinction determines what to fix.',
        ],
      },
      {
        id: 'how-to-practice-it-for-real',
        heading: 'How to Practice It for Real',
        paragraphs: [
          'Build a RAG system over a dataset with genuine messiness — inconsistent formatting, duplicate information, outdated content. Clean demo datasets teach the mechanics but hide the real difficulty, which is almost always in the data.',
        ],
      },
      {
        id: 'common-mistakes-to-avoid',
        heading: 'Common Mistakes to Avoid',
        paragraphs: [
          'The most common mistake is treating retrieval as a solved problem and spending all your effort tuning the prompt. In most underperforming RAG systems, the retrieval step — not the generation step — is where quality is actually being lost.',
        ],
      },
    ],
  },
  {
    id: 'ai-agents-career-guide',
    title: 'AI Agents Career Guide',
    category: 'Technical AI',
    categoryIcon: categoryIcons['Technical AI'],
    format: 'Guide',
    excerpt: "Tool-using, multi-step AI agents are reshaping what 'AI engineer' means. A grounded look at the skills behind agent design — and how to build them.",
    readTime: '8 min read',
    author: AUTHOR,
    publishedDate: '2026-03-11',
    sections: [
      {
        id: 'what-ai-agent-actually-means',
        heading: "What 'AI Agent' Actually Means",
        paragraphs: [
          "An AI agent is a system that can plan a sequence of steps, call tools or APIs to gather information or take action, and adjust its plan based on what it learns along the way. It's the difference between a model that answers a question and a system that can complete a task.",
        ],
      },
      {
        id: 'why-this-skill-is-reshaping-the-role',
        heading: 'Why This Skill Is Reshaping the Role',
        paragraphs: [
          'As agent frameworks mature, "AI Engineer" increasingly means designing systems that reason and act, not just systems that respond. This is a distinct skill from prompt engineering or RAG — it involves orchestration, state management and failure recovery.',
        ],
      },
      {
        id: 'the-core-skills-to-learn-agents',
        heading: 'The Core Skills to Learn',
        paragraphs: [
          'Tool-calling patterns, multi-step planning, memory and state management across steps, and — critically — designing for graceful failure when a step in the plan does not work as expected.',
          "Evaluation is also different for agents: you're not just checking a final answer, you're checking whether the agent took a reasonable path to get there.",
        ],
      },
      {
        id: 'how-to-build-the-skill-for-real',
        heading: 'How to Build the Skill for Real',
        paragraphs: [
          'Build a small agent that has to use at least two different tools and handle at least one realistic failure case — a tool that returns unexpected data, or a step that needs to be retried. That combination teaches the parts of agent design that tutorials tend to skip.',
        ],
      },
      {
        id: 'where-companies-are-applying-agents',
        heading: 'Where Companies Are Actually Applying Agents',
        paragraphs: [
          'The most common real-world use cases today are research and synthesis tasks, workflow automation, and internal tooling — not fully autonomous, unsupervised systems. Understanding that distinction helps you scope realistic projects and interview answers.',
        ],
      },
    ],
  },
  {
    id: 'ai-skills-companies-need',
    title: 'AI Skills Companies Need',
    category: 'AI Skills',
    categoryIcon: categoryIcons['AI Skills'],
    format: 'Article',
    excerpt: 'Beyond the buzzwords — a practical look at the AI skills that consistently show up in real technology hiring requirements.',
    readTime: '6 min read',
    author: AUTHOR,
    publishedDate: '2026-04-02',
    sections: [
      {
        id: 'why-job-descriptions-are-misleading',
        heading: 'Why Job Descriptions Are Misleading',
        paragraphs: [
          "Many AI job postings list a long, generic set of buzzwords because the hiring team is still figuring out exactly what the role needs. The result is that the posting is a weak signal — the actual skill bar is usually narrower and more specific than the listing suggests.",
        ],
      },
      {
        id: 'the-skills-that-show-up-again-and-again',
        heading: 'The Skills That Show Up Again and Again',
        paragraphs: [
          'Across a wide range of AI-enabled technology roles, a small set of skills recur consistently: working with LLM APIs, retrieval-augmented generation, evaluation methodology, and the judgment to know when an AI feature is production-ready versus still a prototype.',
        ],
      },
      {
        id: 'skills-that-matter-less-than-youd-think',
        heading: "Skills That Matter Less Than You'd Think",
        paragraphs: [
          'Deep machine learning theory — training models from scratch, understanding transformer internals at a research level — is rarely required for AI application, GenAI or MLOps roles. Most production AI work is closer to systems engineering than research.',
        ],
      },
      {
        id: 'how-to-build-evidence-not-just-claims',
        heading: 'How to Build Evidence, Not Just Claims',
        paragraphs: [
          'The skills above are only useful to an employer if you can demonstrate them. A completed project with a clear write-up of decisions and tradeoffs is far stronger evidence than a list of skills on a resume.',
        ],
      },
    ],
  },
  {
    id: 'ai-interview-preparation',
    title: 'AI Interview Preparation',
    category: 'Interview Preparation',
    categoryIcon: categoryIcons['Interview Preparation'],
    format: 'Guide',
    excerpt: 'How AI technical interviews differ from traditional software interviews, and how to prepare for the parts that actually get tested.',
    readTime: '8 min read',
    author: AUTHOR,
    publishedDate: '2026-04-25',
    sections: [
      {
        id: 'how-ai-interviews-differ',
        heading: 'How AI Interviews Differ From Traditional Software Interviews',
        paragraphs: [
          "Traditional software interviews focus heavily on algorithms and data structures. AI-focused interviews tend to weight system design, evaluation methodology, and judgment about non-deterministic behaviour more heavily — because that's what the job actually requires day to day.",
        ],
      },
      {
        id: 'what-gets-tested',
        heading: 'What Gets Tested',
        paragraphs: [
          'Expect questions about designing a RAG pipeline, reasoning through failure modes in an AI agent, evaluating output quality without a single "correct" answer, and tradeoffs around latency, cost and reliability in production AI systems.',
        ],
      },
      {
        id: 'how-to-prepare',
        heading: 'How to Prepare',
        paragraphs: [
          'Preparing from a completed project is more effective than preparing from theory. Be ready to explain what you built, why you made specific design choices, where it failed initially, and how you diagnosed and fixed it.',
          "Practice explaining tradeoffs out loud — interviewers are usually more interested in your reasoning process than in a single \"correct\" answer.",
        ],
      },
      {
        id: 'what-to-expect-on-the-day',
        heading: 'What to Expect on the Day',
        paragraphs: [
          'Many AI engineering interviews include a practical component — a take-home exercise or live coding session involving a small AI feature — rather than purely theoretical questions. Treat it like a real, if small, engineering task: think about edge cases and failure handling, not just the happy path.',
        ],
      },
    ],
  },
  {
    id: 'ai-portfolio-guide',
    title: 'AI Portfolio Guide',
    category: 'AI Career',
    categoryIcon: categoryIcons['AI Career'],
    format: 'Guide',
    excerpt: "Certificates don't show what you can build. Here's how to put together an AI portfolio that actually demonstrates practical capability.",
    readTime: '7 min read',
    author: AUTHOR,
    publishedDate: '2026-05-18',
    sections: [
      {
        id: 'why-certificates-arent-enough',
        heading: "Why Certificates Aren't Enough",
        paragraphs: [
          "A certificate demonstrates that you completed a course. It doesn't demonstrate that you can build something that works, debug it when it doesn't, or make sound tradeoffs under real constraints. Employers increasingly know the difference.",
        ],
      },
      {
        id: 'what-a-strong-portfolio-contains',
        heading: 'What a Strong AI Portfolio Actually Contains',
        paragraphs: [
          'A strong portfolio has a small number of substantial, well-documented projects rather than many shallow ones. Each project should show the problem, the approach, what did not work initially, and how it was resolved.',
        ],
      },
      {
        id: 'choosing-the-right-projects',
        heading: 'Choosing the Right Projects',
        paragraphs: [
          'Pick projects that map to the specific role you are targeting. A RAG system and an evaluation suite matter more for a GenAI Engineer role; a deployment pipeline and monitoring setup matter more for an MLOps role.',
        ],
      },
      {
        id: 'presenting-your-work',
        heading: 'Presenting Your Work',
        paragraphs: [
          'A short, clear write-up — problem, approach, results, what you would do differently — is more persuasive than a large, undocumented codebase. Reviewers spend limited time per candidate; make the judgment easy for them.',
        ],
      },
    ],
  },
  {
    id: 'reading-ai-job-postings',
    title: 'How to Read an AI Job Posting',
    category: 'AI Jobs',
    categoryIcon: categoryIcons['AI Jobs'],
    format: 'Article',
    excerpt: 'AI job titles and requirements vary wildly between companies. A guide to decoding what a posting is really asking for.',
    readTime: '5 min read',
    author: AUTHOR,
    publishedDate: '2026-06-09',
    sections: [
      {
        id: 'why-ai-job-titles-are-inconsistent',
        heading: 'Why AI Job Titles Are Inconsistent',
        paragraphs: [
          '"AI Engineer," "GenAI Engineer," "Machine Learning Engineer" and "AI Application Engineer" mean different things at different companies, because the field is new enough that job architecture has not standardised. The title alone tells you less than the requirements section.',
        ],
      },
      {
        id: 'decoding-required-vs-preferred-skills',
        heading: 'Decoding Required vs Preferred Skills',
        paragraphs: [
          'Required skills usually reflect what the team needs on day one; preferred skills reflect what would help but is not a blocker. A posting with an unusually long required list is often a sign the team has not fully scoped the role yet.',
        ],
      },
      {
        id: 'reading-between-the-lines-on-seniority',
        heading: 'Reading Between the Lines on Seniority',
        paragraphs: [
          'Look at what the posting asks you to own, not just the job title. A posting that expects you to "define" or "architect" something is a more senior role than one that expects you to "implement" or "support," regardless of the title used.',
        ],
      },
      {
        id: 'red-flags-to-watch-for',
        heading: 'Red Flags to Watch For',
        paragraphs: [
          "Vague postings that list every AI buzzword without a clear picture of the product or system involved are worth extra scrutiny — they can indicate the team itself has not decided what the role is yet.",
        ],
      },
    ],
  },
  {
    id: 'workforce-ai-era',
    title: 'Bringing Your Whole Team Into the AI Era',
    category: 'Workforce Transformation',
    categoryIcon: categoryIcons['Workforce Transformation'],
    format: 'Report',
    excerpt: 'Workforce AI transformation rarely fails because of tooling — it fails because of sequencing. A practical framework for technology leaders.',
    readTime: '9 min read',
    author: AUTHOR,
    publishedDate: '2026-07-01',
    sections: [
      {
        id: 'why-tooling-isnt-the-bottleneck',
        heading: "Why Tooling Isn't the Bottleneck",
        paragraphs: [
          "Most organisations don't fail at AI adoption because they lack access to models or tools — those are now widely available. They fail because they don't have a clear, sequenced plan for which teams build which capability first, and in what order.",
        ],
      },
      {
        id: 'the-sequencing-problem',
        heading: 'The Sequencing Problem',
        paragraphs: [
          'Rolling out AI capability to every team simultaneously tends to produce shallow adoption everywhere rather than real capability anywhere. A small number of teams building deep, evidenced capability first creates internal reference points the rest of the organisation can learn from.',
        ],
      },
      {
        id: 'a-practical-framework-for-rollout',
        heading: 'A Practical Framework for Rollout',
        paragraphs: [
          'Start with role-specific skill assessment to understand where the real gaps are, not assumptions about them. Follow with structured, practical skill-building tied to real work, then verification through completed projects — not just training completion.',
        ],
      },
      {
        id: 'measuring-progress-honestly',
        heading: 'Measuring Progress Honestly',
        paragraphs: [
          'Course completion rates and training hours are weak signals of actual capability. Stronger signals include completed projects, assessed skill scores, and — over time — a measurable shift in what kinds of work a team can take on.',
        ],
      },
    ],
  },
  {
    id: 'what-ai-readiness-means',
    title: 'What "AI Readiness" Actually Means',
    category: 'AI Career',
    categoryIcon: categoryIcons['AI Career'],
    format: 'Article',
    excerpt: "AI readiness isn't a single score — it's a combination of skills, evidence and direction. Here's how to think about your own.",
    readTime: '5 min read',
    author: AUTHOR,
    publishedDate: '2026-07-22',
    sections: [
      {
        id: 'why-a-single-score-isnt-enough',
        heading: "Why a Single Score Isn't Enough",
        paragraphs: [
          "A single number can tell you roughly where you stand, but it can't tell you what to do next. Two people with the same overall score can have very different underlying skill profiles — and very different next steps.",
        ],
      },
      {
        id: 'the-three-components-of-readiness',
        heading: 'The Three Components of Readiness',
        paragraphs: [
          'Practical readiness has three parts: the skills you already have and how strong they are, the specific gaps between your current skills and your target role, and evidence — projects and assessments — that demonstrates the skills you claim to have.',
        ],
      },
      {
        id: 'how-to-think-about-your-own-readiness',
        heading: 'How to Think About Your Own Readiness',
        paragraphs: [
          '"What\'s the smallest gap standing between where I am and the role I want, and what\'s the fastest honest way to close it" is a more useful question than "am I ready." It reframes readiness as a specific, actionable plan rather than a pass or fail judgment.',
        ],
      },
    ],
  },
];

export const featuredId = 'swe-to-ai-engineer';
export const latestIds = ['python-to-genai', 'rag-career-guide', 'ai-agents-career-guide', 'ai-skills-companies-need', 'ai-interview-preparation', 'ai-portfolio-guide'];
export const popularIds = ['rag-career-guide', 'ai-skills-companies-need', 'ai-portfolio-guide', 'workforce-ai-era'];

export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((r) => r.id === slug);
}

export function getRelatedResources(current: Resource, count = 3): Resource[] {
  const sameCategory = resources.filter((r) => r.id !== current.id && r.category === current.category);
  const others = resources.filter((r) => r.id !== current.id && r.category !== current.category);
  return [...sameCategory, ...others].slice(0, count);
}
