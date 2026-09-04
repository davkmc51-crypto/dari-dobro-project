import { useEffect, useState } from 'react';
import SectionHeading from '@/components/SectionHeading';
import Icon from '@/components/ui/icon';
import { SOCIALS } from '@/data/site';
import func2url from '../../backend/func2url.json';

type VkPost = {
  id: number;
  text: string;
  date: number;
  photo: string | null;
  url: string;
};

type VkFeedResponse = {
  success: boolean;
  total_count: number;
  items: VkPost[];
  error?: string;
};

const vk = SOCIALS.find((s) => s.short === 'VK');

const formatDate = (unix: number) =>
  new Date(unix * 1000).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

export const VkFeed = () => {
  const [data, setData] = useState<VkFeedResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(func2url['vk-feed'])
      .then((r) => r.json())
      .then((json: VkFeedResponse) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setData({ success: false, total_count: 0, items: [] });
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const showFallback = !loading && (!data?.success || data.items.length === 0);

  return (
    <section id="vk-feed" className="border-t bg-muted/60 px-5 py-20 lg:px-14 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="ВКонтакте"
            title={
              <>
                Последние посты <em className="font-medium italic text-accent">из сообщества</em>
              </>
            }
            text={
              data?.success && data.total_count > 0
                ? `Всего в сообществе ${data.total_count.toLocaleString('ru-RU')} записей.`
                : undefined
            }
          />
          <a
            href={vk?.href}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal rounded-[var(--hero-radius)] px-5 py-3 text-[0.85rem] font-medium text-foreground shadow-[inset_0_0_0_1px_var(--hero-x-line)] transition-colors hover:bg-card"
          >
            Открыть сообщество
          </a>
        </div>

        {loading && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-[var(--hero-radius)] bg-card shadow-[inset_0_0_0_1px_var(--hero-x-line)]"
              />
            ))}
          </div>
        )}

        {!loading && !showFallback && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data!.items.map((post) => (
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal group flex flex-col overflow-hidden rounded-[var(--hero-radius)] bg-card shadow-[inset_0_0_0_1px_var(--hero-x-line)] transition-colors hover:bg-muted"
              >
                {post.photo && (
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.photo}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {formatDate(post.date)}
                  </span>
                  {post.text && (
                    <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-foreground">{post.text}</p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-2 text-sm text-accent">
                    Читать в ВК
                    <Icon name="ArrowUpRight" size={16} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        {showFallback && (
          <div className="reveal mt-12 overflow-hidden rounded-[var(--hero-radius)] bg-card p-10 text-center shadow-[inset_0_0_0_1px_var(--hero-x-line)]">
            <p className="text-muted-foreground">
              Не удалось загрузить последние посты. Загляните в сообщество —{' '}
              <a href={vk?.href} target="_blank" rel="noopener noreferrer" className="story-link text-accent">
                там всегда свежие новости
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default VkFeed;
