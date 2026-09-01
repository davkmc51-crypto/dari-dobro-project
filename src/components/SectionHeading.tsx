import { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  align?: 'left' | 'center';
}

export const SectionHeading = ({ eyebrow, title, text, align = 'left' }: SectionHeadingProps) => (
  <div className={`reveal max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
    <div className={`eyebrow ${align === 'center' ? 'justify-center' : ''}`}>{eyebrow}</div>
    <h2 className="mt-4 font-display text-[2rem] font-bold leading-[1.1] text-foreground sm:text-[2.6rem]">
      {title}
    </h2>
    {text && <p className="mt-4 text-muted-foreground">{text}</p>}
  </div>
);

export default SectionHeading;
