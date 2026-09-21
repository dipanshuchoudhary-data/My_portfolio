"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { skillCategories } from "@/lib/constants";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import SkillOrbit from "./SkillOrbit";

const TOTAL = skillCategories.length;
const HOLD = 1.15;
const SPAN = TOTAL + HOLD;
const STEPS = TOTAL - 1;
const LEAD = 0.42;

export default function Skills() {
  const root = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const canChoreograph = useMediaQuery("(min-width: 1200px)");

  useGSAP(
    () => {
      if (reduce || !canChoreograph || !root.current) return;
      const rootEl = root.current;
      const panels = Array.from(rootEl.querySelectorAll<HTMLElement>(".skill-panel"));
      if (!panels.length) return;

      rootEl.classList.add("is-motion");

      const countNow = rootEl.querySelector<HTMLElement>(".skills-count-now");
      const dot = rootEl.querySelector<HTMLElement>(".skills-meter-dot");
      const fill = rootEl.querySelector<HTMLElement>(".skills-meter-fill");
      const ticks = Array.from(rootEl.querySelectorAll<HTMLElement>("[data-skill-tick]"));
      const headings = panels
        .map((panel) => panel.querySelector("h3"))
        .filter((node): node is HTMLHeadingElement => Boolean(node));
      const skewTo = headings.map((heading) =>
        gsap.quickTo(heading, "skewX", { duration: 0.45, ease: "power3.out" }),
      );
      const setDot = dot ? gsap.quickSetter(dot, "x", "px") : null;
      const setFill = fill ? gsap.quickSetter(fill, "scaleX") : null;
      let shown = 0;

      const markActive = (index: number) => {
        if (index === shown) return;
        shown = index;
        ticks.forEach((tick, i) => tick.classList.toggle("is-on", i <= index));
        if (countNow) countNow.textContent = String(index + 1).padStart(2, "0");
      };

      const title = rootEl.querySelector(".skills-title");
      const rule = rootEl.querySelector(".skills-rule");
      if (title) {
        gsap.fromTo(
          title,
          { y: 28 },
          {
            y: 0,
            ease: "none",
            scrollTrigger: { trigger: rootEl, start: "top 82%", end: "top top", scrub: true },
          },
        );
      }
      if (rule) {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: rootEl, start: "top 74%", end: "top top", scrub: true },
          },
        );
      }

      panels.forEach((panel, index) => {
        panel.classList.toggle("is-on", index === 0);
      });
      gsap.set(rootEl.querySelector(".skill-poster"), { rotation: -7.5, transformOrigin: "50% 58%" });

      const parts = panels.map((panel) => ({
        panel,
        heading: panel.querySelector("h3"),
        line: panel.querySelector<HTMLElement>(".skill-rule"),
        chips: Array.from(panel.querySelectorAll<HTMLElement>("li")),
      }));

      const place = (time: number) => {
        parts.forEach((part, index) => {
          const local = time - index + LEAD;
          if (local <= 0) {
            part.panel.classList.remove("is-on");
            gsap.set(part.panel, { autoAlpha: 0, y: 18, filter: "none" });
            return;
          }

          part.panel.classList.add("is-on");
          const fade = Math.max(0, Math.min(1, local / (LEAD * 0.72)));
          const sharp = Math.max(0, Math.min(1, (local - LEAD * 0.18) / (LEAD * 0.82)));
          const fadeEase = fade * fade * (3 - 2 * fade);
          const sharpEase = sharp * sharp * (3 - 2 * sharp);
          const blur = (1 - sharpEase) * 14;

          gsap.set(part.panel, {
            autoAlpha: fadeEase,
            y: (1 - fadeEase) * 18,
            filter: sharpEase >= 1 ? "none" : `blur(${blur.toFixed(2)}px)`,
            transformOrigin: "50% 0%",
          });
          if (part.line) gsap.set(part.line, { scaleX: Math.max(fadeEase, 0.001) });
          if (part.heading) gsap.set(part.heading, { y: (1 - sharpEase) * 10 });
          part.chips.forEach((chip, chipIndex) => {
            const chipFade = Math.max(0, Math.min(1, (fadeEase - chipIndex * 0.05) / 0.5));
            gsap.set(chip, { y: (1 - chipFade) * 12 });
          });
        });
      };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: rootEl,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 6.4)}`,
          pin: ".skills-pin",
          pinSpacing: true,
          // 0 still turns on ScrollTrigger sorting. This pin is created after
          // Experience, so without a sort the later section is measured too
          // early and a blank screen appears after Skills.
          refreshPriority: 0,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh(self) {
            const time = self.progress * SPAN;
            markActive(Math.min(TOTAL - 1, Math.floor(Math.min(time, TOTAL - 0.001))));
            place(time);
          },
          onUpdate(self) {
            const velocity = self.getVelocity();
            const skew =
              Math.abs(velocity) < 50 ? 0 : gsap.utils.clamp(-1.8, 1.8, velocity / 4000);
            skewTo.forEach((setSkew) => setSkew(skew));

            const time = self.progress * SPAN;
            const amount = Math.min(1, time / STEPS);
            progressRef.current = amount;
            rootEl.style.setProperty("--spin", amount.toFixed(3));

            const active = Math.min(TOTAL - 1, Math.floor(Math.min(time, TOTAL - 0.001)));
            markActive(active);
            place(time);
            const width = Math.max((dot?.parentElement?.clientWidth ?? 0) - 10, 0);
            setDot?.(amount * width);
            setFill?.(Math.max(amount, 0.001));
          },
        },
      });

      tl.to(".skill-poster", { y: -20, rotation: -3.2, duration: SPAN, ease: "none" }, 0);
      tl.to(".skill-orbit", { y: 16, duration: SPAN, ease: "none" }, 0);
      tl.to(".skills-mark", { y: 26, duration: SPAN, ease: "none" }, 0);
      place(0);

      const onMove = (event: PointerEvent) => {
        const rect = rootEl.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        pointerRef.current = { x, y };
        rootEl.style.setProperty("--px", x.toFixed(3));
        rootEl.style.setProperty("--py", y.toFixed(3));
      };
      rootEl.addEventListener("pointermove", onMove);

      return () => {
        rootEl.classList.remove("is-motion");
        rootEl.removeEventListener("pointermove", onMove);
      };
    },
    { scope: root, dependencies: [reduce, canChoreograph], revertOnUpdate: true },
  );

  return (
    <div className="skills" ref={root} aria-labelledby="skills-heading">
      <div className="skills-pin">
        <header className="skills-hero">
          <div className="skills-copy">
            <div className="skills-eyebrow">
              <p className="ed-kicker">04 / Skills</p>
              <span className="skills-eyebrow-rule" />
              <p className="skills-eyebrow-impact">
                <i />
                From ideas to impact
              </p>
            </div>
            <h2 id="skills-heading" className="skills-title">
              {"Skills & "}
              <br />
              Technologies
            </h2>
            <p className="skills-formula">Tools × Systems × Ideas × Impact</p>
            <span className="skills-rule" />
            <p className="skills-lead">
              A stack for AI systems, LLM applications, and agentic workflows, and for the
              backend services and full-stack products around them.
            </p>
            <p className="skills-hint">
              <span>↓</span> Scroll to explore
            </p>
          </div>

          <div className="skill-poster" aria-hidden="true">
            <div className="skill-poster-stage">
              <div className="skill-poster-lime" />
              <div className="skill-poster-back" />
              <div className="skill-poster-sheet">
                <div className="skill-poster-face">
                  <svg className="skill-poster-peak" viewBox="0 0 200 280" preserveAspectRatio="xMidYMid slice">
                    <defs>
                      <linearGradient id="skill-peak-sky" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2a2a2a" />
                        <stop offset="55%" stopColor="#101010" />
                        <stop offset="100%" stopColor="#050505" />
                      </linearGradient>
                    </defs>
                    <rect width="200" height="280" fill="url(#skill-peak-sky)" />
                    <path d="M-20 250 L48 118 L86 156 L118 48 L156 102 L220 64 L220 300 L-20 300 Z" fill="#1a1a1a" />
                    <path d="M70 150 L118 48 L150 120 L186 86 L210 140 L150 110 Z" fill="#3a3a3a" />
                    <path d="M104 78 L118 48 L134 86 L150 70 Z" fill="#6a6a6a" />
                    <path d="M112 62 L118 48 L128 70 Z" fill="#f2efe6" />
                    <path d="M-20 210 L36 146 L78 178 L112 124 L154 188 L220 132 L220 300 L-20 300 Z" fill="#0c0c0c" />
                    <path d="M96 168 L118 118 L142 176 L168 150 L142 188 Z" fill="#242424" />
                  </svg>
                  <p>
                    Turning
                    <br />
                    ideas
                    <br />
                    into
                    <br />
                    <em>systems_</em>
                  </p>
                </div>
                <span className="skill-poster-caption">Better tools create better opportunities.</span>
              </div>
              <p className="skill-poster-note">
                Engineer
                <br />
                Build
                <br />
                Improve
                <br />
                Repeat
              </p>
            </div>
          </div>

          <SkillOrbit />
          <p className="skills-mark" aria-hidden="true">
            <span className="skills-mark-note">
              Continuously
              <br />
              learning
              <br />
              always
              <br />
              building
            </span>
            <span className="skills-mark-num">04</span>
          </p>
        </header>

        <div className="skills-body">
          <div className="skill-stage">
            {skillCategories.map((category, index) => (
              <article
                className={`skill-panel${index === 0 ? " is-on" : ""}`}
                key={category.name}
              >
                <div className="skill-panel-top">
                  <p className="skill-num">{String(index + 1).padStart(2, "0")}</p>
                  <p className="skill-of">/ {String(TOTAL).padStart(2, "0")}</p>
                </div>
                <span className="skill-rule" />
                <h3>{category.name}</h3>
                {category.description && <p className="skill-blurb">{category.description}</p>}
                <ul>
                  {category.skills.map((skill) => (
                    <li key={skill.name}>{skill.name}</li>
                  ))}
                </ul>
                {index === 0 && (
                  <p className="skill-scribble skill-scribble-start">
                    Write
                    <br />
                    Build
                    <br />
                    Solve
                  </p>
                )}
                {index === TOTAL - 1 && (
                  <p className="skill-scribble skill-scribble-end">
                    Deploy
                    <br />
                    Scale
                    <br />
                    Repeat
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>

        <footer className="skills-progress">
          <p className="skills-count">
            <span className="skills-count-now">01</span>
            <span> / {String(TOTAL).padStart(2, "0")}</span>
          </p>
          <div className="skills-meter" aria-hidden="true">
            <span className="skills-meter-line" />
            <span className="skills-meter-fill" />
            <span className="skills-meter-dot" />
            <ol className="skills-ticks">
              {skillCategories.map((category, index) => (
                <li
                  key={category.name}
                  data-skill-tick={index}
                  className={index === 0 ? "is-on" : ""}
                >
                  {String(index + 1).padStart(2, "0")}
                </li>
              ))}
            </ol>
          </div>
          <p className="skills-close">“Same curiosity. Different possibilities.”</p>
        </footer>
      </div>
    </div>
  );
}
