import { ORG } from '@/data/site';
import logoIcon from '@/assets/logo-icon.png';

interface LogoProps {
  className?: string;
  inverted?: boolean;
}

export const Logo = ({ className = '', inverted = false }: LogoProps) => (
  <a href="#hero" className={`flex items-center gap-3 ${className}`}>
    <img src={logoIcon} alt={ORG.name} className="h-9 w-9 shrink-0 object-contain" />
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