"use client";

import { type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function ProjectSnapZone({ children }: { children: ReactNode }) {
  const compact = useMediaQuery("(max-width: 767px)");
  const wide = useMediaQuery("(min-width: 1200px)");

  useGSAP(() => {
    const panels = gsap.utils.toArray<HTMLElement>('section[id^="project-"]');
    if (panels.length === 0 || compact) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = panels.map((panel) => panel.querySelector<HTMLElement>(".case-panel"));

    // Same rule as the camera: a card is on screen only while its planet is held.
    // A scrub window can be skipped by the snap, which left the planets up and the text at opacity 0.
    const placeCards = () => {
      const vh = window.innerHeight || 1;
      const center = vh * 0.5;
      cards.forEach((card, index) => {
        if (!card) return;
        const rect = panels[index].getBoundingClientRect();
        const fadeIn = gsap.utils.clamp(0, 1, (vh * 0.7 - rect.top) / (vh * 0.2));
        const fadeOut = gsap.utils.clamp(0, 1, (rect.bottom - center) / (vh * 0.18));
        const alpha = Math.min(fadeIn, fadeOut);
        gsap.set(card, { autoAlpha: alpha, y: (1 - alpha) * 16 });
      });
    };

    let reveal: ScrollTrigger | undefined;
    if (!reduce) {
      reveal = ScrollTrigger.create({
        trigger: panels[0],
        start: "top bottom",
        endTrigger: panels[panels.length - 1],
        end: "bottom top",
        onUpdate: placeCards,
        onRefresh: placeCards,
      });
      placeCards();
    }

    if (!wide) {
      return () => {
        reveal?.kill();
      };
    }

    // Get the scroll position of each project panel
    const trackers = panels.map((panel) =>
      ScrollTrigger.create({ trigger: panel, start: "top top" })
    );
    const panelStarts = trackers.map((st) => st.start);

    // Single ScrollTrigger with snap, limited to the project zone
    const snapTrigger = ScrollTrigger.create({
      trigger: panels[0],
      start: "top top",
      endTrigger: panels[panels.length - 1],
      end: "bottom bottom",
      snap: {
        snapTo: (progress, self) => {
          if (!self) return progress;
          const closestScroll = gsap.utils.snap(panelStarts, self.scroll());
          // Leave the gap between projects alone so the next planet can travel in.
          if (Math.abs(self.scroll() - closestScroll) > window.innerHeight * 0.42) {
            return progress;
          }
          return gsap.utils.normalize(self.start, self.end, closestScroll);
        },
        duration: { min: 0.4, max: 0.75 },
        delay: 0.12,
        ease: "power2.inOut",
      },
    });

    return () => {
      reveal?.kill();
      trackers.forEach((st) => st.kill());
      snapTrigger.kill();
    };
  }, { dependencies: [compact, wide], revertOnUpdate: true });

  return <>{children}</>;
}
