import { useState } from 'react';
import Icon from '@/components/ui/icon';
import SectionHeading from '@/components/SectionHeading';
import { NEWS, NEWS_FILTERS } from '@/data/site';

const newsImages = import.meta.glob('../assets/news/*.webp', { eager: true, import: 'default' }) as Record<string, string>;

const getImage = (name: string) => {
  const entry = Object.entries(newsImages).find(([path]) => path.endsWith(`/${name}`));
  return entry?.[1] ?? '';
};

export const News = () => {
  const [filter, setFilter] = useState<string>('all');
  const items = filter === 'all' ? NEWS : NEWS.filter((n) => n.filter === filter);

  return (
    <section id="news" className="border-t bg-muted/60 px-5 py-20 lg:px-14 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Новости"
            title={
              <>
                Что происходит <em className="font-medium italic text-accent">каждый месяц</em>
              </>
            }
          />

          <div className="reveal flex flex-wrap gap-2">
            {NEWS_FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-[var(--hero-radius)] px-4 py-2 text-[0.85rem] font-medium transition-colors ${
                  filter === f.key
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-card text-muted-foreground shadow-[inset_0_0_0_1px_var(--hero-x-line)] hover:text-foreground'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((n) => (
            <a
              key={n.id}
              href={n.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group animate-fade-in overflow-hidden rounded-[var(--hero-radius)] bg-card shadow-[inset_0_0_0_1px_var(--hero-x-line)]"
            >
              <div className="h-48 overflow-hidden" style={{ background: 'var(--hero-x-photo-tint)' }}>
                <img
                  src={getImage(n.image)}
                  alt={n.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">{n.date}</div>
                <h3 className="mt-3 font-display text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
                  {n.title}
                </h3>
                <p className="mt-2 text-[0.92rem] text-muted-foreground">{n.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {n.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-[var(--hero-radius)] bg-muted px-2.5 py-1 text-[0.72rem] text-muted-foreground"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        {items.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">В этой рубрике пока нет публикаций.</p>
        )}

        <div className="reveal mt-10 flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="CalendarClock" size={16} className="text-accent" />
          Новости выходят не реже одного раза в месяц.
        </div>
      </div>
    </section>
  );
};

export default News;