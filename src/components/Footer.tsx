import { KuskarDivider } from '@/components/Kuskar';
import { NAV, ORG, SOCIALS } from '@/data/site';

const go = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const Footer = () => (
  <footer className="grain relative bg-primary px-5 pb-8 pt-16 text-primary-foreground lg:px-14">
    <div className="mx-auto max-w-[1400px]">
      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <svg className="h-9 w-9" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <path
                d="M20 35C20 35 6 26.5 6 16.8 6 11.4 10 7.5 14.8 7.5c2.7 0 4.5 1.4 5.2 3.1.7-1.7 2.5-3.1 5.2-3.1C30 7.5 34 11.4 34 16.8 34 26.5 20 35 20 35Z"
                stroke="currentColor"
                strokeWidth="1.6"
                className="text-accent"
              />
              <path
                d="M20 27c-3.4-2.6-5-4.8-5-7 0-2 1.5-3.4 3.2-3.4 1 0 1.6.5 1.8 1.1.2-.6.8-1.1 1.8-1.1 1.7 0 3.2 1.4 3.2 3.4 0 2.2-1.6 4.4-5 7Z"
                fill="currentColor"
                style={{ color: 'var(--hero-x-ornament)' }}
              />
            </svg>
            <div>
              <div className="font-display text-xl font-bold leading-none">{ORG.name}</div>
              <div className="mt-1 text-[0.7rem] uppercase tracking-[0.16em] text-primary-foreground/60">
                Автономная некоммерческая организация
              </div>
            </div>
          </div>

          <p className="mt-5 max-w-md text-[0.92rem] text-primary-foreground/70">
            Оказываем социальную помощь в г. Октябрьский, Республика Башкортостан.
          </p>

          <div className="mt-6 flex gap-2.5">
            {SOCIALS.map((s) => (
              <a
                key={s.short}
                href={s.href}
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-[var(--hero-radius)] text-sm font-semibold shadow-[inset_0_0_0_1px_hsl(var(--primary-foreground)/0.3)] transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {s.short}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold">Разделы</h4>
          <ul className="mt-4 space-y-2.5 text-[0.92rem] text-primary-foreground/70">
            {NAV.map((n) => (
              <li key={n.href}>
                <button onClick={() => go(n.href)} className="story-link hover:text-primary-foreground">
                  {n.label}
                </button>
              </li>
            ))}
            <li>
              <button onClick={() => go('#gethelp')} className="story-link hover:text-primary-foreground">
                Получить помощь
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold">Документы</h4>
          <ul className="mt-4 space-y-2.5 text-[0.92rem] text-primary-foreground/70">
            <li>
              <a href="#" className="story-link hover:text-primary-foreground">
                Публичная оферта
              </a>
            </li>
            <li>
              <a href="#" className="story-link hover:text-primary-foreground">
                Политика конфиденциальности
              </a>
            </li>
            <li>
              <button onClick={() => go('#documents')} className="story-link hover:text-primary-foreground">
                Отчёты
              </button>
            </li>
          </ul>
          <p className="mt-5 text-[0.8rem] text-primary-foreground/55">
            ИНН {ORG.inn} · ОГРН {ORG.ogrn}
          </p>
        </div>
      </div>

      <KuskarDivider className="mx-auto mt-14 h-6 w-56 opacity-60" />

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-primary-foreground/15 pt-6 text-[0.85rem] text-primary-foreground/60">
        <span>© 2026 АНО «Дари Добро». Все права защищены.</span>
        <div className="flex gap-6">
          <a href="#" className="story-link hover:text-primary-foreground">
            Оферта
          </a>
          <a href="#" className="story-link hover:text-primary-foreground">
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
