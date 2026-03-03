import type { FormEvent, MouseEvent as ReactMouseEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import profilePhoto from "../WhatsApp Image 2026-02-26 at 12.38.08 PM.jpeg";

type Ripple = {
  id: number;
  x: number;
  y: number;
  size: number;
};

type SkillCategory = {
  title: string;
  icon: string;
  items: string[];
};

type ExperienceItem = {
  title: string;
  description: string;
  highlights: string[];
};

type Project = {
  number: string;
  title: string;
  oneLine: string;
  tech: string[];
  highlights: string[];
  github: string;
  demo: string;
  gradient: string;
  image?: string;
};

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactErrors = Partial<Record<keyof ContactForm, string>>;

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" }
];

const skillCategories: SkillCategory[] = [
  { title: "Languages", icon: "LG", items: ["Python", "Java", "TypeScript", "JavaScript"] },
  {
    title: "AI / Machine Learning",
    icon: "ML",
    items: ["Deep Learning", "Transformers", "Generative AI", "LLMs", "Fine-Tuning", "NLP", "Prompt Engineering"]
  },
  {
    title: "Frameworks & AI Tooling",
    icon: "FW",
    items: ["React", "LangChain", "LangGraph", "LangSmith", "CrewAI", "MCP", "TensorFlow", "PyTorch"]
  },
  { title: "Backend & Deployment", icon: "BD", items: ["FastAPI", "REST APIs", "MLflow", "Docker", "Kafka"] },
  { title: "Databases", icon: "DB", items: ["PostgreSQL", "MySQL", "Redis", "Vector Databases"] },
  { title: "Computer Vision", icon: "CV", items: ["OpenCV", "MediaPipe", "PIL"] },
  { title: "Cloud & DevOps", icon: "CD", items: ["GCP", "AWS", "GCS", "CI/CD"] },
  { title: "Version Control", icon: "VC", items: ["Git", "GitHub"] }
];

const experiences: ExperienceItem[] = [
  {
    title: "AI Automation & Agent Developer",
    description:
      "Designed and deployed AI agents for two brands, automating business workflows and reducing manual operations.",
    highlights: ["Built autonomous task pipelines", "Integrated LLM-based decision systems"]
  },
  {
    title: "Research Assistant",
    description:
      "Collaborating with faculty on AI/ML projects with focus on deep learning and generative AI applications.",
    highlights: ["Developed experimental model workflows", "Supported evaluation and iteration pipelines"]
  },
  {
    title: "Open-Source Contributor (Hugging Face)",
    description: "Contributing to Transformers ecosystem and exploring advanced NLP implementations.",
    highlights: ["Hands-on ecosystem contribution", "Applied practical transformer integrations"]
  }
];

const projects: Project[] = [
  {
    number: "Project 1",
    title: "Quizzer - AI Secure Assessment Platform",
    oneLine: "AI-powered assessment platform with secure workflows and intelligent grading for high-integrity exams.",
    tech: ["Python", "FastAPI", "TypeScript", "React", "PostgreSQL", "Alembic"],
    highlights: ["Integrity scoring workflows", "Automated LLM-assisted evaluation", "Live analytics for instructors"],
    github: "https://github.com/dipanshuchoudhary-data/Quizzer",
    demo: "#",
    gradient: "linear-gradient(140deg, rgba(38, 82, 126, 0.55), rgba(35, 52, 94, 0.45), rgba(20, 31, 58, 0.6))",
    image: "public\\quizzer.png"
  },
  {
    number: "Project 2",
    title: "Autonomous Multi-Platform AI Agent",
    oneLine: "Autonomous agent system built for cross-platform execution with memory-aware task orchestration.",
    tech:["Node.js", "TypeScript", "Slack Bolt", "LLMs", "RAG", "ChromaDB", "mem0.ai", "MCP"],
    highlights: ["Planner and executor multi-agent flow", "Persistent contextual memory", "Dynamic tool routing"],
    github: "https://github.com/dipanshuchoudhary-data/Slack-Bot",
    demo: "#",
    gradient: "linear-gradient(145deg, rgba(29, 71, 69, 0.55), rgba(35, 56, 90, 0.48), rgba(19, 33, 54, 0.58))",
    image: "public\\Noor.png"
  },
  {
    number: "Project 3",
    title: "MediSure - AI Medical SaaS",
    oneLine: "Medical AI SaaS for symptom intelligence, prediction support, and secure user interaction workflows.",
    tech: ["Python","gTTs","Streamlit UI"],
    highlights: ["Voice-enabled consultation flow", "Secure session-based architecture", "Low-latency model responses"],
    github: "https://github.com/dipanshuchoudhary-data/Medisure",
    demo: "#",
    gradient: "linear-gradient(145deg, rgba(44, 83, 112, 0.52), rgba(48, 59, 111, 0.46), rgba(23, 34, 63, 0.62))"
  },
  {
    number: "Project 4",
    title: "AI Essay Mentor",
    oneLine: "Structured LLM workflow that evaluates essays and generates high-quality improvement guidance.",
    tech: ["Python", "LangChain", "LangGraph", "LangSmith", "Pydantic", "PostgreSQL", "React", "FastAPI"],
    highlights: ["Criteria-based scoring pipeline", "Rewrite-focused feedback system", "Traceable stage-wise evaluation"],
    github: "https://github.com/dipanshuchoudhary-data/AI-EssayMentor",
    demo: "#",
    gradient: "linear-gradient(145deg, rgba(48, 72, 120, 0.54), rgba(44, 48, 97, 0.5), rgba(22, 30, 60, 0.64))"
  },
  {
    number: "Project 5",
    title: "Next AI Product - Placeholder",
    oneLine: "Upcoming AI platform focused on production reliability, observability, and enterprise workflow automation.",
    tech: ["TBD"],
    highlights: ["Production-ready system design", "Scalable orchestration roadmap", "Deployment-first architecture"],
    github: "#",
    demo: "#",
    gradient: "linear-gradient(145deg, rgba(34, 66, 92, 0.55), rgba(39, 52, 89, 0.5), rgba(17, 27, 49, 0.64))"
  },
  {
    number: "Project 6",
    title: "Next GenAI System - Placeholder",
    oneLine: "Upcoming GenAI system for intelligent retrieval, reasoning pipelines, and contextual decision support.",
    tech: ["TBD"],
    highlights: ["Retrieval and reasoning backbone", "Context fidelity focus", "Evaluation-driven engineering"],
    github: "#",
    demo: "#",
    gradient: "linear-gradient(145deg, rgba(31, 58, 86, 0.56), rgba(37, 47, 84, 0.52), rgba(17, 25, 47, 0.66))"
  }
];

const reveal = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6 } }
};

function RippleButton({
  href,
  label,
  className,
  external,
  download,
  onClick
}: {
  href: string;
  label: string;
  className?: string;
  external?: boolean;
  download?: boolean;
  onClick?: () => void;
}) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const id = Date.now();

    setRipples((prev) => [...prev, { id, x, y, size }]);
    if (onClick) onClick();
  };

  return (
    <motion.a
      href={href}
      className={`btn-ripple ${className || ""}`}
      onClick={handleClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      download={download}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      <span>{label}</span>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple"
          style={{ width: ripple.size, height: ripple.size, left: ripple.x, top: ripple.y }}
          onAnimationEnd={() => setRipples((prev) => prev.filter((item) => item.id !== ripple.id))}
        />
      ))}
    </motion.a>
  );
}

function HeroPhoto() {
  const photoRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const particles = useMemo(() => Array.from({ length: 8 }, (_, idx) => idx), []);

  const onMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const rect = photoRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    setTilt({ x: (0.5 - py) * 12, y: (px - 0.5) * 14 });
  };

  return (
    <motion.div
      className="hero-photo-shell"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15 }}
    >
      <div className="hero-photo-halo" />
      <div className="hero-photo-pulse" />
      <motion.div
        className="hero-photo-ring"
        ref={photoRef}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{ transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
        whileHover={{ scale: 1.03 }}
      >
        <div className="hero-photo-frame">
          <img src={profilePhoto} alt="Dipanshu Choudhary" loading="eager" />
          <span className="hero-photo-shimmer" />
          <span className="hero-photo-sweep" />
        </div>
      </motion.div>
      {particles.map((particle) => (
        <span key={particle} className={`photo-particle particle-${particle + 1}`} />
      ))}
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const visualRef = useRef<HTMLDivElement | null>(null);

  const onMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const rect = visualRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    setTilt({ x: (0.5 - py) * 6, y: (px - 0.5) * 8 });
  };

  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <motion.div
        className="project-visual-wrap"
        ref={visualRef}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        <div className="project-visual" style={{ background: project.gradient }}>
          {project.image && <img className="project-visual-image" src={project.image} alt={`${project.title} preview`} loading="lazy" />}
          <span className="project-chip">{project.number}</span>
          <span className="project-glass-layer" />
          <span className="project-sweep" />
          <span className="project-particle p1" />
          <span className="project-particle p2" />
          <span className="project-particle p3" />
        </div>
      </motion.div>

      <div className="project-body">
        <h3>{project.title}</h3>
        <p className="project-line">{project.oneLine}</p>

        <div className="tech-row">
          {project.tech.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <ul className="project-highlights">
          {project.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="card-links">
          <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={project.demo} target="_blank" rel="noreferrer">Demo</a>
        </div>
      </div>
    </motion.article>
  );
}

function validateForm(form: ContactForm): ContactErrors {
  const errors: ContactErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  if (form.email && !emailRegex.test(form.email)) errors.email = "Enter a valid email";
  if (!form.subject.trim()) errors.subject = "Subject is required";
  if (!form.message.trim()) errors.message = "Message is required";

  return errors;
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: -120, y: -120 });
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [success, setSuccess] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 700], [0, 110]);

  useEffect(() => {
    const onMove = (event: MouseEvent) => setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.querySelector(id);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="app-shell">
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
      <motion.div
        className="cursor-glow"
        animate={{ x: cursor.x - 170, y: cursor.y - 170 }}
        transition={{ type: "spring", damping: 28, stiffness: 180, mass: 0.25 }}
      />

      <div className="ai-bg">
        <div className="ai-grid" />
        <div className="blob blob-a" />
        <div className="blob blob-b" />
        <div className="blob blob-c" />
      </div>

      <nav className="navbar">
        <div className="container nav-inner">
          <button type="button" className="nav-logo" onClick={() => scrollToSection("#home")}>Dipanshu C.</button>
          <ul className="nav-menu">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button type="button" className="nav-link" onClick={() => scrollToSection(link.href)}>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="mobile-toggle" onClick={() => setMobileOpen((prev) => !prev)}>Menu</button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {navLinks.map((link) => (
                <button key={link.href} type="button" onClick={() => scrollToSection(link.href)}>
                  {link.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        <section id="home" className="hero-section">
          <motion.div className="hero-layer" style={{ y: heroParallax }} />
          <div className="container hero-grid">
            <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
              <div className="hero-name-stack">
                <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                  Dipanshu
                </motion.h1>
                <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                  Choudhary
                </motion.h1>
              </div>

              <h2 className="hero-title">AI/ML Engineer | Agentic & Generative AI | LLM Workflows | Scalable Backend Systems</h2>
              <p className="hero-subtitle">
                I design autonomous AI systems, scalable backend architectures, and production-grade generative AI
                applications that solve complex real-world problems.
              </p>

              <div className="hero-cta">
                <RippleButton href="#projects" label="View Projects" className="btn-primary" onClick={() => scrollToSection("#projects")} />
                <RippleButton href="/Dipanshu_Choudhary_Resume_Gen_AI.pdf" label="Download Resume" className="btn-ghost" download />
                <RippleButton href="https://github.com/dipanshuchoudhary-data" label="GitHub" className="btn-ghost" external />
                <RippleButton href="https://www.linkedin.com/in/dipanshu-choudhary-981378328" label="LinkedIn" className="btn-ghost" external />
                <RippleButton href="#contact" label="Contact" className="btn-ghost" onClick={() => scrollToSection("#contact")} />
              </div>
            </motion.div>
            <HeroPhoto />
          </div>
        </section>

        <motion.section id="experience" className="section" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <div className="container">
            <div className="section-header">
              <h2>Experience</h2>
            </div>
            <div className="experience-timeline">
              {experiences.map((item, index) => (
                <motion.article
                  key={item.title}
                  className="glass-card timeline-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="timeline-dot">EX</div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <ul className="timeline-highlights">
                      {item.highlights.map((hl) => (
                        <li key={hl}>{hl}</li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="education" className="section" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <div className="container">
            <div className="section-header">
              <h2>Education</h2>
            </div>
            <motion.article className="glass-card education-card" whileHover={{ y: -5 }}>
              <div className="education-head">
                <span className="edu-badge">ED</span>
                <div>
                  <h3>Bachelor of Computer Applications (BCA)</h3>
                  <h4>Amity University, Noida</h4>
                </div>
              </div>
              <p className="education-meta">2024 - 2027 | CGPA: 8.5 / 10</p>
              <ul className="education-points">
                <li>Core computer science, programming fundamentals, and software engineering exposure</li>
                <li>Hands-on learning across databases, backend systems, and AI-oriented coursework</li>
                <li>Academic project focus on practical implementation and deployment readiness</li>
              </ul>
            </motion.article>
          </div>
        </motion.section>

        <motion.section id="skills" className="section" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
          <div className="container">
            <div className="section-header">
              <h2>Technical Skills</h2>
            </div>

            <motion.div
              className="skills-grid"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.12 }}
            >
              {skillCategories.map((category) => (
                <motion.article key={category.title} className="glass-card skill-card" variants={reveal} whileHover={{ y: -4 }}>
                  <div className="skill-head">
                    <span className="skill-icon">{category.icon}</span>
                    <h3>{category.title}</h3>
                  </div>

                  <div className="skill-items">
                    {category.items.map((item) => (
                      <span key={item} className="skill-item">{item}</span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section id="projects" className="section projects-section" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
          <div className="container">
            <div className="section-header">
              <h2>Projects</h2>
              <p className="section-sub">Selected AI systems, intelligent platforms, and full-stack applications.</p>
            </div>

            <div className="projects-showcase">
              {projects.map((project, index) => (
                <ProjectCard key={project.number} project={project} index={index} />
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="contact" className="section" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
          <div className="container">
            <div className="section-header">
              <h2>Get In Touch</h2>
              <p className="hero-subtitle">Ready to collaborate on AI projects or discuss opportunities?</p>
            </div>

            <div className="contact-grid">
              <div className="glass-card contact-info-panel">
                <h3>Let's Connect</h3>
                <div className="contact-list">
                  <a href="mailto:DipanshuChoudhary109@gmail.com" className="contact-item">
                    <span className="contact-icon">EM</span>
                    <div>
                      <strong>Email</strong>
                      <p>DipanshuChoudhary109@gmail.com</p>
                    </div>
                  </a>
                  <a href="https://www.linkedin.com/in/dipanshu-choudhary-981378328" target="_blank" rel="noreferrer" className="contact-item">
                    <span className="contact-icon">IN</span>
                    <div>
                      <strong>LinkedIn</strong>
                      <p>linkedin.com/in/dipanshuchoudhary</p>
                    </div>
                  </a>
                  <a href="https://github.com/dipanshuchoudhary-data" target="_blank" rel="noreferrer" className="contact-item">
                    <span className="contact-icon">GH</span>
                    <div>
                      <strong>GitHub</strong>
                      <p>github.com/dipanshuchoudhary-data</p>
                    </div>
                  </a>
                  <div className="contact-item">
                    <span className="contact-icon">LC</span>
                    <div>
                      <strong>Location</strong>
                      <p>New Delhi, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <motion.form className="glass-card contact-form" onSubmit={onSubmit}>
                {(["name", "email", "subject", "message"] as (keyof ContactForm)[]).map((field) => {
                  const isTextArea = field === "message";
                  return (
                    <motion.div
                      key={field}
                      className={`field ${errors[field] ? "field-error" : ""}`}
                      animate={errors[field] ? { x: [0, -3, 3, -2, 2, 0] } : { x: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {isTextArea ? (
                        <textarea
                          id={field}
                          placeholder=" "
                          value={form[field]}
                          onChange={(event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))}
                          rows={5}
                        />
                      ) : (
                        <input
                          id={field}
                          type={field === "email" ? "email" : "text"}
                          placeholder=" "
                          value={form[field]}
                          onChange={(event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))}
                        />
                      )}
                      <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                      <AnimatePresence>
                        {errors[field] && (
                          <motion.small initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            {errors[field]}
                          </motion.small>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}

                <motion.button className="submit-btn" type="submit" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  Send Message
                </motion.button>

                <AnimatePresence>
                  {success && (
                    <motion.p className="success-msg" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      Message sent successfully. I will get back to you soon.
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.form>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>Copyright {new Date().getFullYear()} Dipanshu Choudhary. AI Engineering Portfolio.</p>
        </div>
      </footer>
    </div>
  );
}
