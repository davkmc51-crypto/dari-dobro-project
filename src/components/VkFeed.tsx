import { useEffect } from 'react';
import SectionHeading from '@/components/SectionHeading';
import { SOCIALS } from '@/data/site';

declare global {
  interface Window {
    VK?: {
      Widgets: {
        Group: (id: string, options: Record<string, unknown>, groupId: number) => void;
      };
    };
  }
}

const VK_GROUP_ID = 214730320;
const WIDGET_ID = 'vk_community_widget';

let vkScriptPromise: Promise<void> | null = null;

const loadVkScript = () => {
  if (window.VK) return Promise.resolve();
  if (vkScriptPromise) return vkScriptPromise;
  vkScriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://vk.com/js/api/openapi.js?169';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Не удалось загрузить виджет VK'));
    document.body.appendChild(script);
  });
  return vkScriptPromise;
};

const vk = SOCIALS.find((s) => s.short === 'VK');

export const VkFeed = () => {
  useEffect(() => {
    let cancelled = false;
    loadVkScript()
      .then(() => {
        if (cancelled || !window.VK) return;
        window.VK.Widgets.Group(WIDGET_ID, { mode: 2, wide: 1, no_cover: 0 }, VK_GROUP_ID);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

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

        <div className="reveal mt-12 overflow-hidden rounded-[var(--hero-radius)] bg-card p-1 shadow-[inset_0_0_0_1px_var(--hero-x-line)] sm:p-2">
          <div id={WIDGET_ID} className="min-h-[420px]" />
          <noscript>
            <p className="p-6 text-center text-muted-foreground">
              Включите JavaScript, чтобы увидеть ленту сообщества, или{' '}
              <a href={vk?.href} className="story-link text-accent">
                откройте его ВКонтакте
              </a>
              .
            </p>
          </noscript>
        </div>
      </div>
    </section>
  );
};

export default VkFeed;
