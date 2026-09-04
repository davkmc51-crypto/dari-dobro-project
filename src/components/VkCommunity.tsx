import { useEffect, useState } from 'react';
import { KuskarDivider } from '@/components/Kuskar';
import { SOCIALS } from '@/data/site';
import func2url from '../../backend/func2url.json';

const vk = SOCIALS.find((s) => s.short === 'VK');

export const VkCommunity = () => {
  const [totalCount, setTotalCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(func2url['vk-feed'])
      .then((r) => r.json())
      .then((json) => {
        if (!cancelled && json.success) setTotalCount(json.total_count);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="border-t px-5 py-16 lg:px-14 lg:py-20 bg-slate-100">
      <div className="mx-auto max-w-[1400px]">
        <div className="grain relative overflow-hidden rounded-[var(--hero-radius)] px-6 py-12 text-primary-foreground sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-16 lg:py-14 bg-slate-400">
          <div className="flex items-center gap-5">
            <span
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[var(--hero-radius)] text-2xl font-bold shadow-[inset_0_0_0_1px_hsl(var(--primary-foreground)/0.3)]"
              style={{ background: '#0077FF', color: '#fff' }}
            >
              VK
            </span>
            <div>
              <div className="text-[0.72rem] uppercase tracking-[0.2em] text-primary-foreground/60 bg-transparent">
                Мы в соцсетях
              </div>
              <h3 className="mt-2 font-display text-[1.7rem] font-bold leading-[1.15] sm:text-[2.1rem]">
                Подпишитесь на наше сообщество{' '}
                <em className="font-medium italic" style={{ color: 'var(--hero-x-ornament)' }}>
                  ВКонтакте
                </em>
              </h3>
              <p className="mt-3 max-w-lg text-[0.95rem] text-primary-foreground/70">
                Публикуем новости, фото с мероприятий и истории тех, кому уже помогли.
                {totalCount ? ` Уже ${totalCount.toLocaleString('ru-RU')} записей в сообществе.` : ''}
              </p>
            </div>
          </div>

          <div className="mt-8 flex shrink-0 items-center gap-4 lg:mt-0">
            <KuskarDivider className="hidden h-6 w-24 opacity-60 lg:block" />
            <a
              href={vk?.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-[var(--hero-radius)] bg-accent px-7 py-3.5 font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
            >
              Подписаться
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VkCommunity;