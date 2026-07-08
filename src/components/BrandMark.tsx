/** Small crossed razor + scissors emblem used in nav and footer. */
export function BrandMark({ size = 30, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={className} role="img" aria-label="Nunus Barber emblem">
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="27" r="3.4" />
        <circle cx="12" cy="13" r="3.4" />
        <path d="M14.6 25 32 10" />
        <path d="M14.6 15 32 30" />
        <circle cx="32" cy="10" r="1" />
        <circle cx="32" cy="30" r="1" />
      </g>
    </svg>
  );
}
