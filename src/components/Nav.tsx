"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { BrandMark } from "./BrandMark";

const links = [
  ["About", "#about"],
  ["Services", "#services"],
  ["Gallery", "#gallery"],
  ["Reviews", "#reviews"],
  ["Hours", "#hours"],
  ["Visit", "#visit"],
];

export function Nav() {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        condensed ? "bg-ink/85 backdrop-blur-md shadow-[0_1px_0_var(--color-line),0_10px_30px_rgba(0,0,0,0.45)] py-2" : "py-4"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 text-gold" aria-label={`${site.name} — home`}>
          <BrandMark />
          <span className="text-[1.15rem] font-semibold tracking-wide text-ivory">
            Nunus <span className="font-script text-[1.35rem] text-gold">Barber</span>
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="group relative font-display text-[0.82rem] uppercase tracking-[0.08em] text-ivory-dim transition-colors hover:text-ivory"
            >
              {label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener"
            className="rounded-full border border-gold px-5 py-2 font-display text-[0.8rem] uppercase tracking-[0.08em] text-gold-lite transition-colors hover:bg-gold hover:text-ink"
          >
            Book Now
          </a>
        </nav>

        {/* Hamburger */}
        <button
          className="flex flex-col gap-[5px] p-2 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-0.5 w-6 bg-ivory transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-ivory transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-ivory transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-[78vw] max-w-xs flex-col justify-center gap-7 border-l border-line bg-ink/97 px-10 backdrop-blur-lg transition-transform duration-400 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {links.map(([label, href]) => (
          <a
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className="font-display text-lg uppercase tracking-[0.1em] text-ivory-dim hover:text-gold"
          >
            {label}
          </a>
        ))}
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noopener"
          onClick={() => setOpen(false)}
          className="rounded-full border border-gold px-6 py-3 text-center font-display uppercase tracking-[0.08em] text-gold-lite"
        >
          Book Now
        </a>
      </div>
    </header>
  );
}
