import Icon from '@/components/ui/icon';
import SectionHeading from '@/components/SectionHeading';
import { CATALOG } from '@/data/site';

const catalogImages = import.meta.glob('../assets/catalog/*.jpg', { eager: true, import: 'default' }) as Record<string, string>;

const getImage = (name: string) => {
  const entry = Object.entries(catalogImages).find(([path]) => path.endsWith(`/${name}`));
  return entry?.[1] ?? '';
};

interface CatalogProps {
  onDonate: () => void;
}

export const Catalog = ({ onDonate }: CatalogProps) => (
  <section id="catalog" className="border-t bg-background px-5 py-20 lg:px-14 lg:py-28">
    <div className="mx-auto max-w-[1400px]">
      <SectionHeading
        eyebrow="Каталог"
        title={
          <>
            Каталог <em className="font-medium italic text-accent">добрых дел</em>
          </>
        }
        text="Форматы участия для тех, кто хочет начать помогать или быть в курсе того, как работает фонд."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {CATALOG.map((item) => (
          <article
            key={item.title}
            className="reveal flex flex-col overflow-hidden rounded-[var(--hero-radius)] bg-card shadow-[inset_0_0_0_1px_var(--hero-x-line)] transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="h-56 overflow-hidden" style={{ background: 'var(--hero-x-photo-tint)' }}>
              <img
                src={getImage(item.image)}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-7">
              <h3 className="font-display text-xl font-bold text-foreground">{item.title}</h3>
              <p className="mt-2.5 flex-1 text-[0.95rem] text-muted-foreground">{item.text}</p>
              <button
                onClick={onDonate}
                className="mt-6 inline-flex items-center justify-center gap-2 self-start rounded-[var(--hero-radius)] bg-accent px-6 py-3 text-[0.9rem] font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
              >
                {item.action}
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Catalog;
