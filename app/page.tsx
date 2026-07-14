import Finale from "@/components/Finale";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import Work from "@/components/Work";

export default function Home() {
  return (
    <SmoothScroll>
      <Nav />
      <main>
        <Hero />
        {/* Curtain: slides up over the pinned hero as it recedes */}
        <div className="relative z-10 -mt-[100vh] bg-ink">
          <Marquee />
          <Manifesto />
          <Work />
          <Finale />
        </div>
      </main>
      <div className="grain" aria-hidden />
    </SmoothScroll>
  );
}
