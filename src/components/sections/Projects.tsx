"use client";

import { projects } from "@/lib/constants";

const PLANET_NAMES = ["Earth", "Mars", "Jupiter", "Saturn"];

export function ProjectsHeader() {
  return (
    <div className="work-head">
      <p className="ed-kicker ed-kicker-light">03 / Projects</p>
      <h2 className="ed-display">Featured Projects</h2>
      <p className="work-lead">
        Scroll through the system. Each body is a project I engineered.
      </p>
    </div>
  );
}

export function ProjectDetail({ index }: { index: number }) {
  const project = projects[index];
  if (!project) return null;

  return (
    <div className="case-slot">
      <article className="case-panel">
        <p className="ed-kicker">
          {PLANET_NAMES[index]} — Project {String(index + 1).padStart(2, "0")}
        </p>
        <h3>{project.title}</h3>
        <p className="case-summary">{project.description}</p>
        {project.built && <p className="case-point">{project.built}</p>}

        <ul className="case-tech">
          {project.technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <div className="case-links">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              Github repo link
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              Live Demo
            </a>
          )}
        </div>
      </article>
    </div>
  );
}
