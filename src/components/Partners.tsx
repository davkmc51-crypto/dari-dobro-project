import SectionHeading from '@/components/SectionHeading';
import { PARTNERS } from '@/data/site';

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
        text="Компании и учреждения города, без которых наши программы не работали бы."
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--hero-radius)] bg-border sm:grid-cols-2 lg:grid-cols-3">
        {PARTNERS.map((p) => (
          <div key={p.name} className="reveal bg-card p-7 transition-colors hover:bg-muted">
            <h3 className="font-display text-lg font-bold text-foreground">{p.name}</h3>
            <p className="mt-2 text-[0.92rem] text-muted-foreground">{p.contribution}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Partners;
