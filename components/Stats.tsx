"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 3, label: "Products live", caption: "Shipped and running in production" },
  { value: 748882, label: "Plus points exchanged", caption: "Moved through PlusConverter" },
  { value: 168, label: "Marketplace users", caption: "Trading on the platform" },
  { value: 95, label: "Completed trades", caption: "P2P transactions settled" },
];

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".stat-value").forEach((el) => {
        const target = Number(el.dataset.value);
        if (reduced) {
          el.textContent = target.toLocaleString("en-US");
          return;
        }
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = Math.floor(counter.v).toLocaleString("en-US");
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="border-t border-cream/10"
      aria-label="Track record"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4 gap-px bg-cream/10">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-ink px-6 py-14 sm:px-10">
            <p className="eyebrow">{stat.label}</p>
            <p
              className="stat-value display mt-4 text-5xl sm:text-6xl xl:text-7xl text-cream"
              data-value={stat.value}
            >
              0
            </p>
            <p className="mt-3 text-sm text-stone">{stat.caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
