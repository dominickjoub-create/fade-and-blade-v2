"use client";

import { motion } from "motion/react";
import { services } from "@/lib/site";
import { serviceIcons } from "./Icons";
import { SectionHead } from "./SectionHead";
import { Stagger, staggerItem } from "./Reveal";

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-20 sm:px-8 sm:py-28">
      <SectionHead eyebrow="The Menu" title="Services & pricing" lead="Honest craft, fair prices." />

      {/* Phone: single stacked column. Desktop: grid. */}
      <Stagger className="mx-auto grid max-w-2xl grid-cols-1 gap-4 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const Icon = serviceIcons[s.icon];
          return (
            <motion.article
              key={s.name}
              variants={staggerItem}
              whileHover={{ y: -5 }}
              className={`group relative flex flex-col rounded-[var(--radius-card)] border p-7 sm:p-8 ${
                s.feature ? "border-gold/50 bg-ink-3" : "border-line bg-ink-2"
              }`}
            >
              {s.feature && (
                <span className="absolute -top-3 right-6 rounded-full bg-gold px-3 py-1 font-display text-[0.62rem] uppercase tracking-[0.16em] text-ink">
                  Most booked
                </span>
              )}

              <div className="mb-5 flex items-center justify-between">
                {/* Gold-framed icon tile — fills gold on hover */}
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-gold/45 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
                  <Icon size={22} />
                </span>
                <span className="font-display text-2xl tracking-[0.02em] text-gold">{s.price}</span>
              </div>

              <h3 className="font-display text-2xl uppercase leading-none tracking-[0.02em] text-ivory">{s.name}</h3>
              <p className="mt-2.5 text-[0.94rem] text-ivory-dim">{s.blurb}</p>
            </motion.article>
          );
        })}
      </Stagger>
    </section>
  );
}
