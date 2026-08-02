"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MonogramCanvas from "./MonogramCanvas";

gsap.registerPlugin(ScrollTrigger);

const LINES = ["ARICHAN", "SOFTWARE"];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);

  useLayoutEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });

      if (reduced) return;

      gsap.set(".hero-letter, .hero-eyebrow, .hero-sub, .hero-cue", {
        visibility: "visible",
      });

      gsap.from(".hero-letter", {
        yPercent: 112,
        rotate: 6,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.045,
        delay: 0.2,
      });
      gsap.from(".hero-eyebrow, .hero-sub, .hero-cue", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        delay: 1.0,
        stagger: 0.08,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
      tl.to(".hero-line-0", { xPercent: -6, ease: "none", duration: 0.85 }, 0)
        .to(".hero-line-1", { xPercent: 6, ease: "none", duration: 0.85 }, 0)
        .to(
          ".hero-cue",
          { opacity: 0, ease: "none", duration: 0.08 },
          0.02,
        )
        .to(
          ".hero-stage",
          { opacity: 0.45, scale: 0.97, ease: "power1.in", duration: 0.25 },
          0.75,
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="hero-track relative h-[400vh]"
      aria-label="Arichan Software"
    >
      <div className="hero-stage sticky top-0 h-screen overflow-hidden">
        <div className="hero-eyebrow absolute top-16 sm:top-20 left-0 z-20 w-full px-6 text-center">
          <p className="font-sans text-xl sm:text-2xl font-medium tracking-tight text-cream">
            Guram Nozadze
          </p>
          <p className="eyebrow mt-2">Full-Stack Engineer</p>
        </div>

        <MonogramCanvas progress={progress} className="absolute inset-0 z-0" />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center select-none">
          <h1
            className="hero-title display text-[clamp(5rem,17vw,16rem)] text-center"
            aria-label="Arichan Software"
          >
            {LINES.map((line, li) => (
              <span
                key={line}
                className={`hero-line-${li} block overflow-hidden`}
                aria-hidden
              >
                {line.split("").map((ch, i) => (
                  <span key={i} className="hero-letter">
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </h1>
        </div>

        <p className="hero-sub absolute bottom-24 left-1/2 -translate-x-1/2 z-20 max-w-md px-6 text-center text-sm sm:text-base text-stone">
          Software, designed and built without compromise.
        </p>

        <div className="hero-cue absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-center font-mono text-[0.625rem] tracking-[0.3em] uppercase text-stone">
          Scroll
          <span className="hero-cue-line" />
        </div>
      </div>
    </section>
  );
}
