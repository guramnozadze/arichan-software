"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Three claims, three unrelated motion languages: Ship lands with physical
// weight (overshoot + impact), Marketplaces flows (counting + looping
// particles), Engineering is mechanical (linear typing, no easing curve).
// Each plays once when scrolled into view rather than scrubbing with the
// scrollbar, so it has real kinetic energy instead of feeling scroll-locked.
// A faint oversized word drifts behind each claim on a slow parallax scrub -
// atmosphere, not a numbered-eyebrow scaffold.

const SHIP_WORDS = [
  { text: "Fast", hl: false },
  { text: "ships.", hl: false },
  { text: "Serious", hl: true },
  { text: "revenue.", hl: true },
];

function ShipClaim() {
  const root = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".ship-word");
      const rings = gsap.utils.toArray<HTMLElement>(".ship-impact-ring");

      gsap.set(words, {
        y: -140,
        opacity: 0,
        scale: 1.15,
        rotate: () => gsap.utils.random(-9, 9),
      });
      gsap.set(rings, { opacity: 0, scale: 0.4 });
      gsap.set(".ship-stamp", { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });

      words.forEach((word, i) => {
        const at = i * 0.14;
        tl.to(
          word,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.65,
            ease: "back.out(1.9)",
          },
          at,
        )
          .to(
            rings[i],
            { scale: 2.3, opacity: 0.9, duration: 0.5, ease: "power2.out" },
            at + 0.32,
          )
          .to(
            heading.current,
            { x: 2.5, duration: 0.035, repeat: 3, yoyo: true, ease: "none" },
            at + 0.32,
          );
      });

      tl.to(".ship-stamp", {
        opacity: 1,
        y: 0,
        rotate: -4,
        duration: 0.4,
        ease: "back.out(2)",
        stagger: 0.08,
      });

      gsap.to(".ship-bg-word", {
        yPercent: -16,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="relative isolate flex flex-col justify-center overflow-hidden px-6 py-20 sm:px-12 sm:py-28 md:min-h-screen md:py-0 lg:px-20"
    >
      <span
        aria-hidden
        className="ship-bg-word claim-bg-word display absolute -right-6 top-8 text-[clamp(8rem,24vw,20rem)] sm:top-12"
      >
        SHIP
      </span>
      <p
        ref={heading}
        className="display text-[clamp(2.75rem,8vw,7rem)] leading-[1.05]"
      >
        {SHIP_WORDS.map((w, i) => (
          <span
            key={i}
            className={`ship-word relative mr-[0.28em] inline-block ${
              w.hl ? "text-orchid" : "text-cream"
            }`}
          >
            {w.text}
            <span
              aria-hidden
              className="ship-impact-ring pointer-events-none absolute top-full left-1/2 h-[0.14em] w-[0.14em] -translate-x-1/2 rounded-full border-2 border-orchid opacity-0"
            />
          </span>
        ))}
      </p>
      <p className="ship-stamp mt-8 inline-flex w-fit items-center gap-2 border border-orchid/50 px-4 py-2 font-mono text-xs tracking-[0.14em] text-orchid uppercase">
        <span aria-hidden>✓</span> 3 products shipped in 4 months
      </p>
      <p className="ship-stamp mt-3 font-mono text-xs tracking-[0.1em] text-stone">
        Ed Tech · HR Tech · Back-Office ERP · Inventory Management
      </p>
    </div>
  );
}

function MarketplacesClaim() {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(748882);

  useLayoutEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.set(".mkt-heading", { opacity: 0, y: 28 });
      gsap.set(".mkt-dot", { opacity: 0 });

      const counter = { value: 0 };

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        onComplete: () => {
          // Ambient loop: only start once the entrance has fully played,
          // so the dots don't cycle invisibly while off-screen.
          gsap.utils.toArray<HTMLElement>(".mkt-dot").forEach((dot, i) => {
            gsap.fromTo(
              dot,
              { x: 0 },
              {
                x: "9rem",
                duration: 1.8,
                repeat: -1,
                delay: i * 0.5,
                ease: "power1.inOut",
              },
            );
          });
        },
      });

      tl.to(".mkt-heading", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
        .to(
          counter,
          {
            value: 748882,
            duration: 1.6,
            ease: "power2.out",
            onStart: () => setCount(0),
            onUpdate: () => setCount(Math.round(counter.value)),
          },
          "-=0.35",
        )
        .to(".mkt-dot", { opacity: 1, duration: 0.3, stagger: 0.15 }, "-=1.2");

      gsap.to(".mkt-bg-word", {
        yPercent: -16,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="relative isolate flex flex-col justify-center overflow-hidden border-t border-cream/10 px-6 py-20 sm:px-12 sm:py-28 md:min-h-screen md:py-0 lg:px-20"
    >
      <span
        aria-hidden
        className="mkt-bg-word claim-bg-word display absolute -left-6 bottom-4 text-[clamp(8rem,24vw,20rem)]"
      >
        MARKETS
      </span>
      <p className="mkt-heading display max-w-4xl text-[clamp(2.75rem,7vw,6rem)] leading-[1.05] text-cream text-balance">
        Marketplaces that move{" "}
        <span className="text-orchid">real money.</span>
      </p>

      <div className="mt-10 flex flex-wrap items-end gap-x-10 gap-y-6">
        <p className="display text-[clamp(2.5rem,6vw,4.5rem)] tabular-nums text-orchid">
          {count.toLocaleString()}
        </p>
        <div className="flex flex-col gap-2 pb-2">
          <p className="font-mono text-xs tracking-[0.14em] text-stone uppercase">
            PLUS points moved
          </p>
          <div className="relative h-4 w-36">
            <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-cream/15" />
            <span
              aria-hidden
              className="mkt-dot absolute top-1/2 left-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-orchid opacity-0"
            />
            <span
              aria-hidden
              className="mkt-dot absolute top-1/2 left-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-violet-core opacity-0"
            />
          </div>
          <p className="font-mono text-xs text-stone">95 P2P trades</p>
        </div>
      </div>
    </div>
  );
}

const ENG_LEAD = "Senior engineering, shipped";
const ENG_TRAIL = " without drama.";
const ENG_FULL_LEN = ENG_LEAD.length + ENG_TRAIL.length;

function EngineeringClaim() {
  const root = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(ENG_FULL_LEN);

  useLayoutEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const proxy = { n: 0 };
      gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      }).to(proxy, {
        n: ENG_FULL_LEN,
        duration: 1.3,
        ease: "none",
        onStart: () => setRevealed(0),
        onUpdate: () => setRevealed(Math.floor(proxy.n)),
      });

      gsap.to(".eng-bg-word", {
        yPercent: -16,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const leadShown = ENG_LEAD.slice(0, Math.min(revealed, ENG_LEAD.length));
  const trailShown = ENG_TRAIL.slice(0, Math.max(0, revealed - ENG_LEAD.length));

  return (
    <div
      ref={root}
      className="relative isolate flex flex-col justify-center overflow-hidden border-t border-cream/10 px-6 py-20 sm:px-12 sm:py-28 md:min-h-screen md:py-0 lg:px-20"
    >
      <span
        aria-hidden
        className="eng-bg-word claim-bg-word absolute right-0 bottom-0 font-mono text-[clamp(9rem,28vw,24rem)]"
      >
        {">_"}
      </span>
      <p className="font-mono text-[clamp(1.4rem,3.6vw,2.75rem)] leading-[1.4] text-cream">
        <span aria-hidden className="text-orchid">
          ${" "}
        </span>
        {leadShown}
        <span className="text-stone">{trailShown}</span>
        <span aria-hidden className="eng-cursor" />
      </p>
    </div>
  );
}

export default function Manifesto() {
  return (
    <section className="relative bg-smoke" aria-label="What I do">
      <ShipClaim />
      <MarketplacesClaim />
      <EngineeringClaim />
    </section>
  );
}
