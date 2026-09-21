"use client";

import { useState, type FormEvent } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { personalInfo } from "@/lib/constants";
import { validateContactForm, type ContactFieldErrors, type ContactFormData } from "@/lib/contact-validation";

type Status = { kind: "idle" } | { kind: "ok" };

export function contactMailto(data: ContactFormData) {
  const subject = `Portfolio message from ${data.name}`;
  const body = `${data.message}\n\nFrom ${data.name}\n${data.email}`;
  return `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const inputClass =
  "w-full border border-[#d5cdbc] bg-[#faf8f4] px-4 py-3 text-base text-[#1c1915] placeholder:text-[#8a8175] outline-none transition-colors focus:border-[#1c1915]";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<ContactFieldErrors>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const formEl = e.currentTarget;
    const data = Object.fromEntries(new FormData(formEl).entries());
    const result = validateContactForm(data);
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }

    const link = document.createElement("a");
    link.href = contactMailto(result.data);
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
    formEl.reset();
    setStatus({ kind: "ok" });
  }

  if (status.kind === "ok") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-3 border border-[#d5cdbc] bg-[#faf8f4] p-8"
      >
        <CheckCircle2 className="text-[#1c1915]" size={28} />
        <p className="text-base font-medium text-[#1c1915]">Your email app is opening.</p>
        <p className="text-sm text-[#4e493f]">The message is filled in. Send it from there and I&apos;ll reply.</p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-2 text-xs font-medium uppercase tracking-widest text-primary/80 underline-offset-4 hover:text-primary hover:underline"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative space-y-4 border border-[#d5cdbc] bg-[#faf8f4] p-6 text-left sm:p-7"
      aria-label="Contact form"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block font-mono text-[0.62rem] uppercase tracking-[0.08em] text-[#4e493f]">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={inputClass}
            placeholder="Ada Lovelace"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1.5 text-xs text-red-400">{errors.name[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1.5 block font-mono text-[0.62rem] uppercase tracking-[0.08em] text-[#4e493f]">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputClass}
            placeholder="ada@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1.5 text-xs text-red-400">{errors.email[0]}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block font-mono text-[0.62rem] uppercase tracking-[0.08em] text-[#4e493f]">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className={`${inputClass} resize-y`}
          placeholder="Tell me about your project, idea, or just say hi…"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1.5 text-xs text-red-400">{errors.message[0]}</p>
        )}
      </div>

      {/* Honeypot — visually hidden, accessibility-hidden, but reachable by bots */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Leave this empty</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        className="group inline-flex w-full items-center justify-center gap-2 border border-[#1c1915] bg-[#1c1915] px-6 py-3 font-mono text-[0.68rem] uppercase tracking-[0.06em] text-[#f3f0e8] transition-colors hover:border-[#9d2f1e] hover:bg-[#9d2f1e] sm:w-auto"
      >
        <Mail size={16} />
        Send by email
      </button>
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-[#4e493f]">
        Opens your email app with this message.
      </p>
    </form>
  );
}
