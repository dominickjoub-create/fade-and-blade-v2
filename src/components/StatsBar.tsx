"use client";

import { motion } from "motion/react";
import { stats } from "@/lib/site";
import { CountUp } from "./CountUp";
import { Stagger, staggerItem } from "./Reveal";

export function StatsBar() {
  return (
    <section id="stats" className="mx-auto max-w-6xl px-4 py-16 sm:px-8" aria-label="Nunus Barber by the numbers">
      <Stagger className="grid grid-cols-2 gap-3 sm:gap-4">
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={staggerItem}
            className={`relative overflow-hidden rounded-[var(--radius-card)] border p-5 sm:p-9 ${
              s.feature ? "border-transparent text-ink" : "border-line bg-ink-2 text-ivory"
            }`}
            style={
              s.feature
                ? { background: "linear-gradient(135deg,var(--color-gold-lite),var(--color-gold) 55%,var(--color-gold-deep))" }
                : undefined
            }
          >
            {/* signature halftone motif on the featured card */}
            {s.feature && (
              <span
                aria-hidden
                className="pointer-events-none absolute right-0 top-0 h-[70%] w-[70%] opacity-25"
                style={{
                  backgroundImage: "radial-gradient(rgba(11,11,12,0.9) 30%, transparent 31%)",
                  backgroundSize: "11px 11px",
                  WebkitMaskImage: "radial-gradient(120% 120% at 100% 0,#000 6%,transparent 62%)",
                  maskImage: "radial-gradient(120% 120% at 100% 0,#000 6%,transparent 62%)",
                }}
              />
            )}
            <div className="relative flex items-start whitespace-nowrap font-display text-[clamp(2.15rem,9vw,5.2rem)] leading-[0.9] tracking-[0.01em]">
              <CountUp value={s.value} decimals={s.decimals ?? 0} />
              {s.suffix && (
                <span className={`ml-1 mt-2 text-[0.45em] ${s.feature ? "text-ink" : "text-gold"}`}>{s.suffix}</span>
              )}
            </div>
            <p className={`relative mt-2 font-display text-[0.8rem] uppercase tracking-[0.1em] ${s.feature ? "text-ink/75" : "text-ivory-dim"}`}>
              {s.label}
            </p>
          </motion.div>
        ))}
      </Stagger>
    </section>
  );
}
