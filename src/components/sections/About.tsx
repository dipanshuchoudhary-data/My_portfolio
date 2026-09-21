"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { personalInfo } from "@/lib/constants";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const statement = ["Systems that stay up", "when the model is wrong."];

export default function About() {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const wide = useMediaQuery("(min-width: 1200px)");

  useGSAP(
    () => {
      if (reduce || !wide || !root.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=80%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      tl.to(".about-statement", { y: -48, ease: "none" }, 0);
      tl.to(".about-aside", { y: 36, ease: "none" }, 0);
      tl.fromTo(".about-stats div", { y: 24 }, { y: 0, stagger: 0.15, ease: "none" }, 0);
    },
    { scope: root, dependencies: [reduce, wide], revertOnUpdate: true },
  );

  return (
    <div className="about" ref={root} aria-labelledby="about-heading">
      <div className="about-pin">
        <div className="about-grid">
          <div>
            <p className="ed-kicker">02 / About</p>
            <h2 id="about-heading" className="ed-display about-title">
              About me
            </h2>
            <p className="about-statement">
              {statement.map((line) => (
                <span className="about-line-wrap" key={line}>
                  <span className="about-line">{line}</span>
                </span>
              ))}
            </p>
          </div>

          <div className="about-aside">
            <p className="about-bio">{personalInfo.bio}</p>
            <p className="ed-kicker">{personalInfo.location}</p>
            <dl className="about-stats">
              {personalInfo.stats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
