import Icon from '@/components/ui/icon';
import { DIRECTIONS, WHOM } from '@/data/site';

export const Mission = () => (
  <section id="mission" className="border-t bg-background px-5 py-20 lg:px-14 lg:py-28">
    <div className="mx-auto max-w-[1400px]">
      <div className="reveal mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center rounded-full bg-accent px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-accent-foreground">
          Что мы делаем
        </span>
        <h2 className="mt-4 font-display text-[2rem] font-bold leading-[1.1] text-foreground sm:text-[2.6rem]">
          Наши направления помощи
        </h2>
        <p className="mt-4 text-muted-foreground">
          Мы работаем в нескольких ключевых сферах, чтобы охватить как можно больше нуждающихся.
        </p>
      </div>

      <div className="reveal mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {DIRECTIONS.map((d) => (
          <div
            key={d.title}
            className="rounded-[var(--hero-radius)] border-b-4 border-accent bg-card p-6 shadow-[inset_0_0_0_1px_var(--hero-x-line)] transition-transform duration-300 hover:-translate-y-1"
          >
            <div
              className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[var(--hero-radius)] text-xl"
              style={{ background: 'hsl(var(--muted))' }}
            >
              {d.emoji}
            </div>
            <h3 className="font-display text-lg font-bold text-foreground">{d.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{d.text}</p>
          </div>
        ))}
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