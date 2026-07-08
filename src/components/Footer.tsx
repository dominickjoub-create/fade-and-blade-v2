import { site } from "@/lib/site";
import { BrandMark } from "./BrandMark";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-ink-2 px-4 pt-14 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-9 sm:grid-cols-2 md:grid-cols-4">
        <div className="text-gold">
          <BrandMark size={38} />
          <p className="mt-1 font-script text-3xl text-gold">Nunus Barber</p>
          <p className="mt-1.5 max-w-56 text-sm text-ivory-dim">{site.tagline}</p>
        </div>

        <div>
          <h4 className="mb-3.5 font-display text-[0.82rem] uppercase tracking-[0.14em] text-ivory">Hours</h4>
          <p className="mb-2 text-sm text-ivory-dim">Mon–Fri 09:00–18:00</p>
          <p className="mb-2 text-sm text-ivory-dim">Sat 08:00–15:30</p>
          <p className="text-sm text-ivory-dim">Sun 09:00–14:00</p>
        </div>

        <div>
          <h4 className="mb-3.5 font-display text-[0.82rem] uppercase tracking-[0.14em] text-ivory">Visit</h4>
          <p className="mb-2 text-sm text-ivory-dim">
            {site.address.line1},<br />
            {site.address.line2}
          </p>
          <p className="text-sm">
            <a href={`tel:${site.phoneTel}`} className="text-ivory-dim hover:text-gold-lite">{site.phoneDisplay}</a>
          </p>
        </div>

        <div>
          <h4 className="mb-3.5 font-display text-[0.82rem] uppercase tracking-[0.14em] text-ivory">Follow</h4>
          {/* TODO: add real Instagram / Facebook links */}
          <p className="mb-2 text-sm"><a href={site.socials.instagram} className="text-ivory-dim hover:text-gold-lite">Instagram</a></p>
          <p className="mb-2 text-sm"><a href={site.socials.facebook} className="text-ivory-dim hover:text-gold-lite">Facebook</a></p>
          <p className="text-sm"><a href={site.socials.google} target="_blank" rel="noopener" className="text-ivory-dim hover:text-gold-lite">Google</a></p>
        </div>
      </div>

      <p className="mx-auto mt-11 max-w-6xl border-t border-white/5 py-6 text-center text-xs text-ivory-faint">
        © 2026 {site.name} · Krugersdorp North. All rights reserved.
      </p>
    </footer>
  );
}
