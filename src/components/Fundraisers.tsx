import Icon from "@/components/ui/icon";
import SectionHeading from "@/components/SectionHeading";
import { FUNDRAISERS } from "@/data/site";

interface FundraisersProps {
  onDonate: () => void;
}

const fmt = (n: number) => n.toLocaleString("ru-RU");

export const Fundraisers = ({ onDonate }: FundraisersProps) => (
  <section
    id="fundraisers"
    className="border-t bg-muted/60 px-5 py-20 lg:px-14 lg:py-28"
  >
    <div className="mx-auto max-w-[1400px]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Открытые сборы"
          title={
            <>
              Что мы собираем{" "}
              <em className="font-medium italic text-accent">прямо сейчас</em>
            </>
          }
        />
        <button
          onClick={onDonate}
          className="reveal rounded-[var(--hero-radius)] bg-accent px-[22px] py-[11px] text-[0.9rem] font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
        >
          Поддержать сбор
        </button>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {FUNDRAISERS.map((f, i) => {
          const percent = Math.round((f.raised / f.goal) * 100);
          return (
            <article
              key={f.title}
              className="reveal flex flex-col rounded-[var(--hero-radius)] bg-card p-7 shadow-[inset_0_0_0_1px_var(--hero-x-line)] transition-transform duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                  {f.deadline}
                </span>
                {f.hot && (
                  <span className="rounded-[var(--hero-radius)] bg-accent px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-accent-foreground">
                    срочно
                  </span>
                )}
              </div>

              <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 flex-1 text-[0.95rem] text-muted-foreground">
                {f.desc}
              </p>

              <div className="mt-6 text-[0.9rem] text-foreground/80">
                <div>
                  Собрано <span className="font-bold text-foreground">{fmt(f.raised)}₽</span>
                </div>
                <div className="mt-1">
                  Требуется <span className="font-bold text-foreground">{fmt(f.goal)}₽</span>
                </div>
              </div>

              <div className="relative mt-3 h-6">
                <div className="h-6 w-full overflow-hidden rounded-full bg-emerald-100">
                  <i
                    className="block h-full rounded-full bg-emerald-400 transition-[width] duration-700"
                    style={{ width: `${Math.max(percent, 4)}%` }}
                  />
                </div>
                <span className="absolute left-0.5 top-1/2 flex h-5 -translate-y-1/2 items-center rounded-full bg-gradient-to-r from-violet-400 to-pink-400 px-2 text-[0.68rem] font-semibold text-white">
                  {percent}%
                </span>
              </div>

              <button
                onClick={onDonate}
                className="mt-5 rounded-full py-2.5 text-[0.85rem] font-bold uppercase tracking-wide text-white transition-colors hover:bg-pink-700 bg-red-600"
              >
                Помочь
              </button>
              <button
                onClick={onDonate}
                className="mt-2.5 rounded-full bg-sky-400 py-2.5 text-[0.85rem] font-bold uppercase tracking-wide text-white transition-colors hover:bg-sky-500"
              >
                Подробнее
              </button>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default Fundraisers;