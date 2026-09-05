import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import useCountUp from '@/hooks/use-count-up';
import { FUNDRAISERS } from '@/data/site';
import func2url from '../../backend/func2url.json';

const fmt = (n: number) => n.toLocaleString('ru-RU');

const fallbackTotal = FUNDRAISERS.reduce((sum, f) => sum + f.raised, 0);

export const TotalRaised = () => {
  const [total, setTotal] = useState(fallbackTotal);

  useEffect(() => {
    fetch(func2url.donations)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.total === 'number') setTotal(data.total);
      })
      .catch(() => {});
  }, []);

  const { ref, value } = useCountUp(total);

  return (
    <section className="border-t bg-primary px-5 py-14 text-primary-foreground lg:px-14">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="reveal mx-auto flex max-w-[1400px] flex-col items-center gap-3 text-center"
      >
        <div className="flex items-center gap-2 text-[0.76rem] uppercase tracking-[0.2em] text-primary-foreground/60">
          <Icon name="HeartHandshake" size={16} style={{ color: 'var(--hero-x-ornament)' }} />
          Собрано всеми сборами вместе
        </div>
        <div className="font-display text-[2.6rem] font-bold leading-none sm:text-[3.6rem]">
          {fmt(value)} ₽
        </div>
        <p className="max-w-md text-[0.9rem] text-primary-foreground/70">
          Общая сумма пожертвований по всем открытым сборам — спасибо каждому, кто помогает!
        </p>
      </div>
    </section>
  );
};

export default TotalRaised;