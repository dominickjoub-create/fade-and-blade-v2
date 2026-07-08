"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import { site } from "@/lib/site";
import { GoldDust } from "./GoldDust";

/*
  Immersive scroll walkthrough built from the shop's REAL photos:
    Stage 1 — outside the storefront   (images/hero-entrance.jpg)
    Stage 2 — inside the shop          (images/hero-inside.jpg)
    Stage 3 — the chair / a fresh fade (images/hero-chair.jpg)
  Each stage cross-fades + slow-zooms as you scroll, with gold dust drifting
  over a warm scrim so the text stays readable. Degrades to a dark gradient
  if the photos are missing, and respects prefers-reduced-motion.

  TODO(you): drop these three files into /public/images:
    hero-entrance.jpg  · the storefront walk-in shot
    hero-inside.jpg    · the wide interior shot
    hero-chair.jpg     · the barber giving a fade
*/

const stages = [
  { img: "/images/hero-entrance.jpg", title: "NUNUS BARBER SHOP", sub: site.tagline, script: "Nunus Barber" },
  { img: "/images/hero-inside.jpg", title: "WHERE EVERY CUT", sub: "is a ritual" },
  { img: "/images/hero-chair.jpg", title: "TAKE A SEAT", sub: "Hemza is ready for you" },
];

function StageImage({
  src,
  opacity,
  scale,
  priority,
}: {
  src: string;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  priority?: boolean;
}) {
  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image
          src={src}
          alt=""
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
          style={{ filter: "brightness(0.55) contrast(1.05) saturate(0.9)" }}
        />
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Cross-fade opacities per stage.
  const o1 = useTransform(scrollYProgress, [0.0, 0.06, 0.28, 0.36], [1, 1, 1, 0]);
  const o2 = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
  const o3 = useTransform(scrollYProgress, [0.64, 0.74, 1], [0, 1, 1]);
  const stageOpacity = [o1, o2, o3];

  // Gentle Ken Burns zoom per stage.
  const z1 = useTransform(scrollYProgress, [0, 0.36], [1.06, 1.2]);
  const z2 = useTransform(scrollYProgress, [0.3, 0.7], [1.12, 1.2]);
  const z3 = useTransform(scrollYProgress, [0.64, 1], [1.08, 1.18]);
  const stageScale = [z1, z2, z3];

  // Text opacities.
  const t1 = useTransform(scrollYProgress, [0.0, 0.1, 0.26, 0.34], [1, 1, 1, 0]);
  const t2 = useTransform(scrollYProgress, [0.34, 0.42, 0.58, 0.66], [0, 1, 1, 0]);
  const t3 = useTransform(scrollYProgress, [0.66, 0.74, 1], [0, 1, 1]);
  const textOpacity = [t1, t2, t3];

  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const stageIndex = useTransform(scrollYProgress, (v) => (v < 0.34 ? 0 : v < 0.66 ? 1 : 2));
  const [stageNum, setStageNum] = useState(0);
  useEffect(() => stageIndex.on("change", (v) => setStageNum(v as number)), [stageIndex]);

  return (
    <section id="top" ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Warm gradient fallback (always behind the photos) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 55% at 50% 20%, #241a10, transparent 60%), linear-gradient(180deg,#0d0b09,#08080a 70%,#0b0b0c)",
          }}
        />

        {/* Real-shop photo stages */}
        {stages.map((s, i) => (
          <StageImage key={s.img} src={s.img} opacity={stageOpacity[i]} scale={stageScale[i]} priority={i === 0} />
        ))}

        {/* Warm scrim for legibility */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,10,0.55),rgba(8,8,10,0.25)_38%,rgba(8,8,10,0.85))]" />
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(80% 60% at 50% 45%, transparent, rgba(8,8,10,0.55))" }} />

        {/* Gold dust drifting in the light */}
        <GoldDust />

        {/* Text stages */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="relative flex min-h-[13rem] items-center justify-center">
            {stages.map((stage, i) => (
              <motion.div
                key={i}
                style={{ opacity: reduce ? (i === 0 ? 1 : 0) : textOpacity[i] }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                {stage.script && <span className="mb-4 font-script text-4xl text-gold sm:text-5xl">{stage.script}</span>}
                <h1 className="font-display text-[clamp(2.4rem,9vw,6rem)] uppercase leading-[0.92] tracking-[0.02em] text-ivory drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
                  {stage.title}
                </h1>
                <p className="mt-3 font-script text-2xl text-gold-lite sm:text-3xl">{stage.sub}</p>
              </motion.div>
            ))}
          </div>

          <motion.div style={{ opacity: reduce ? 1 : t3 }} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={site.whatsapp} target="_blank" rel="noopener" className="rounded-full bg-ivory px-7 py-3.5 font-display text-sm uppercase tracking-[0.06em] text-ink transition-transform hover:-translate-y-0.5">
              💬 Book on WhatsApp
            </a>
            <a href={`tel:${site.phoneTel}`} className="rounded-full border border-line bg-black/30 px-7 py-3.5 font-display text-sm uppercase tracking-[0.06em] text-ivory backdrop-blur-sm transition-colors hover:border-gold hover:text-gold-lite">
              📞 Call Now
            </a>
          </motion.div>

          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-line bg-black/30 px-4 py-2 text-sm backdrop-blur-sm">
            <span className="tracking-widest text-gold" aria-hidden>★★★★★</span>
            <strong className="font-display">{site.rating}</strong>
            <span className="text-ivory-dim">· {site.reviewCount} Google reviews</span>
          </div>
        </div>

        {/* Progress + stage counter */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
          <div className="font-display text-xs uppercase tracking-[0.3em] text-ivory-dim">0{stageNum + 1} / 03</div>
          <div className="h-px w-40 overflow-hidden bg-white/15">
            <motion.div className="h-full bg-gold" style={{ width: barWidth }} />
          </div>
        </div>
      </div>
    </section>
  );
}
