import { site } from "@/lib/site";

/** Sticky Call / WhatsApp bar shown on small screens. */
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px bg-line shadow-[0_-8px_24px_rgba(0,0,0,0.5)] sm:hidden">
      <a href={`tel:${site.phoneTel}`} className="flex items-center justify-center gap-2 bg-ink-2 py-4 font-display text-sm uppercase tracking-[0.08em] text-ivory">
        <span aria-hidden>📞</span> Call
      </a>
      <a href={site.whatsapp} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 bg-ivory py-4 font-display text-sm uppercase tracking-[0.08em] text-ink">
        <span aria-hidden>💬</span> WhatsApp
      </a>
    </div>
  );
}
