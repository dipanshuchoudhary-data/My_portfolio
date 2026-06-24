export type Experience = {
  role: string;
  duration: string;
  organization: string;
  description: string;
};

export type Project = {
  title: string;
  summary: string;
  tech: string[];
  link: string;
};

export const profile = {
  name: "Dipanshu Choudhary",
  title: "AI-focused Full Stack Engineer",
  subtitle: "Generative AI | Agentic Systems | Scalable Backend Architectures",
  tagline:
    "Building production-grade LLM platforms, multi-agent pipelines, and backend-driven generative systems.",
  location: "Delhi, India",
  email: "DipanshuChoudhary109@gmail.com",
  phone: "+91 7011860328",
  github: "https://github.com/dipanshuchoudhary-data",
  linkedin: "https://www.linkedin.com/in/dipanshu-choudhary-981378328",
  resume: "/Dipanshu_Choudhary_Resume_clean.pdf"
};

export const about = [
  "AI-focused full stack engineer specializing in generative AI and agentic systems.",
  "Hands-on experience building scalable LLM-powered platforms, multi-agent pipelines, and production backend architectures.",
  "Delivered systems involving orchestration, real-time workflows, and automated evaluation frameworks."
];

export const strengths = [
  "Multi-agent orchestration and intelligent decision pipelines",
  "LLM evaluation, benchmarking, and iterative system refinement",
  "Scalable AI pipelines and high-throughput backend services",
  "RAG, semantic search, and production-grade GenAI architecture"
];

export const experiences: Experience[] = [
  {
    role: "Junior Full Stack AI Engineer Intern",
    duration: "May 2026 - Present",
    organization: "Namekart",
    description:
      "Engineering production-grade multi-agent systems for domain acquisition and intelligent shortlisting, with LLM evaluation pipelines and scalable backend services for high-throughput workloads."
  },
  {
    role: "Freelancer - AI Product Engineer",
    duration: "Mar 2026 - Apr 2026",
    organization: "TZURONI LTD.",
    description:
      "Built a production-grade AI market intelligence platform using RAG pipelines, modular AI agents, and scalable data pipelines for ingestion, semantic search, and LLM-powered conversational analytics."
  }
];

export const education = {
  degree: "Bachelor of Computer Applications (BCA)",
  school: "Amity University, Noida",
  duration: "2024 - 2027 (Expected)",
  cgpa: "8.7/10",
  highlights: [
    "Data Structures & Algorithms and System Design",
    "OOP, DBMS, Operating Systems, and Computer Networks",
    "AI, ML, and full-stack software engineering",
    "Generative AI and agentic systems coursework"
  ]
};

export const skills = {
  languages: ["Python", "Java", "JavaScript", "TypeScript", "Rust"],
  coreCs: [
    "Data Structures & Algorithms",
    "System Design",
    "OOP",
    "DBMS",
    "Operating Systems",
    "Computer Networks"
  ],
  aiMl: [
    "Deep Learning",
    "Transformers",
    "Generative AI",
    "NLP",
    "Prompt Engineering",
    "Advanced RAG",
    "Agentic AI"
  ],
  frameworks: ["FastAPI", "LangChain", "LangGraph", "CrewAI", "TensorFlow", "PyTorch"],
  llmEvaluation: ["LangSmith", "Langfuse", "Ragas", "DeepEval"],
  databases: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  cloudDevOps: ["Docker", "Kubernetes", "GCP", "Git", "GitHub"]
};

export const projects: Project[] = [
  {
    title: "Quizzer",
    summary:
      "AI-powered secure assessment platform with async exam generation from multi-format inputs, Redis-backed integrity controls, and automated LLM grading at ~85% accuracy.",
    tech: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Celery",
      "LangChain",
      "LangGraph",
      "Docker"
    ],
    link: "https://github.com/dipanshuchoudhary-data/Quizzer"
  },
  {
    title: "Maantra",
    summary:
      "Multi-channel AI agent platform with unified task coordination, persistent memory, and cross-platform identity management across Slack, Telegram, and WhatsApp.",
    tech: ["Python", "FastAPI", "Redis", "PostgreSQL", "LangChain", "LangGraph", "Docker"],
    link: "https://github.com/dipanshuchoudhary-data/Maantra-1.0"
  },
  {
    title: "MediSure",
    summary:
      "AI-powered medical prediction SaaS with user authentication, secure patient data handling, voice-based symptom analysis, and real-time speech synthesis.",
    tech: ["Python", "FastAPI", "Gradio", "gTTS", "Authentication"],
    link: "https://github.com/dipanshuchoudhary-data/Medisure"
  },
  {
    title: "AI Essay Mentor",
    summary:
      "LLM-based essay evaluation system generating scores, summaries, and improved drafts through structured multi-step workflows.",
    tech: ["Python", "LangGraph", "LangChain", "Streamlit", "Pydantic"],
    link: "https://github.com/dipanshuchoudhary-data/AI-EssayMentor"
  }
];
