import Icon from '@/components/ui/icon';
import SectionHeading from '@/components/SectionHeading';
import { CATALOG } from '@/data/site';

interface CatalogProps {
  onDonate: () => void;
}

export const Catalog = ({ onDonate }: CatalogProps) => (
  <section id="catalog" className="border-t bg-background px-5 py-20 lg:px-14 lg:py-28">
    <div className="mx-auto max-w-[1400px]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Каталог"
          title={
            <>
              Что можно <em className="font-medium italic text-accent">передать в дар</em>
            </>
          }
          text="Собираем вещи первой необходимости для семей, детей и пожилых людей. Ниже — категории, которые нужны прямо сейчас."
        />
        <button
          onClick={onDonate}
          className="reveal rounded-[var(--hero-radius)] bg-accent px-[22px] py-[11px] text-[0.9rem] font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
        >
          Передать вещи
        </button>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CATALOG.map((item) => (
          <div
            key={item.title}
            className="reveal rounded-[var(--hero-radius)] bg-card p-7 shadow-[inset_0_0_0_1px_var(--hero-x-line)] transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-[var(--hero-radius)] bg-muted text-accent">
                <Icon name={item.icon} size={20} fallback="Package" />
              </span>
              <span className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                {item.category}
              </span>
            </div>
            <h3 className="mt-5 font-display text-lg font-bold text-foreground">{item.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Catalog;
