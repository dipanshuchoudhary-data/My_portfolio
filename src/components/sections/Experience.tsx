"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { experience, personalInfo } from "@/lib/constants";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const metrics = [
  { value: "5", unit: "", label: "Months experience" },
  { value: "2", unit: "", label: "Teams" },
  { value: personalInfo.stats[0]?.value ?? "7", unit: "", label: "Projects built" },
  { value: "∞", unit: "", label: "More to build" },
];

export default function Experience() {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const canChoreograph = useMediaQuery("(min-width: 1100px)");

  useGSAP(
    () => {
      if (reduce || !root.current) return;
      const rootEl = root.current;
      const items = Array.from(rootEl.querySelectorAll<HTMLElement>(".exp-item"));
      const progressEl = rootEl.querySelector<HTMLElement>(".exp-progress");
      const wrap = rootEl.querySelector<HTMLElement>(".exp-list-wrap");

      const setActive = (index: number) => {
        items.forEach((item, i) => {
          item.classList.toggle("is-now", i === index);
          item.classList.toggle("is-past", i < index);
        });
      };

      const placeActive = () => {
        const line = window.innerHeight * 0.42;
        let index = 0;
        items.forEach((item, i) => {
          if (item.getBoundingClientRect().top <= line) index = i;
        });
        setActive(index);
        if (progressEl && wrap) {
          const wrapTop = wrap.getBoundingClientRect().top;
          const span = Math.max(wrap.getBoundingClientRect().height, 1);
          const y = items[index].getBoundingClientRect().top - wrapTop + 10;
          gsap.set(progressEl, { scaleY: Math.max(0.12, Math.min(1, y / span)) });
        }
      };

      const reveal = ScrollTrigger.create({
        trigger: rootEl,
        start: "top bottom",
        end: "bottom top",
        onUpdate: placeActive,
        onRefresh: placeActive,
      });
      placeActive();

      if (!canChoreograph) {
        return () => reveal.kill();
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootEl,
          start: "top 74%",
          end: "bottom 58%",
          scrub: 0.65,
        },
      });

      tl.fromTo(".exp-title", { y: 24 }, { y: 0, duration: 0.32, ease: "none" }, 0);
      tl.fromTo(".exp-formula-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.28, ease: "none" }, 0.02);
      tl.fromTo(".exp-poster-stage", { y: 30 }, { y: -16, duration: 1, ease: "none" }, 0);
      tl.fromTo(".exp-metric", { y: 20 }, { y: 0, stagger: 0.16, duration: 0.26, ease: "none" }, 0.14);
      tl.fromTo(".exp-mark", { y: -12 }, { y: 22, duration: 1, ease: "none" }, 0);

      return () => reveal.kill();
    },
    { scope: root, dependencies: [reduce, canChoreograph], revertOnUpdate: true },
  );

  return (
    <div className="exp" ref={root} aria-labelledby="experience-heading">
      <header className="exp-top">
        <div>
          <div className="exp-eyebrow">
            <p className="ed-kicker">05 / Experience</p>
            <span className="exp-eyebrow-rule" />
            <p className="exp-eyebrow-note">
              <i />
              Real work. Real impact.
            </p>
          </div>
          <h2 id="experience-heading" className="exp-title">
            Experience
          </h2>
          <p className="exp-formula">Ideas → Systems → Products → Impact</p>
          <span className="exp-formula-rule" />
          <p className="exp-lead">
            A journey through the work, problems, and teams that have shaped my growth as an
            AI engineer.
          </p>
        </div>
        <p className="exp-mark" aria-hidden="true">
          <span className="exp-mark-note">
            Better
            <br />
            systems
            <br />
            brighter
            <br />
            possibilities
          </span>
          <span className="exp-mark-num">05</span>
        </p>
      </header>

      <div className="exp-stage">
        <div className="exp-list-wrap">
          <span className="exp-progress" aria-hidden="true" />
          <ol className="exp-list">
          {experience.map((entry, index) => (
            <li
              className={`exp-item${index === 0 ? " is-now" : ""}`}
              key={`${entry.org}-${entry.period}`}
            >
              <p className="exp-period">{entry.period}</p>
              <h3>
                {entry.role}
                <span>
                  {entry.org}
                  <em>{entry.place}</em>
                </span>
              </h3>
              <ul>
                {entry.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
          <li className="exp-item exp-soon">
            <p className="exp-period">Coming soon</p>
            <h3>More to come...</h3>
            <p>Building. Learning. Shipping.</p>
          </li>
          </ol>
        </div>

        <figure className="exp-poster">
          <div className="exp-poster-stage">
            <div className="exp-poster-lime" />
            <div className="exp-poster-sheet">
              <img src="/image.png" alt="Mountain ridge at sunrise" />
              <p className="exp-caption">Same curiosity. Different problems. Bigger impact.</p>
            </div>
            <p className="exp-scribble exp-scribble-top" aria-hidden="true">
              Build
              <br />
              Solve
              <br />
              Iterate
              <br />
              Repeat
            </p>
            <p className="exp-scribble exp-scribble-side" aria-hidden="true">
              Progress
              <br />
              over
              <br />
              Perfection
            </p>
          </div>
        </figure>

        <aside className="exp-side" aria-label="Selected figures">
          <ol className="exp-metrics">
            {metrics.map((metric) => (
              <li className="exp-metric" key={metric.label}>
                <strong>
                  {metric.value}
                  {metric.unit && <small>{metric.unit}</small>}
                </strong>
                <span>{metric.label}</span>
              </li>
            ))}
          </ol>
          <p className="exp-close">
            Engineering
            <br />
            a more open future.
          </p>
        </aside>
      </div>
    </div>
  );
}
