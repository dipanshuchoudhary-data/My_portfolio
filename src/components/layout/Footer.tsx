"use client";

import { personalInfo } from "@/lib/constants";
import { useLenis } from "lenis/react";

export default function Footer() {
  const lenis = useLenis();

  const scrollToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 2 });
  };

  return (
    <footer className="site-footer">
      <p>
        &copy; {new Date().getFullYear()} {personalInfo.name}
      </p>
      <p>Built with Next.js, Three.js &amp; GSAP</p>
      <button type="button" onClick={scrollToTop}>
        Back to top
      </button>
    </footer>
  );
}
