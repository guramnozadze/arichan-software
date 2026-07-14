"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    index: "01",
    title: "Product Engineering",
    body: "Full products from first commit to production: design, build, deploy, iterate.",
  },
  {
    index: "02",
    title: "AI & Automation",
    body: "Agents and pipelines that watch, draft and decide, so growth happens while you sleep.",
  },
  {
    index: "03",
    title: "Marketplaces & Payments",
    body: "P2P platforms moving real money, engineered for trust from the first transaction.",
  },
];

export default function Pillars() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".pillar-panel");
      gsap.set(panels.slice(1), { opacity: 0, yPercent: 12 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      tl.to(panels[0], { opacity: 0, yPercent: -12, duration: 0.1 }, 0.26)
        .to(panels[1], { opacity: 1, yPercent: 0, duration: 0.1 }, 0.3)
        .to(panels[1], { opacity: 0, yPercent: -12, duration: 0.1 }, 0.59)
        .to(panels[2], { opacity: 1, yPercent: 0, duration: 0.1 }, 0.63)
        .to(
          ".pillar-progress",
          { scaleX: 1, ease: "none", duration: 1 },
          0,
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="pillars-track relative h-[300vh] bg-smoke"
      aria-label="What I do"
    >
      <div className="pillars-stage sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-6 sm:px-12 lg:px-20">
        <p className="eyebrow absolute top-24">What I do / Three pillars</p>

        <div className="relative">
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.index}
              className={`pillar-panel ${i > 0 ? "absolute inset-0 flex flex-col justify-center" : ""}`}
            >
              <p className="font-mono text-sm text-orchid">{pillar.index}</p>
              <h2 className="display mt-4 max-w-4xl text-[clamp(2.75rem,8vw,7.5rem)] text-cream">
                {pillar.title}
              </h2>
              <p className="mt-6 max-w-md text-base sm:text-lg text-stone">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>

        <div className="absolute bottom-16 left-6 right-6 sm:left-12 sm:right-12 lg:left-20 lg:right-20 h-px bg-cream/10">
          <div className="pillar-progress h-px w-full origin-left scale-x-0 bg-violet-core" />
        </div>
      </div>
    </section>
  );
}
