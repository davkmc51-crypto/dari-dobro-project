interface KuskarProps {
  className?: string;
}

/** Башкирский орнамент-кускар — вертикальная лоза с парными завитками. */
export const Kuskar = ({ className = '' }: KuskarProps) => (
  <svg
    className={className}
    viewBox="0 0 44 340"
    fill="none"
    aria-hidden="true"
    preserveAspectRatio="none"
    style={{ color: 'var(--hero-x-ornament)' }}
  >
    <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M22 8v324" />
      <path d="M22 40c-9 0-13-6-13-11s4-8 8-6 3 8-2 8" />
      <path d="M22 40c9 0 13-6 13-11s-4-8-8-6-3 8 2 8" />
      <path d="M22 132c-9 0-13-6-13-11s4-8 8-6 3 8-2 8" />
      <path d="M22 132c9 0 13-6 13-11s-4-8-8-6-3 8 2 8" />
      <path d="M22 224c-9 0-13-6-13-11s4-8 8-6 3 8-2 8" />
      <path d="M22 224c9 0 13-6 13-11s-4-8-8-6-3 8 2 8" />
      <path d="M22 316c-9 0-13-6-13-11s4-8 8-6 3 8-2 8" />
      <path d="M22 316c9 0 13-6 13-11s-4-8-8-6-3 8 2 8" />
    </g>
  </svg>
);

/** Горизонтальный кускар-разделитель для секций. */
export const KuskarDivider = ({ className = '' }: KuskarProps) => (
  <svg
    className={className}
    viewBox="0 0 240 24"
    fill="none"
    aria-hidden="true"
    style={{ color: 'var(--hero-x-ornament)' }}
  >
    <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <path d="M0 12h96M144 12h96" />
      <path d="M120 12c0-7-5-10-9-8s-2 7 3 6" />
      <path d="M120 12c0 7 5 10 9 8s2-7-3-6" />
      <path d="M120 12c0-7 5-10 9-8s2 7-3 6" />
      <path d="M120 12c0 7-5 10-9 8s-2-7 3-6" />
    </g>
  </svg>
);

export default Kuskar;
