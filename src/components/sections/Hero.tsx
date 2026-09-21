"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { personalInfo } from "@/lib/constants";

const heroRole = "AI/ML & Full-Stack Engineer";
const heroLead =
  "I build production AI systems, LLM applications, and full-stack products—from intelligent agents and RAG pipelines to the backend infrastructure behind them.";
const heroTags = ["Agentic AI", "LLM Workflows", "RAG", "Backend Systems"];
const heroStats = [
  { value: "07", label: "AI Products" },
  { value: "30+", label: "Technologies" },
  { value: "∞", label: "Possibilities" },
];
const currentlyBuilding = "Quizzer / LifeRoute AI";
const heroTagline = "Building things that matter.";
const resumeHref = encodeURI("/Dipanshu Choudhary - Resume_meta.pdf");

function HeroArc() {
  return (
    <svg className="hero-arc" viewBox="0 0 200 64" aria-hidden="true">
      <path id="heroArcPath" d="M6,56 C50,10 140,4 194,26" fill="none" />
      <text>
        <textPath href="#heroArcPath" startOffset="0">
          IDEAS → SYSTEMS → IMPACT
        </textPath>
      </text>
    </svg>
  );
}

export default function Hero() {
  const github = personalInfo.socials.find((item) => item.name === "GitHub")?.url ?? "#";
  const linkedin = personalInfo.socials.find((item) => item.name === "LinkedIn")?.url ?? "#";

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.to(".intro-polaroid", {
      y: -28,
      ease: "none",
      scrollTrigger: {
        trigger: ".intro",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(".intro-scribble", {
      y: -64,
      ease: "none",
      scrollTrigger: {
        trigger: ".intro",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="intro">
      <div className="intro-grid">
        <div className="intro-copy">
          <p className="intro-eyebrow">01 / Introduction</p>
          <h1 className="intro-name">
            <span>Dipanshu</span>
            <span>Choudhary</span>
          </h1>
          <p className="intro-role">{heroRole}</p>
          <p className="intro-summary">{heroLead}</p>
          <p className="intro-tags">{heroTags.join("  ·  ")}</p>
          <div className="intro-actions">
            <button type="button" className="intro-cta" onClick={scrollToProjects}>
              View systems ↓
            </button>
            <a className="intro-link" href={resumeHref} target="_blank" rel="noreferrer">
              Resume ↗
            </a>
            <a className="intro-link" href={github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a className="intro-link" href={linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </div>
        </div>

        <div className="intro-portrait">
          <div className="intro-portrait-meta">
            <p className="intro-photo-role">
              <span>AI / ML Engineer</span>
              <span>{personalInfo.location}</span>
            </p>
            <HeroArc />
          </div>
          <div className="intro-stage">
            <div className="intro-scribble" aria-hidden="true" />
            <div className="intro-polaroid-back" aria-hidden="true" />
            <div className="intro-polaroid">
              <div className="intro-polaroid-photo">
                <img src="/portrait.jpg" alt="Dipanshu Choudhary" />
              </div>
            </div>
          </div>
        </div>

        <aside className="intro-stats">
          <div>
            <p className="intro-building">Currently building</p>
            <p className="intro-building-value">{currentlyBuilding}</p>
          </div>
          {heroStats.map((stat) => (
            <div className="intro-stat" key={stat.label}>
              <p className="intro-stat-value">{stat.value}</p>
              <p className="intro-stat-label">{stat.label}</p>
            </div>
          ))}
          <p className="intro-signature" aria-hidden="true">
            <span>Dipanshu</span>
            <span>Choudhary</span>
          </p>
        </aside>

        <div className="intro-foot">
          <button type="button" className="intro-scroll" onClick={scrollToProjects}>
            <span aria-hidden="true" /> Scroll to explore
          </button>
          <p className="intro-tagline">{heroTagline}</p>
        </div>
      </div>
    </div>
  );
}
