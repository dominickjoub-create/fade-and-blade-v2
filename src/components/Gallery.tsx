"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { gallery } from "@/lib/site";
import { SectionHead } from "./SectionHead";
import { Stagger, staggerItem } from "./Reveal";

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length)),
    []
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  return (
    <section id="gallery" className="mx-auto max-w-6xl px-4 py-20 sm:px-8 sm:py-28">
      <SectionHead eyebrow="The Work" title="Gallery" lead="Fresh cuts and the room they're made in." />

      <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((g, i) => (
          <motion.button
            key={g.src}
            variants={staggerItem}
            whileHover={{ y: -4 }}
            onClick={() => setOpen(i)}
            className="group relative aspect-[6/7] overflow-hidden rounded-[24px] border border-line"
            aria-label={`View: ${g.alt}`}
          >
            <Image
              src={g.src}
              alt={g.alt}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
              className="object-cover grayscale-[0.12] transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
            />
            <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-ink/60 text-gold opacity-0 transition-opacity group-hover:opacity-100">
              ⤢
            </span>
          </motion.button>
        ))}
      </Stagger>

      {/* TODO: add more haircut photos to /public/images and to the `gallery` array in src/lib/site.ts */}

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <button className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-line text-2xl text-gold" aria-label="Close" onClick={() => setOpen(null)}>
              ×
            </button>
            <button className="absolute left-5 grid h-12 w-12 place-items-center rounded-full border border-line text-2xl text-gold" aria-label="Previous" onClick={(e) => { e.stopPropagation(); step(-1); }}>
              ‹
            </button>
            <motion.div
              key={open}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative h-[80vh] w-[90vw] max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={gallery[open].src} alt={gallery[open].alt} fill className="rounded-xl object-contain" sizes="90vw" />
            </motion.div>
            <button className="absolute right-5 grid h-12 w-12 place-items-center rounded-full border border-line text-2xl text-gold" aria-label="Next" onClick={(e) => { e.stopPropagation(); step(1); }}>
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
