"use client";

import { motion } from "motion/react";
import { services } from "@/lib/site";
import { SectionHead } from "./SectionHead";
import { Stagger, staggerItem } from "./Reveal";

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-20 sm:px-8 sm:py-28">
      <SectionHead eyebrow="The Menu" title="Services & pricing" lead="Honest craft, fair prices." />

      {/* Phone: single stacked column. Desktop: grid. */}
      <Stagger className="mx-auto grid max-w-2xl grid-cols-1 gap-4 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <motion.article
            key={s.name}
            variants={staggerItem}
            whileHover={{ y: -5 }}
            className={`rounded-[var(--radius-card)] border p-8 ${
              s.feature ? "border-gold/45 bg-ink-3" : "border-line bg-ink-2"
            }`}
          >
            <div className="mb-2.5 flex items-center gap-3">
              <span className="text-2xl" aria-hidden>{s.icon}</span>
              <h3 className="font-display text-2xl uppercase tracking-[0.02em] text-ivory">{s.name}</h3>
            </div>
            <p className="text-[0.94rem] text-ivory-dim">{s.blurb}</p>
            {/* TODO: replace "from R___" with the real price */}
            <p className="mt-4 font-display text-2xl tracking-[0.02em] text-gold">from R___</p>
          </motion.article>
        ))}
      </Stagger>
    </section>
  );
}
