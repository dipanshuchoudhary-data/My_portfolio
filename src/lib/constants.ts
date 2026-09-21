import type { Achievement, ExperienceEntry, PersonalInfo, Project, SkillCategory } from "@/types";

export const siteUrl = "https://portfolio.dipanshuchoudhary109.workers.dev";

export const personalInfo: PersonalInfo = {
  name: "Dipanshu Choudhary",
  title: "Software Engineer",
  subtitle: "AI/ML and Backend Systems",
  bio: "Software Engineer specializing in AI/ML and backend systems, with hands-on experience building production applications spanning LLMs, RAG, agentic workflows, real-time APIs, and asynchronous processing. Strong foundation in Python, Java, FastAPI, React/Next.js, PostgreSQL, Redis, and system design, with practical experience in security, evaluation, reliability, and scalable application architecture. Interned onsite as a Full Stack AI Engineer at Namekart and worked remotely as a Freelancer, AI Product Engineer at TZURONI LTD. AI INNOVATION 2026 Winner (Microsoft × Kyndryl) and Clean Coder 2026 (Google).",
  email: "DipanshuChoudhary109@gmail.com",
  location: "Delhi, India",
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/dipanshuchoudhary-data",
      icon: "github",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/dippuch7011",
      icon: "linkedin",
    },
    {
      name: "Email",
      url: "mailto:DipanshuChoudhary109@gmail.com",
      icon: "mail",
    },
  ],
  stats: [
    { label: "Projects Built", value: "7" },
    { label: "Featured Systems", value: "4" },
    { label: "Languages", value: "5" },
    { label: "Awards", value: "2" },
  ],
};

export const projects: Project[] = [
  {
    id: "quizzer",
    title: "Quizzer",
    description: "Authoring and the exam never share a session.",
    built: "Separate creator and attempt runtimes, with QUE for assisted writing.",
    technologies: ["Next.js", "FastAPI", "Redis", "LangGraph"],
    image: "/images/quizzer.png",
    demoUrl: "https://quizzer-two-sandy.vercel.app/login",
    hasDemo: true,
    featured: true,
  },
  {
    id: "liferoute",
    title: "Life Route AI",
    description: "One live timeline for an emergency.",
    built: "Patient, ambulance, hospital, and clinician on one event stream.",
    technologies: ["FastAPI", "PostgreSQL", "Redis", "LangGraph"],
    image: "/images/liferoute.png",
    githubUrl: "https://github.com/dipanshuchoudhary-data/LifeRouteAI",
    hasDemo: false,
    featured: true,
  },
  {
    id: "maantra",
    title: "Maantra",
    description: "One agent across Slack, Telegram, and WhatsApp.",
    built: "Memory stays in the core. Each channel is only an adapter.",
    technologies: ["Python", "FastAPI", "LangGraph", "Redis"],
    image: "/images/maantra.png",
    githubUrl: "https://github.com/dipanshuchoudhary-data/Maantra-2.0",
    demoUrl: "https://maantrasetup.netlify.app/",
    hasDemo: true,
    featured: true,
  },
  {
    id: "memograph",
    title: "MemoGraph",
    description: "Research that leaves linked notes, not a chat log.",
    built: "An agent writes and revises a Markdown library.",
    technologies: ["Python", "LangGraph", "FastAPI", "React"],
    image: "/images/memograph.png",
    githubUrl: "https://github.com/dipanshuchoudhary-data/MemoGraph",
    demoUrl: "https://memographs.netlify.app/",
    hasDemo: true,
    featured: true,
  },
];

export const experience: ExperienceEntry[] = [
  {
    period: "May 2026 — July 2026",
    role: "Full Stack AI Engineer Intern",
    org: "Namekart",
    place: "Onsite",
    points: [
      "Production domain-evaluation pipeline processing about 150,000 domains a day.",
      "Surfaced about 2,000 Strong domains, with a cap near 3,000.",
      "Evaluation and benchmarking with CBFR automation and L0/L1 classification.",
      "Parallel workflows for startups, brand domains, and founder contacts.",
    ],
  },
  {
    period: "Mar 2026 — Apr 2026",
    role: "Freelancer, AI Product Engineer",
    org: "TZURONI LTD.",
    place: "Remote",
    points: [
      "Market-intelligence platform built from SEC filings and social data.",
      "Ingestion, preprocessing, semantic search, and vector retrieval.",
      "Sentiment analysis and context-aware LLM insights.",
      "Conversational analytics, orchestration, fallbacks, and RAG.",
    ],
  },
];

export const achievements: Achievement[] = [
  {
    title: "AI Innovation 2026",
    org: "Microsoft × Kyndryl",
    detail: "Winner",
  },
  {
    title: "Clean Coder 2026",
    org: "Google",
    detail: "Award",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Programming Languages",
    description: "The languages I use to solve problems and build systems.",
    skills: [
      { name: "Python" },
      { name: "Java" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Go" },
    ],
  },
  {
    name: "AI / ML",
    description: "Models and the systems that learn from them.",
    skills: [
      { name: "PyTorch" },
      { name: "TensorFlow" },
      { name: "Transformers" },
      { name: "Deep Learning" },
      { name: "NLP" },
    ],
  },
  {
    name: "LLM & Agentic AI",
    description: "Graphs, retrieval, and agents inside the product.",
    skills: [
      { name: "LangGraph" },
      { name: "LangChain" },
      { name: "RAG" },
      { name: "Agentic AI" },
      { name: "Prompt Engineering" },
      { name: "LangSmith" },
      { name: "CrewAI" },
    ],
  },
  {
    name: "Backend & Full Stack",
    description: "Services and APIs that keep a product live.",
    skills: [
      { name: "FastAPI" },
      { name: "React" },
      { name: "Next.js" },
      { name: "PostgreSQL" },
      { name: "Redis" },
      { name: "REST APIs" },
      { name: "WebSockets" },
    ],
  },
  {
    name: "Frontend",
    description: "Interfaces with the same care as the systems behind them.",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
    ],
  },
  {
    name: "Infrastructure & Tools",
    description: "What ships the work and keeps it running.",
    skills: [
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "GCP" },
      { name: "Git" },
      { name: "GitHub" },
    ],
  },
];

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export const resumeHref = "/Dipanshu%20Choudhary%20-%20Resume_meta.pdf";
