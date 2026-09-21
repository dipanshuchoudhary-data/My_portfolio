"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useLenis } from "lenis/react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const lenis = useLenis();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop?.();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      lenis?.start?.();
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen, lenis]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el as HTMLElement, { offset: -80 });
      return;
    }
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.div
        className="nav-progress"
        style={{ scaleX }}
        aria-hidden="true"
      />

      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className={cn("site-nav", isScrolled && "is-scrolled")}
      >
        <ul className="site-nav-list">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  aria-label={`Navigate to ${link.label} section`}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(isActive && "is-active")}
                >
                  {link.label}
                </button>
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="site-nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            id="mobile-nav-menu"
            className="site-nav-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Sections"
          >
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className={cn(
                      activeSection === link.href.replace("#", "") && "is-active",
                    )}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
