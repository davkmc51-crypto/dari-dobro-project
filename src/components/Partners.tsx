import SectionHeading from '@/components/SectionHeading';
import { PARTNERS } from '@/data/site';

const partnerLogos = import.meta.glob('../assets/partner-*.png', { eager: true, import: 'default' }) as Record<string, string>;

const getLogo = (name?: string) => {
  if (!name) return '';
  const entry = Object.entries(partnerLogos).find(([path]) => path.endsWith(`/${name}`));
  return entry?.[1] ?? '';
};

export const Partners = () => (
  <section id="partners" className="border-t bg-background px-5 py-20 lg:px-14 lg:py-28">
    <div className="mx-auto max-w-[1400px]">
      <SectionHeading
        eyebrow="Партнёры"
        title={
          <>
            Рядом с нами — те, кто <em className="font-medium italic text-accent">помогает делом</em>
          </>
        }
        text="Компании и организации, которые поддерживают нашу миссию."
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--hero-radius)] bg-border sm:grid-cols-2 lg:grid-cols-4">
        {PARTNERS.map((p) => {
          const logo = getLogo(p.logo);
          return (
            <div key={p.name} className="reveal bg-card p-7 transition-colors hover:bg-muted">
              {logo ? (
                <img src={logo} alt={p.name} className="h-11 w-11 rounded-[var(--hero-radius)] object-cover" />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-[var(--hero-radius)] bg-muted font-display text-lg font-bold text-foreground">
                  {p.name[0]}
                </div>
              )}
              <h3 className="mt-4 font-display text-lg font-bold text-foreground">{p.name}</h3>
              <p className="mt-2 text-[0.92rem] text-muted-foreground">{p.contribution}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Partners;