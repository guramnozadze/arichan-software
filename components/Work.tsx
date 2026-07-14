"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    index: "01",
    name: "PlusConverter",
    tags: "Marketplace · Payments",
    pitch:
      "Georgia's P2P exchange for PLUS points - 748,882 points moved to lari.",
    href: "https://plusconverter.ge",
    domain: "plusconverter.ge",
  },
  {
    index: "02",
    name: "AImly",
    tags: "SaaS · AI",
    pitch:
      "An AI copilot that grows your X audience - it watches, drafts, you approve.",
    href: "https://tryaimly.com",
    domain: "tryaimly.com",
  },
  {
    index: "03",
    name: "AdLift",
    tags: "Web App · Ads",
    pitch: "A lightweight toolkit for lifting ad campaign performance.",
    href: "https://adlift.vercel.app",
    domain: "adlift.vercel.app",
  },
];

export default function Work() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".work-row").forEach((row) => {
        gsap.from(row, {
          y: 64,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="py-28 sm:py-40" aria-label="Selected work">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex items-baseline justify-between">
          <p className="eyebrow">Selected work</p>
          <p className="font-mono text-sm text-stone">(03)</p>
        </div>
      </div>

      <div className="mt-14 border-t border-cream/10">
        {PROJECTS.map((project) => (
          <a
            key={project.index}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="work-row border-b border-cream/10"
          >
            <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-x-6 sm:gap-x-12 px-6 py-10 sm:px-10 sm:py-14">
              <span className="work-dim work-swap font-mono text-sm text-stone self-start pt-2">
                {project.index}
              </span>
              <span className="block">
                <span className="work-dim work-swap block font-mono text-[0.6875rem] tracking-[0.22em] uppercase text-orchid">
                  {project.tags}
                </span>
                <span className="work-name work-swap display block mt-2 text-[clamp(2.5rem,7vw,6.5rem)] text-cream">
                  {project.name}
                </span>
                <span className="work-dim work-swap block mt-3 max-w-xl text-sm sm:text-base text-stone">
                  {project.pitch}
                </span>
              </span>
              <span className="justify-self-end text-right">
                <span className="work-arrow block text-3xl sm:text-4xl text-orchid">
                  ↗
                </span>
                <span className="work-dim work-swap mt-2 hidden sm:block font-mono text-xs text-stone">
                  {project.domain}
                </span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
