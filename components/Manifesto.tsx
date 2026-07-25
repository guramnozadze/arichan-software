"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Claim = {
  label: string;
  lead: string;
  trail: string;
  trailTone: "muted" | "accent";
  proof?: string;
};

// A pinned ledger: the rail tracks which claim is active while the right
// panel crossfades between them as the reader scrolls.
const CLAIMS: Claim[] = [
  {
    label: "Ship",
    lead: "I ship products,",
    trail: " not slide decks.",
    trailTone: "muted",
    proof: "3 products live",
  },
  {
    label: "Marketplaces",
    lead: "Marketplaces that move",
    trail: " real money.",
    trailTone: "accent",
    proof: "748,882 PLUS points moved · 95 P2P trades",
  },
  {
    label: "Compliance SaaS",
    lead: "B2B compliance SaaS that keeps customers",
    trail: " subscribed.",
    trailTone: "accent",
  },
  {
    label: "Engineering",
    lead: "Senior engineering, shipped",
    trail: " without drama.",
    trailTone: "muted",
  },
];

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // The pinned crossfade only makes sense once there's room for a
      // sticky rail beside the claim panel; below md it's a static list.
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          const claims = gsap.utils.toArray<HTMLElement>(".mani-claim");
          const rails = gsap.utils.toArray<HTMLElement>(".mani-rail-item");
          const markers = gsap.utils.toArray<HTMLElement>(
            ".mani-rail-marker",
          );

          gsap.set(claims.slice(1), { y: 28 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          });

          // Exit must fully finish before enter starts: these are different
          // sentences, not a photo, so overlapping opacity reads as an
          // illegible double-exposure rather than a dissolve.
          const EXIT_DUR = 0.05;
          const ENTER_DUR = 0.06;

          claims.forEach((claim, i) => {
            if (i === 0) return;
            const at = i / claims.length;
            tl.to(
              claims[i - 1],
              { autoAlpha: 0, y: -24, duration: EXIT_DUR, ease: "power1.in" },
              at - EXIT_DUR,
            )
              .to(
                claim,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: ENTER_DUR,
                  ease: "power2.out",
                },
                at,
              )
              .to(
                rails[i - 1],
                { color: "var(--color-stone)", duration: 0.1 },
                at - EXIT_DUR,
              )
              .to(markers[i - 1], { opacity: 0, duration: 0.1 }, at - EXIT_DUR)
              .to(
                rails[i],
                { color: "var(--color-cream)", duration: 0.1 },
                at,
              )
              .to(markers[i], { opacity: 1, duration: 0.1 }, at);
          });

          // Position params above are fractions of scroll progress, but GSAP
          // timeline positions are absolute seconds; normalize so 1 second
          // of timeline time equals 100% scroll progress through the pin.
          tl.duration(1);

          return () => {};
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="mani-track relative bg-smoke md:h-[400vh]"
      aria-label="What I do"
    >
      <div className="mani-stage flex flex-col gap-10 px-6 py-24 sm:px-12 md:sticky md:top-0 md:grid md:h-screen md:grid-cols-[auto_1fr] md:items-center md:gap-16 md:px-12 md:py-0 lg:px-20">
        <ol className="mani-rail hidden font-mono text-sm tracking-[0.14em] text-stone uppercase md:flex md:flex-col md:gap-5">
          {CLAIMS.map((claim, i) => (
            <li
              key={claim.label}
              className={`mani-rail-item flex items-center gap-3 ${
                i === 0 ? "text-cream" : "text-stone"
              }`}
            >
              <span
                className={`mani-rail-marker text-orchid ${
                  i === 0 ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden
              >
                ›
              </span>
              <span className="text-stone/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{claim.label}</span>
            </li>
          ))}
        </ol>

        <div className="mani-claims relative flex flex-col gap-16 md:block md:min-h-[16rem]">
          {CLAIMS.map((claim, i) => (
            <div
              key={claim.label}
              className={`mani-claim flex flex-col justify-center md:absolute md:inset-0 ${
                i === 0 ? "" : "md:opacity-0 md:invisible"
              }`}
            >
              <p className="mani-claim-label mb-3 font-mono text-xs tracking-[0.14em] text-stone uppercase md:hidden">
                {String(i + 1).padStart(2, "0")} · {claim.label}
              </p>
              <p className="display text-balance text-[clamp(1.9rem,5vw,4.25rem)] leading-[1.1] text-cream">
                {claim.lead}
                <span
                  className={
                    claim.trailTone === "accent"
                      ? "text-orchid"
                      : "text-stone"
                  }
                >
                  {claim.trail}
                </span>
              </p>
              {claim.proof && (
                <p className="mt-6 font-mono text-sm text-stone">
                  <span className="text-violet-core">✦</span> {claim.proof}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
