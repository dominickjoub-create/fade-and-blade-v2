import { Reveal } from "./Reveal";

export function SectionHead({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
      <Reveal>
        <p className="mb-3 font-display text-xs uppercase tracking-[0.34em] text-gold">{eyebrow}</p>
        <h2 className="font-display text-[clamp(2rem,6vw,3.4rem)] uppercase leading-[0.95] tracking-[0.02em] text-ivory">
          {title}
        </h2>
        {lead && <p className="mt-4 text-ivory-dim">{lead}</p>}
      </Reveal>
    </div>
  );
}
