import { Nav } from "@/components/Nav";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { StatsBar } from "@/components/StatsBar";
import { Gallery } from "@/components/Gallery";
import { Reviews } from "@/components/Reviews";
import { Hours } from "@/components/Hours";
import { Visit } from "@/components/Visit";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";

function Rule() {
  return <div className="mx-auto max-w-6xl px-4 sm:px-8"><div className="hairline" /></div>;
}

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Rule />
        <About />
        <Rule />
        <Services />
        <Rule />
        <StatsBar />
        <Rule />
        <Gallery />
        <Rule />
        <Reviews />
        <Rule />
        <Hours />
        <Rule />
        <Visit />
      </main>
      <Footer />
      <MobileBar />
      {/* bottom spacing so mobile sticky bar never covers footer */}
      <div className="h-14 sm:hidden" />
    </>
  );
}
