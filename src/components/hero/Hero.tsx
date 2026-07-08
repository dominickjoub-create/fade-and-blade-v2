"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

const stages = [
  { title: "NUNUS BARBER SHOP", sub: site.tagline },
  { title: "WHERE EVERY CUT", sub: "is a ritual" },
  { title: "TAKE A SEAT", sub: "Hemza is ready for you" },
];

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [webgl, setWebgl] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setWebgl(hasWebGL() && !reduce);
    setReady(true);
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Per-stage opacity as the journey advances.
  const s1 = useTransform(scrollYProgress, [0.0, 0.12, 0.26, 0.34], [1, 1, 1, 0]);
  const s2 = useTransform(scrollYProgress, [0.34, 0.42, 0.58, 0.66], [0, 1, 1, 0]);
  const s3 = useTransform(scrollYProgress, [0.66, 0.74, 1], [0, 1, 1]);
  const opacities = [s1, s2, s3];

  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const stageIndex = useTransform(scrollYProgress, (v) => (v < 0.34 ? 0 : v < 0.66 ? 1 : 2));
  const [stageNum, setStageNum] = useState(0);
  useEffect(() => stageIndex.on("change", (v) => setStageNum(v as number)), [stageIndex]);

  return (
    <section id="top" ref={ref} className="relative h-[320vh]">
      {/* Sticky viewport that holds the 3D scene + overlaid text */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Static fallback background (always present, sits behind canvas) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 55% at 50% 20%, #241a10, transparent 60%), radial-gradient(60% 50% at 50% 90%, #17110a, transparent 70%), linear-gradient(180deg,#0d0b09,#08080a 70%,#0b0b0c)",
          }}
        />

        {ready && webgl && (
          <div className="absolute inset-0">
            <Scene3D progress={scrollYProgress} />
          </div>
        )}

        {/* subtle top/bottom scrims to seat the text */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,10,0.5),transparent_35%,transparent_65%,rgba(8,8,10,0.85))]" />

        {/* Text stages */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="relative flex min-h-[13rem] items-center justify-center">
            {stages.map((stage, i) => (
              <motion.div
                key={i}
                style={{ opacity: reduce ? (i === 0 ? 1 : 0) : opacities[i] }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                {i === 0 && (
                  <span className="mb-4 font-script text-4xl text-gold sm:text-5xl">Nunus Barber</span>
                )}
                <h1 className="font-display text-[clamp(2.4rem,9vw,6rem)] uppercase leading-[0.92] tracking-[0.02em] text-ivory">
                  {stage.title}
                </h1>
                <p className="mt-3 font-script text-2xl text-gold-lite sm:text-3xl">{stage.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA appears on the final stage */}
          <motion.div style={{ opacity: reduce ? 1 : s3 }} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener"
              className="rounded-full bg-ivory px-7 py-3.5 font-display text-sm uppercase tracking-[0.06em] text-ink transition-transform hover:-translate-y-0.5"
            >
              💬 Book on WhatsApp
            </a>
            <a
              href={`tel:${site.phoneTel}`}
              className="rounded-full border border-line px-7 py-3.5 font-display text-sm uppercase tracking-[0.06em] text-ivory transition-colors hover:border-gold hover:text-gold-lite"
            >
              📞 Call Now
            </a>
          </motion.div>

          {/* Rating badge */}
          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-2 text-sm">
            <span className="tracking-widest text-gold" aria-hidden>★★★★★</span>
            <strong className="font-display">{site.rating}</strong>
            <span className="text-ivory-dim">· {site.reviewCount} Google reviews</span>
          </div>
        </div>

        {/* Scroll progress + stage counter */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
          <div className="font-display text-xs uppercase tracking-[0.3em] text-ivory-dim">
            0{stageNum + 1} / 03
          </div>
          <div className="h-px w-40 overflow-hidden bg-white/15">
            <motion.div className="h-full bg-gold" style={{ width: barWidth }} />
          </div>
        </div>
      </div>
    </section>
  );
}
