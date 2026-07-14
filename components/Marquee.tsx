const ITEMS = [
  { value: "748,882", label: "PLUS points moved" },
  { value: "168", label: "marketplace users" },
  { value: "95", label: "P2P trades" },
  { value: "3", label: "products live" },
];

function Track({ hidden }: { hidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-baseline"
      aria-hidden={hidden || undefined}
    >
      {ITEMS.map((item) => (
        <span
          key={item.label}
          className="display flex items-baseline whitespace-nowrap text-[clamp(2.5rem,6vw,5rem)]"
        >
          <span className="mx-6 text-violet-core sm:mx-10">✦</span>
          <span className="text-cream">{item.value}</span>
          <span className="ml-4 text-smoke [-webkit-text-stroke:1px_var(--color-stone)]">
            {item.label}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section
      className="marquee border-y border-cream/10 py-8 sm:py-10"
      aria-label="Track record: 748,882 PLUS points moved, 168 marketplace users, 95 P2P trades, 3 products live"
    >
      <div className="marquee-track">
        <Track />
        <Track hidden />
      </div>
    </section>
  );
}
