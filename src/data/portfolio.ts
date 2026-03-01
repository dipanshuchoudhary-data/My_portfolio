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
  title: "AI/ML Engineer",
  subtitle: "Agentic & Generative AI | LLM Workflows | Scalable Backend Systems",
  tagline: "Building production-grade AI agents and backend-driven generative systems.",
  location: "Delhi, India",
  email: "DipanshuChoudhary109@gmail.com",
  phone: "+91-7011860328",
  github: "https://github.com/dipanshuchoudhary-data",
  linkedin: "https://www.linkedin.com/in/dipanshu-choudhary-981378328",
  resume: "/Dipanshu_Choudhary_Resume_Gen_AI.pdf"
};

export const about = [
  "AI/ML Engineer specializing in agentic AI and autonomous multi-agent systems.",
  "Experienced in designing scalable, backend-driven LLM architectures with automation pipelines and real-time decision workflows.",
  "Focused on production-ready generative AI, deep learning, NLP, and intelligent orchestration systems."
];

export const strengths = [
  "Autonomous AI agents and multi-agent orchestration",
  "Scalable backend-driven LLM workflows",
  "Production-grade GenAI system architecture",
  "Deep learning + modern NLP implementation"
];

export const experiences: Experience[] = [
  {
    role: "AI Automation & Agent Developer",
    duration: "2025 - Present",
    organization: "Independent / Client Brands",
    description:
      "Designed and deployed AI agents for two brands, automating business workflows and reducing manual operations."
  },
  {
    role: "Research Assistant",
    duration: "2025 - Present",
    organization: "Faculty Collaboration",
    description:
      "Collaborating with faculty on AI/ML projects focused on deep learning and generative AI applications."
  },
  {
    role: "Open-Source Contributor",
    duration: "2025 - Present",
    organization: "Hugging Face (Transformers)",
    description:
      "Contributing to the Transformers ecosystem and exploring advanced implementations in modern NLP systems."
  }
];

export const education = {
  degree: "Bachelor of Computer Applications (BCA)",
  school: "Amity University, Noida",
  duration: "2024 - 2027",
  cgpa: "8.5/10",
  highlights: [
    "Core Computer Science foundations",
    "Data structures and problem solving",
    "Database and backend fundamentals",
    "AI, ML, and software engineering"
  ]
};

export const skills = {
  languages: ["Python", "Java", "TypeScript", "JavaScript"],
  frameworks: [
    "React",
    "LangChain",
    "LangGraph",
    "LangSmith",
    "CrewAI",
    "MCP",
    "TensorFlow",
    "PyTorch"
  ],
  tools: ["FastAPI", "REST APIs", "MLflow", "Docker", "Kafka", "Git", "GitHub", "CI/CD"],
  databases: ["PostgreSQL", "MySQL", "Redis", "Vector Databases"]
};

export const projects: Project[] = [
  {
    title: "Quizzer",
    summary:
      "Scalable AI-powered secure assessment platform with backend-controlled exams, real-time integrity tracking, and automated LLM-based grading.",
    tech: ["Python", "FastAPI", "LLMs", "PostgreSQL", "React"],
    link: "https://github.com/dipanshuchoudhary-data"
  },
  {
    title: "Autonomous Multi-Platform AI Agent",
    summary:
      "Python-based autonomous LLM agent executing user-defined tasks across chat platforms using dynamic tool orchestration and persistent memory.",
    tech: ["Python", "LLMs", "LangChain", "CrewAI", "Agentic AI"],
    link: "https://github.com/dipanshuchoudhary-data"
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
