import Icon from '@/components/ui/icon';
import { KuskarDivider } from '@/components/Kuskar';
import { HELP_WAYS } from '@/data/site';

interface HowToHelpProps {
  onDonate: () => void;
  onVolunteer: () => void;
}

export const HowToHelp = ({ onDonate, onVolunteer }: HowToHelpProps) => (
  <section id="help" className="grain relative border-t bg-primary px-5 py-20 text-primary-foreground lg:px-14 lg:py-28">
    <div className="mx-auto max-w-[1400px]">
      <div className="reveal max-w-3xl">
        <div className="flex items-center gap-3 text-[0.76rem] uppercase tracking-[0.2em] text-primary-foreground/60">
          Как помочь
          <span className="h-px flex-1 bg-primary-foreground/25" />
        </div>
        <h2 className="mt-4 font-display text-[2rem] font-bold leading-[1.1] sm:text-[2.6rem]">
          Помогать можно деньгами, руками и{' '}
          <em className="font-medium italic" style={{ color: 'var(--hero-x-ornament)' }}>
            вниманием
          </em>
        </h2>
        <p className="mt-4 text-primary-foreground/70">
          Выберите способ, который вам ближе. Любая помощь становится конкретным делом уже на этой неделе.
        </p>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--hero-radius)] bg-primary-foreground/15 sm:grid-cols-2 lg:grid-cols-3">
        {HELP_WAYS.map((w) => (
          <div key={w.title} className="reveal bg-primary p-8 transition-colors hover:bg-primary-foreground/5">
            <Icon name={w.icon} size={22} fallback="Heart" style={{ color: 'var(--hero-x-ornament)' }} />
            <h3 className="mt-5 font-display text-xl font-bold">{w.title}</h3>
            <p className="mt-2 text-[0.93rem] text-primary-foreground/70">{w.text}</p>
          </div>
        ))}
      </div>

      <div className="reveal mt-14 flex flex-col items-center gap-6">
        <KuskarDivider className="h-6 w-60 opacity-70" />
        <div className="flex flex-wrap justify-center gap-3.5">
          <button
            onClick={onDonate}
            className="rounded-[var(--hero-radius)] bg-accent px-7 py-3.5 font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
          >
            Сделать пожертвование
          </button>
          <button
            onClick={onVolunteer}
            className="rounded-[var(--hero-radius)] px-7 py-3.5 font-semibold text-primary-foreground shadow-[inset_0_0_0_1px_hsl(var(--primary-foreground)/0.35)] transition-colors hover:bg-primary-foreground/10"
          >
            Стать волонтёром
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default HowToHelp;