"use client";

import { useEffect, useState } from "react";

const NODES = [
  { label: "AI / ML", angle: -82 },
  { label: "Products", angle: 4 },
  { label: "Infrastructure", angle: 92 },
  { label: "Frontend", angle: 150 },
  { label: "Backend", angle: 192 },
];

export default function SkillOrbit() {
  const [markup, setMarkup] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    fetch("/skills-developer.svg")
      .then((response) => response.text())
      .then((text) => {
        if (live) setMarkup(text);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  return (
    <div className="skill-orbit" aria-hidden="true">
      <div className="skill-orbit-ring">
        <svg className="skill-orbit-track" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="rgba(28, 25, 21, 0.55)"
            strokeWidth="0.35"
            strokeDasharray="0.8 1.7"
          />
        </svg>
        <div className="skill-orbit-art">
          {markup ? (
            <div
              className="skill-orbit-art-svg"
              dangerouslySetInnerHTML={{ __html: markup }}
            />
          ) : (
            <img src="/skills-developer.svg" alt="" />
          )}
        </div>
        {NODES.map((node) => (
          <span
            key={node.label}
            className="skill-orbit-node"
            style={{ ["--a" as string]: `${node.angle}deg` }}
          >
            <i />
            <b>{node.label}</b>
          </span>
        ))}
      </div>
    </div>
  );
}
