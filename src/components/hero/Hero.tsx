"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";
import { GoldDust } from "./GoldDust";

/*
  Immersive scroll walkthrough built from the shop's REAL photos:
    Stage 1 — outside the storefront   (images/hero-entrance.jpg)
    Stage 2 — inside the shop          (images/hero-inside.jpg)
    Stage 3 — the chair / a fresh fade (images/hero-chair.jpg)
  Photos display clear (no dark overlay); text stays readable via shadow only.
  Opacities are computed as plain numbers from a single scroll-progress value so
  stages isolate cleanly. Per-image object-position keeps the subject in frame on
  mobile. Degrades to a warm gradient if photos are missing; respects
  prefers-reduced-motion.
*/

type Stage = {
  img: string;
  title: string;
  sub: string;
  script?: string;
  posMobile: string;
  posDesktop: string;
};

const stages: Stage[] = [
  { img: "/images/hero-entrance.jpg", title: "NUNUS BARBER SHOP", sub: site.tagline, script: "Nunus Barber", posMobile: "50% 45%", posDesktop: "50% 40%" },
  { img: "/images/hero-inside.jpg", title: "WHERE EVERY CUT", sub: "is a ritual", posMobile: "50% 50%", posDesktop: "50% 50%" },
  { img: "/images/hero-chair.jpg", title: "TAKE A SEAT", sub: "Hemza is ready for you", posMobile: "30% 45%", posDesktop: "42% 50%" },
];

// Trapezoid fade: 0 before a, ramp a→b, hold b→c, ramp down c→d, 0 after.
function trap(p: number, a: number, b: number, c: number, d: number) {
  if (p <= a || p >= d) return 0;
  if (p < b) return (p - a) / (b - a);
  if (p <= c) return 1;
  return 1 - (p - c) / (d - c);
}
// Starts fully visible, holds, then ramps down b→c.
function holdThenOut(p: number, b: number, c: number) {
  if (p < b) return 1;
  if (p >= c) return 0;
  return 1 - (p - b) / (c - b);
}
// Ramps in a→b, then holds at 1.
function inThenHold(p: number, a: number, b: number) {
  if (p <= a) return 0;
  if (p >= b) return 1;
  return (p - a) / (b - a);
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const [p, setP] = useState(0);
  const raf = useRef(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => setP(v));
  });
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  // Background photo opacities.
  const bg = reduce
    ? [1, 0, 0]
    : [holdThenOut(p, 0.28, 0.34), trap(p, 0.3, 0.38, 0.62, 0.68), inThenHold(p, 0.66, 0.72)];

  // Text stage opacities.
  const text = reduce
    ? [1, 0, 0]
    : [holdThenOut(p, 0.24, 0.3), trap(p, 0.36, 0.42, 0.58, 0.63), inThenHold(p, 0.7, 0.76)];

  const stageNum = p < 0.34 ? 0 : p < 0.66 ? 1 : 2;
  const shadow = { textShadow: "0 2px 18px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.95)" };

  return (
    <section id="top" ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-ink">
        {/* Warm gradient fallback (only visible if a photo is missing) */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(70% 55% at 50% 20%, #241a10, transparent 60%), linear-gradient(180deg,#0d0b09,#0b0b0c)" }} />

        {/* Real-shop photos — no dark overlay */}
        {stages.map((s, i) => (
          <div key={s.img} className="absolute inset-0" style={{ opacity: bg[i] }}>
            <Image
              src={s.img}
              alt=""
              fill
              priority={i === 0}
              quality={95}
              sizes="100vw"
              className="object-cover [object-position:var(--pm)] sm:[object-position:var(--pd)]"
              style={{ "--pm": s.posMobile, "--pd": s.posDesktop } as React.CSSProperties}
            />
          </div>
        ))}

        {/* Gold dust drifting in the light */}
        <GoldDust />

        {/* Text stages */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="relative flex min-h-[13rem] w-full items-center justify-center">
            {stages.map((stage, i) => (
              <div key={i} style={{ opacity: text[i] }} className="absolute inset-0 flex flex-col items-center justify-center">
                {stage.script && <span className="mb-3 font-script text-3xl text-gold-lite sm:text-5xl" style={shadow}>{stage.script}</span>}
                <h1 className="font-display text-[clamp(2.2rem,8.5vw,6rem)] uppercase leading-[0.92] tracking-[0.02em] text-white" style={shadow}>
                  {stage.title}
                </h1>
                <p className="mt-2 font-script text-2xl text-gold-lite sm:text-3xl" style={shadow}>{stage.sub}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm backdrop-blur-sm">
            <span className="tracking-widest text-gold" aria-hidden>★★★★★</span>
            <strong className="font-display">{site.rating}</strong>
            <span className="text-ivory">· {site.reviewCount} Google reviews</span>
          </div>
        </div>

        {/* Progress + stage counter */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
          <div className="font-display text-xs uppercase tracking-[0.3em] text-white" style={shadow}>0{stageNum + 1} / 03</div>
          <div className="h-px w-40 overflow-hidden bg-white/25">
            <div className="h-full bg-gold" style={{ width: `${Math.round(p * 100)}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
