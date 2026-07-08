"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { reviews, site } from "@/lib/site";
import { SectionHead } from "./SectionHead";

export function Reviews() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % reviews.length), 6000);
    return () => clearInterval(t);
  }, [paused, reduce]);

  return (
    <section id="reviews" className="mx-auto max-w-6xl px-4 py-20 sm:px-8 sm:py-28">
      <SectionHead eyebrow="Word of Mouth" title="What clients say" />
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-2 text-sm">
          <span className="tracking-widest text-gold" aria-hidden>★★★★★</span>
          <strong className="font-display">{site.rating}</strong>
          <span className="text-ivory-dim">· {site.reviewCount} Google reviews</span>
        </div>
      </div>

      <div
        className="relative mx-auto flex min-h-[220px] max-w-3xl items-center justify-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="tracking-[0.25em] text-gold" aria-label="5 out of 5 stars">★★★★★</div>
            <blockquote className="font-script text-[clamp(1.4rem,3.4vw,2.1rem)] leading-snug text-ivory">
              “{reviews[i].text}”
            </blockquote>
            <figcaption className="font-display text-sm uppercase tracking-[0.16em] text-gold">
              — {reviews[i].name}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex justify-center gap-2.5" role="tablist" aria-label="Reviews">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            role="tab"
            aria-selected={idx === i}
            aria-label={`Review ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-2 rounded-full transition-all ${idx === i ? "w-6 bg-gold" : "w-2 bg-white/25"}`}
          />
        ))}
      </div>
    </section>
  );
}
