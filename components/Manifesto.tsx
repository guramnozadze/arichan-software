"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Words light up one by one as the reader scrolls through the pinned section.
const SENTENCE: { text: string; accent?: boolean }[] = [
  { text: "I" },
  { text: "ship" },
  { text: "products," },
  { text: "not" },
  { text: "slide" },
  { text: "decks." },
  { text: "Marketplaces" },
  { text: "that" },
  { text: "move" },
  { text: "real", accent: true },
  { text: "money.", accent: true },
  { text: "B2B" },
  { text: "compliance" },
  { text: "SaaS" },
  { text: "that" },
  { text: "keeps", accent: true },
  { text: "customers", accent: true },
  { text: "subscribed.", accent: true },
  { text: "First" },
  { text: "commit" },
  { text: "to" },
  { text: "production," },
  { text: "fast.", accent: true },
];

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // fromTo, not CSS-dimmed + to: without JS the words must stay readable.
      gsap.fromTo(".mani-word", { opacity: 0.15 }, {
        opacity: 1,
        stagger: 0.03,
        duration: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="mani-track relative h-[250vh] bg-smoke"
      aria-label="What I do"
    >
      <div className="mani-stage sticky top-0 flex h-screen flex-col justify-center px-6 sm:px-12 lg:px-20">
        <p className="max-w-5xl text-[clamp(1.75rem,5vw,4rem)] font-semibold leading-[1.15] tracking-tight text-cream">
          {SENTENCE.map((word, i) => (
            <span
              key={i}
              className={`mani-word ${word.accent ? "text-orchid" : ""}`}
            >
              {word.text}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
