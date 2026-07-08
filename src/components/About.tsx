import Image from "next/image";
import { about } from "@/lib/site";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:px-8 sm:py-28">
      <SectionHead eyebrow="The Shop" title="A cut above, the old-fashioned way" />
      <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <Reveal className="space-y-4 text-ivory-dim">
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <ul className="mt-6 space-y-3">
            {["Generational loyalty & genuine care", "Meticulous fades, tapers & classic scissor work", "Spotless, well-organised, relaxed atmosphere"].map(
              (item) => (
                <li key={item} className="relative pl-7 text-ivory-dim">
                  <span className="absolute left-0 text-gold">✦</span>
                  {item}
                </li>
              )
            )}
          </ul>
        </Reveal>

        <Reveal delay={0.15} className="relative mx-auto w-full max-w-sm">
          <div className="relative aspect-[64/76] overflow-hidden rounded-[24px] border border-line">
            <Image
              src="/images/cut-1.jpg"
              alt="Inside Nunus Barber Shop"
              fill
              sizes="(max-width: 768px) 90vw, 420px"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-4 rounded-2xl border border-line border-t-2 border-t-gold bg-ink-3 px-5 py-3 text-center">
            <strong className="block font-display text-2xl text-ivory">{about.statValue}</strong>
            <span className="text-[0.7rem] uppercase tracking-[0.14em] text-ivory-dim">{about.statLabel}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
