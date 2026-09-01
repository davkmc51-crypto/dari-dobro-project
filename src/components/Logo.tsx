import { ORG } from '@/data/site';

interface LogoProps {
  className?: string;
  inverted?: boolean;
}

export const Logo = ({ className = '', inverted = false }: LogoProps) => (
  <a href="#hero" className={`flex items-center gap-3 ${className}`}>
    <svg className="h-9 w-9 shrink-0" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M20 35C20 35 6 26.5 6 16.8 6 11.4 10 7.5 14.8 7.5c2.7 0 4.5 1.4 5.2 3.1.7-1.7 2.5-3.1 5.2-3.1C30 7.5 34 11.4 34 16.8 34 26.5 20 35 20 35Z"
        stroke="currentColor"
        strokeWidth="1.6"
        className="text-accent"
      />
      <path
        d="M20 27c-3.4-2.6-5-4.8-5-7 0-2 1.5-3.4 3.2-3.4 1 0 1.6.5 1.8 1.1.2-.6.8-1.1 1.8-1.1 1.7 0 3.2 1.4 3.2 3.4 0 2.2-1.6 4.4-5 7Z"
        fill="currentColor"
        style={{ color: 'var(--hero-x-ornament)' }}
      />
    </svg>
    <span className="leading-none">
      <span
        className={`block font-display text-[1.32rem] font-bold leading-none tracking-[0.01em] ${
          inverted ? 'text-primary-foreground' : 'text-foreground'
        }`}
      >
        {ORG.name}
      </span>
      <span
        className={`mt-[3px] block text-[0.62rem] uppercase tracking-[0.16em] ${
          inverted ? 'text-primary-foreground/60' : 'text-muted-foreground'
        }`}
      >
        {ORG.short}
      </span>
    </span>
  </a>
);

export default Logo;
