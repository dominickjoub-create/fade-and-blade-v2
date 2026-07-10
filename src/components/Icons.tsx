/* Crafted inline line icons (Lucide-style, stroke=currentColor, 1.6, 24×24).
   Replaces all emoji — the #1 "AI slop" tell. */

type IconProps = { className?: string; size?: number };

const svg = (size = 24) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor" as const,
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export function IconScissors({ className, size }: IconProps) {
  return (
    <svg {...svg(size)} className={className}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  );
}

export function IconFade({ className, size }: IconProps) {
  return (
    <svg {...svg(size)} className={className}>
      <line x1="4" y1="6.5" x2="20" y2="6.5" />
      <line x1="5.5" y1="11" x2="18.5" y2="11" />
      <line x1="8" y1="15.5" x2="16" y2="15.5" />
      <line x1="10.5" y1="19.5" x2="13.5" y2="19.5" />
    </svg>
  );
}

export function IconBeard({ className, size }: IconProps) {
  return (
    <svg {...svg(size)} className={className}>
      <path d="M5 5c3.5 2.5 10.5 2.5 14 0" />
      <path d="M6 8v2a6 6 0 0 0 12 0V8" />
      <path d="M9 13.5c1.2 2.4 4.8 2.4 6 0" />
      <path d="M12 15.5V19" />
    </svg>
  );
}

export function IconRazor({ className, size }: IconProps) {
  return (
    <svg {...svg(size)} className={className}>
      <path d="M3.5 20.5l4-4" />
      <path d="M8 16l7.5-7.5a2.5 2.5 0 0 1 3.5 3.5L11.5 19.5z" />
      <line x1="14" y1="10" x2="17" y2="13" />
    </svg>
  );
}

export function IconCrown({ className, size }: IconProps) {
  return (
    <svg {...svg(size)} className={className}>
      <path d="M2.5 7.5l4.5 4L12 5l5 6.5 4.5-4L19 19H5z" />
      <line x1="5" y1="19" x2="19" y2="19" />
    </svg>
  );
}

export function IconKid({ className, size }: IconProps) {
  return (
    <svg {...svg(size)} className={className}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </svg>
  );
}

export function IconPhone({ className, size }: IconProps) {
  return (
    <svg {...svg(size)} className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function IconPin({ className, size }: IconProps) {
  return (
    <svg {...svg(size)} className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/* Official WhatsApp glyph — filled brand green. */
export function IconWhatsApp({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#25D366" className={className} aria-hidden>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.449L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.599 5.303l-.999 3.648 3.889-.65zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

/* Service key -> icon map */
export const serviceIcons = {
  scissors: IconScissors,
  fade: IconFade,
  beard: IconBeard,
  razor: IconRazor,
  crown: IconCrown,
  kid: IconKid,
} as const;

export type ServiceIconKey = keyof typeof serviceIcons;
