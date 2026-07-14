import Finale from "@/components/Finale";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Pillars from "@/components/Pillars";
import SmoothScroll from "@/components/SmoothScroll";
import Stats from "@/components/Stats";
import Work from "@/components/Work";

export default function Home() {
  return (
    <SmoothScroll>
      <Nav />
      <main>
        <Hero />
        {/* Curtain: slides up over the pinned hero as it recedes */}
        <div className="relative z-10 -mt-[100vh] bg-ink">
          <Stats />
          <Pillars />
          <Work />
          <Finale />
        </div>
      </main>
      <div className="grain" aria-hidden />
    </SmoothScroll>
  );
}
