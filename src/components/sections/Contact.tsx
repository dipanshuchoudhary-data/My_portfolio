"use client";

import { useEffect, useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { personalInfo, resumeHref } from "@/lib/constants";
import { gsap } from "@/lib/gsap-config";
import { useIsTouchDevice } from "@/hooks/useMediaQuery";
import ContactForm from "./ContactForm";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

export default function Contact() {
  const mailRef = useRef<HTMLAnchorElement>(null);
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    const el = mailRef.current;
    if (isTouch || !el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

    const move = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      xTo((event.clientX - (rect.left + rect.width / 2)) * 0.12);
      yTo((event.clientY - (rect.top + rect.height / 2)) * 0.2);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [isTouch]);

  return (
    <div className="contact" aria-labelledby="contact-heading">
      <div className="contact-grid">
        <div>
          <p className="ed-kicker">07 / Contact</p>
          <h2 id="contact-heading" className="ed-display contact-title">
            Let&apos;s Work Together
          </h2>
          <p className="contact-lead">
            A role, a system to design, or a question about how one of these was built.
          </p>
          <a ref={mailRef} className="contact-mail" href={`mailto:${personalInfo.email}`}>
            {personalInfo.email}
          </a>
          <p className="ed-kicker contact-where">{personalInfo.location}</p>
          <div className="contact-meta">
            <a href={resumeHref} download>
              Resume
            </a>
            {personalInfo.socials.map((social) => {
              const Icon = iconMap[social.icon] || Mail;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target={social.url.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
