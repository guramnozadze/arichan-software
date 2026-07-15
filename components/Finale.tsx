"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "gukanozadze@gmail.com";

export default function Finale() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable; the visible address can still be selected.
    }
  };

  useLayoutEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".finale-reveal", {
        y: 56,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={root}
      className="border-t border-cream/10 bg-smoke"
      aria-label="Contact"
    >
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-6 py-28 sm:px-10">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="finale-reveal text-base sm:text-lg text-stone">
            Have something to ship?
          </p>
          <h2 className="finale-reveal display mt-8 text-[clamp(3.5rem,12vw,11rem)] text-cream">
            Let&apos;s ship
            <br />
            <span className="text-orchid">something real.</span>
          </h2>
          <div className="finale-reveal mt-14 flex flex-wrap items-center justify-center gap-4">
            <a href={`mailto:${EMAIL}`} className="btn btn-solid">
              Start a project
            </a>
            <a
              href="https://www.linkedin.com/in/guram-nozadze/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              LinkedIn ↗
            </a>
          </div>
          <button
            type="button"
            onClick={copyEmail}
            className="finale-reveal mt-8 font-mono text-sm text-stone transition-colors hover:text-orchid"
            aria-live="polite"
          >
            {EMAIL} · {copied ? "copied!" : "click to copy"}
          </button>
        </div>

        <footer className="mt-24 flex flex-col gap-4 border-t border-cream/10 pt-8 font-mono text-[0.6875rem] tracking-[0.18em] uppercase text-stone sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Arichan Software</p>
          <p>Guram Nozadze</p>
          <div className="flex gap-8">
            <a
              href="https://www.linkedin.com/in/guram-nozadze/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-orchid transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:gukanozadze@gmail.com"
              className="hover:text-orchid transition-colors"
            >
              Email
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
