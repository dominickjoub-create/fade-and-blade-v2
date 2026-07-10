import { site } from "@/lib/site";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";
import { Booking } from "./Booking";
import { IconPin, IconPhone, IconWhatsApp } from "./Icons";

export function Visit() {
  return (
    <section id="visit" className="mx-auto max-w-6xl px-4 py-20 sm:px-8 sm:py-28">
      <SectionHead eyebrow="Find Us" title="Location & booking" />
      <div className="grid items-start gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="space-y-6">
          <div className="overflow-hidden rounded-[var(--radius-card)] border border-line leading-none">
            <iframe
              title="Map to Nunus Barber Shop, Heritage Square, Cecil Knight St, Krugersdorp North"
              src={site.mapsEmbed}
              width="100%"
              height={320}
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <address className="not-italic text-ivory-dim">
            <p className="mb-2 font-script text-2xl text-ivory">{site.name}</p>
            <p className="mb-2">
              {site.address.line1},<br />
              {site.address.line2}
            </p>
            <p className="mb-2">
              Plus code: <strong className="text-ivory">{site.address.plusCode.split(" ")[0]}</strong> Krugersdorp North
            </p>
            <p>
              <a href={`tel:${site.phoneTel}`} className="border-b border-gold/35 text-gold-lite">{site.phoneDisplay}</a>
            </p>
          </address>

          <div className="flex flex-wrap gap-3">
            <a href={site.mapsQuery} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-display text-sm uppercase tracking-[0.06em] text-ivory transition-colors hover:border-gold hover:text-gold-lite">
              <IconPin size={18} /> Directions
            </a>
            <a href={`tel:${site.phoneTel}`} className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-display text-sm uppercase tracking-[0.06em] text-ivory transition-colors hover:border-gold hover:text-gold-lite">
              <IconPhone size={18} /> Call
            </a>
            <a href={site.whatsapp} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-ivory px-6 py-3 font-display text-sm uppercase tracking-[0.06em] text-ink transition-transform hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0">
              <IconWhatsApp size={18} /> WhatsApp
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Booking />
        </Reveal>
      </div>
    </section>
  );
}
