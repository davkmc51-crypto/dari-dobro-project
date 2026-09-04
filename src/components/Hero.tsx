import { Kuskar } from '@/components/Kuskar';
import { FUNDRAISERS } from '@/data/site';
import heroIllustration from '@/assets/hero-illustration.png';

interface HeroProps {
  onDonate: () => void;
  onRequestHelp: () => void;
}

const fmt = (n: number) => n.toLocaleString('ru-RU');

export const Hero = ({ onDonate, onRequestHelp }: HeroProps) => (
  <section
    id="hero"
    className="grain relative flex min-h-svh flex-col justify-center px-5 pb-8 pt-28 lg:px-14 lg:pb-6 lg:pt-32"
  >
    <div className="mx-auto grid w-full max-w-[1400px] flex-1 content-center items-center gap-12 py-6 lg:grid-cols-[1fr_452px] lg:gap-14">
      <div className="animate-rise [animation-delay:0.08s]">
        <div className="eyebrow">Помощь рядом с домом</div>

        <h1 className="mt-[18px] font-display text-[2.6rem] font-bold leading-[1.06] tracking-[-0.005em] text-foreground sm:text-[3.4rem] lg:text-[62px]">
          Помогаем <em className="font-medium italic text-accent">менять</em>
          <br />
          жизни к лучшему
        </h1>

        <p className="mt-4 max-w-[46ch] text-[1.05rem] text-muted-foreground">
          <span className="font-medium text-foreground">Наша миссия</span> — создавать возможности для
          каждого, кто оказался в трудной ситуации. Мы верим, что доброта и поддержка могут изменить мир
          вокруг нас.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3.5">
          <button
            onClick={onDonate}
            className="inline-flex items-center justify-center rounded-[var(--hero-radius)] bg-accent px-[22px] py-[11px] text-[0.9rem] font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
          >
            Стать частью команды
          </button>
          <button
            onClick={onRequestHelp}
            className="inline-flex items-center justify-center rounded-[var(--hero-radius)] px-[22px] py-[11px] text-[0.9rem] font-semibold text-foreground shadow-[inset_0_0_0_1px_var(--hero-x-line)] transition-colors hover:bg-muted"
          >
            Нужна помощь?
          </button>
        </div>

        <p className="mt-4 text-[0.8rem] text-muted-foreground">
          Отчёты о работе организации публикуем в разделе «Документы и отчёты».
        </p>
      </div>

      <div className="relative mx-auto w-full max-w-[452px] animate-rise [animation-delay:0.18s]">
        <Kuskar className="absolute -left-[30px] top-6 hidden h-[340px] w-11 animate-draw sm:block" />

        <div
          className="h-[320px] w-full overflow-hidden shadow-[inset_0_0_0_1px_var(--hero-x-line)] sm:h-[402px]"
          style={{
            borderRadius: '226px 226px var(--hero-radius) var(--hero-radius)',
            background: '#ffffff',
          }}
        >
          <img
            src={heroIllustration}
            alt="Дари Добро"
            className="h-full w-full object-cover object-[50%_10%]"
            loading="eager"
          />
        </div>

        <div className="absolute -bottom-3.5 right-0 rounded-[var(--hero-radius)] bg-card px-[18px] py-3 text-[0.8rem] text-muted-foreground shadow-[inset_0_0_0_1px_var(--hero-x-line)] sm:-right-[18px]">
          <b className="block font-display text-[1.5em] font-bold leading-[1.1] text-foreground">
            Дари Добро
          </b>
          г. Октябрьский, Республика Башкортостан
        </div>
      </div>
    </div>

    <div className="mx-auto grid w-full max-w-[1400px] animate-rise items-end gap-6 border-t pt-4 [animation-delay:0.28s] lg:grid-cols-[repeat(3,1fr)_auto] lg:gap-[34px]">
      {FUNDRAISERS.map((f) => (
        <div key={f.title}>
          <div className="text-[0.95rem] font-medium text-foreground">{f.title}</div>
          <div
            className="mt-[7px] h-1 overflow-hidden rounded-sm"
            style={{ background: 'var(--hero-x-line)' }}
          >
            <i
              className="block h-full rounded-sm"
              style={{
                width: `${Math.round((f.raised / f.goal) * 100)}%`,
                background: f.hot ? 'var(--hero-accent)' : 'var(--hero-x-bar)',
              }}
            />
          </div>
          <div className="mt-2 flex justify-between gap-3 text-[0.78rem] text-muted-foreground">
            <span>
              {fmt(f.raised)} ₽ из {fmt(f.goal)} ₽
            </span>
            <span>{f.deadline}</span>
          </div>
        </div>
      ))}
      <div className="self-end pb-0.5 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground lg:text-right">
        Открытые сборы
      </div>
    </div>
  </section>
);

export default Hero;