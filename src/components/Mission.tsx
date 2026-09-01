import Icon from '@/components/ui/icon';
import SectionHeading from '@/components/SectionHeading';
import { DIRECTIONS, WHOM } from '@/data/site';

export const Mission = () => (
  <section id="mission" className="border-t bg-background px-5 py-20 lg:px-14 lg:py-28">
    <div className="mx-auto max-w-[1400px]">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <SectionHeading
          eyebrow="Наша миссия"
          title={
            <>
              Помощь должна быть <em className="font-medium italic text-accent">близкой</em> и понятной
            </>
          }
          text="Мы работаем в нескольких ключевых сферах, чтобы охватить как можно больше нуждающихся. АНО «Дари Добро» оказывает социальную помощь в городе Октябрьский Республики Башкортостан."
        />

        <div className="reveal grid gap-x-8 gap-y-7 sm:grid-cols-2">
          {DIRECTIONS.map((d) => (
            <div key={d.title} className="group">
              <div
                className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-[var(--hero-radius)] transition-colors group-hover:bg-accent group-hover:text-accent-foreground"
                style={{ background: 'hsl(var(--muted))' }}
              >
                <Icon name={d.icon} size={20} fallback="Heart" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">{d.title}</h3>
              <p className="mt-1.5 text-[0.95rem] text-muted-foreground">{d.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="reveal mt-20 border-t pt-10">
        <div className="mb-8 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
          Кому мы помогаем
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHOM.map((w) => (
            <div
              key={w.title}
              className="rounded-[var(--hero-radius)] bg-card p-6 shadow-[inset_0_0_0_1px_var(--hero-x-line)] transition-transform duration-300 hover:-translate-y-1"
            >
              <Icon name={w.icon} size={22} fallback="Users" className="text-accent" />
              <h3 className="mt-4 font-display text-lg font-bold text-foreground">{w.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{w.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Mission;