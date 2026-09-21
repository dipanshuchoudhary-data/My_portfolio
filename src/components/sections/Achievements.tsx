"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const awards = [
  {
    year: "2026",
    title: ["AI Innovation", "2026"],
    badge: "Winner",
    org: "Microsoft × Kyndryl",
    blurb: "Winner of AI Innovation 2026, Microsoft × Kyndryl.",
    tags: ["AI", "Innovation", "Microsoft", "Kyndryl"],
    note: ["Solving", "real", "problems"],
    plate: ["Microsoft", "×", "Kyndryl", "AI Innovation", "2026", "Winner"],
    aside: ["Technology", "People", "Ideas", "Impact"],
    scribble: ["Big problems.", "Brighter solutions."],
  },
  {
    year: "2026",
    title: ["Clean Coder", "2026"],
    badge: "Award",
    org: "Google",
    blurb: "Clean Coder 2026, an award from Google.",
    tags: ["Clean code", "Engineering", "Google"],
    note: ["Clean", "scalable", "meaningful", "code"],
    plate: ["Clean Coder", "Award", "2026", "Google"],
    aside: ["Discipline", "Craft", "Consistency", "Growth"],
    scribble: ["Write", "Build", "Improve", "Repeat"],
  },
];

export default function Achievements() {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const wide = useMediaQuery("(min-width: 1280px)");

  useGSAP(
    () => {
      if (reduce || !root.current) return;
      const rootEl = root.current;
      const rows = Array.from(rootEl.querySelectorAll<HTMLElement>(".award-row"));
      const count = rootEl.querySelector<HTMLElement>(".awards-count-now");
      const dot = rootEl.querySelector<HTMLElement>(".awards-meter-dot");
      const fill = rootEl.querySelector<HTMLElement>(".awards-meter-fill");
      const setDot = dot ? gsap.quickSetter(dot, "x", "px") : null;
      const setFill = fill ? gsap.quickSetter(fill, "scaleX") : null;

      const place = () => {
        const line = window.innerHeight * 0.72;
        const second = rows[1]?.getBoundingClientRect().top ?? line;
        const amount = gsap.utils.clamp(0, 1, (line - second) / (window.innerHeight * 0.38));
        const width = Math.max((dot?.parentElement?.clientWidth ?? 0) - 10, 0);
        setDot?.(amount * width);
        setFill?.(Math.max(amount, 0.04));
        if (count) count.textContent = amount > 0.55 ? "02" : "01";
      };

      const tracker = ScrollTrigger.create({
        trigger: rootEl,
        start: "top bottom",
        end: "bottom top",
        onUpdate: place,
        onRefresh: place,
      });
      place();

      if (!wide) return () => tracker.kill();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootEl,
          start: "top 78%",
          end: "bottom 55%",
          scrub: 0.6,
        },
      });
      tl.fromTo(".awards-title", { y: 22 }, { y: 0, duration: 0.3, ease: "none" }, 0);
      tl.fromTo(".awards-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.25, ease: "none" }, 0);
      tl.fromTo(".award-ghost", { x: -16 }, { x: 0, stagger: 0.35, duration: 0.45, ease: "none" }, 0.04);
      tl.fromTo(".award-copy", { x: 18 }, { x: 0, stagger: 0.35, duration: 0.35, ease: "none" }, 0.08);
      tl.fromTo(".award-plate-shift", { y: 12 }, { y: 0, stagger: 0.4, duration: 0.4, ease: "none" }, 0.16);
      tl.fromTo(".award-notes", { y: 14 }, { y: 0, stagger: 0.4, duration: 0.28, ease: "none" }, 0.32);
      tl.fromTo(".awards-mark", { y: -8 }, { y: 10, duration: 1, ease: "none" }, 0);

      return () => tracker.kill();
    },
    { scope: root, dependencies: [reduce, wide], revertOnUpdate: true },
  );

  return (
    <div className="awards" ref={root} aria-labelledby="awards-heading">
      <header className="awards-top">
        <div>
          <div className="awards-eyebrow">
            <p className="ed-kicker">06 / Awards</p>
            <span className="awards-eyebrow-rule" />
            <p className="awards-eyebrow-note">
              <i />
              Recognition for real impact.
            </p>
          </div>
          <h2 id="awards-heading" className="awards-title">
            Achievements
          </h2>
          <p className="awards-formula">Recognition × Competition × Building</p>
          <span className="awards-rule" />
          <p className="awards-lead">
            Recognition for building, shipping, and solving real-world problems.
          </p>
        </div>
        <p className="awards-mark" aria-hidden="true">
          <span>
            Build
            <br />
            compete
            <br />
            learn
            <br />
            repeat
          </span>
          <b>06</b>
        </p>
      </header>

      {awards.map((award, index) => (
        <article className="award-row" key={award.title[0]}>
          <p className="award-ghost" aria-hidden="true">
            {award.note.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <div className="award-num">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <i />
          </div>
          <div className="award-copy">
            <p className="award-year">{award.year}</p>
            <h3>
              {award.title[0]}
              <br />
              {award.title[1]}
            </h3>
            <p className="award-meta">
              <em>{award.badge}</em>
              <span>— {award.org}</span>
            </p>
            <p className="award-blurb">{award.blurb}</p>
            <ul>
              {award.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
          <figure className={`award-plate${index === 1 ? " is-flip" : ""}`}>
            <div className="award-plate-shift">
              <div className="award-plate-lime" />
              <div className="award-plate-back" />
              <div className="award-plate-card">
                {award.plate.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            </div>
          </figure>
          <div className="award-notes" aria-hidden="true">
            {index === 0 && (
              <p className="award-scribble award-scribble-top">
                Ideas
                <br />
                to
                <br />
                Impact
              </p>
            )}
            <p className="award-scribble">
              {award.scribble.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          </div>
          <p className="award-rail">
            {award.aside.map((word) => (
              <span key={word}>{word}</span>
            ))}
          </p>
        </article>
      ))}

      <footer className="awards-foot">
        <p className="awards-count">
          <span className="awards-count-now">01</span>
          <span> / 02</span>
        </p>
        <div className="awards-meter" aria-hidden="true">
          <span className="awards-meter-line" />
          <span className="awards-meter-fill" />
          <span className="awards-meter-dot" />
          <ol>
            <li>01</li>
            <li>02</li>
          </ol>
        </div>
        <p className="awards-close">
          Recognition is a checkpoint.
          <br />
          The work continues.
        </p>
      </footer>
    </div>
  );
}
