import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import SectionHeading from '@/components/SectionHeading';
import { toast } from '@/hooks/use-toast';
import func2url from '../../backend/func2url.json';

type Review = {
  id: number;
  name: string;
  rating: number;
  text: string;
  created_at: string;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5 text-accent">
    {Array.from({ length: 5 }).map((_, i) => (
      <Icon key={i} name="Star" size={15} className={i < rating ? 'fill-accent' : 'text-muted-foreground/40'} />
    ))}
  </div>
);

export const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', text: '', rating: 5 });
  const [errors, setErrors] = useState<{ name?: string; text?: string }>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(func2url['reviews'])
      .then((r) => r.json())
      .then((json) => setReviews(json.items || []))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (form.name.trim().length < 2) next.name = 'Укажите имя';
    if (form.text.trim().length < 10) next.text = 'Напишите чуть подробнее (от 10 символов)';
    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    try {
      const res = await fetch(func2url['reviews'], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('request failed');
      setSent(true);
      toast({ title: 'Отзыв отправлен', description: 'Он появится на сайте после проверки модератором.' });
    } catch {
      toast({ title: 'Не удалось отправить отзыв', description: 'Попробуйте ещё раз чуть позже.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const field = 'w-full rounded-[var(--hero-radius)] bg-background px-4 py-3 text-[0.95rem] outline-none ring-accent transition placeholder:text-muted-foreground focus:ring-1';

  return (
    <section id="reviews" className="border-t bg-background px-5 py-20 lg:px-14 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          eyebrow="Отзывы"
          title={
            <>
              Что говорят <em className="font-medium italic text-accent">о фонде</em>
            </>
          }
          text="Отзывы от волонтёров, подопечных и партнёров — публикуем после проверки."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            {loading && (
              <div className="grid gap-6 sm:grid-cols-2">
                {[0, 1].map((i) => (
                  <div key={i} className="h-40 animate-pulse rounded-[var(--hero-radius)] bg-card shadow-[inset_0_0_0_1px_var(--hero-x-line)]" />
                ))}
              </div>
            )}

            {!loading && reviews.length === 0 && (
              <div className="reveal rounded-[var(--hero-radius)] bg-card p-10 text-center shadow-[inset_0_0_0_1px_var(--hero-x-line)]">
                <p className="text-muted-foreground">Пока нет опубликованных отзывов. Будьте первым!</p>
              </div>
            )}

            {!loading && reviews.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2">
                {reviews.map((r) => (
                  <article key={r.id} className="reveal rounded-[var(--hero-radius)] bg-card p-7 shadow-[inset_0_0_0_1px_var(--hero-x-line)]">
                    <Stars rating={r.rating} />
                    <p className="mt-4 text-[0.95rem] leading-relaxed text-foreground">{r.text}</p>
                    <div className="mt-5 border-t pt-4">
                      <div className="font-medium text-foreground">{r.name}</div>
                      <div className="text-[0.78rem] text-muted-foreground">{formatDate(r.created_at)}</div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="reveal rounded-[var(--hero-radius)] bg-card p-8 shadow-[inset_0_0_0_1px_var(--hero-x-line)] lg:p-10">
            {sent ? (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 animate-scale-in items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Icon name="Check" size={28} />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-foreground">Спасибо за отзыв</h3>
                <p className="mt-2 max-w-sm text-muted-foreground">
                  Он появится на сайте после проверки модератором.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: '', text: '', rating: 5 });
                  }}
                  className="mt-8 text-sm text-accent story-link"
                >
                  Оставить ещё один отзыв
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="space-y-5">
                <h3 className="font-display text-2xl font-bold text-foreground">Оставить отзыв</h3>

                <div>
                  <label htmlFor="rv-name" className="mb-1.5 block text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                    Ваше имя
                  </label>
                  <input
                    id="rv-name"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="Анна"
                    className={field}
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-accent">{errors.name}</p>}
                </div>

                <div>
                  <div className="mb-1.5 text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">Оценка</div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setForm({ ...form, rating: n })}
                        aria-label={`${n} из 5`}
                        className="p-0.5"
                      >
                        <Icon name="Star" size={24} className={n <= form.rating ? 'fill-accent text-accent' : 'text-muted-foreground/40'} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="rv-text" className="mb-1.5 block text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                    Ваш отзыв
                  </label>
                  <textarea
                    id="rv-text"
                    value={form.text}
                    onChange={(e) => {
                      setForm({ ...form, text: e.target.value });
                      setErrors({ ...errors, text: undefined });
                    }}
                    rows={4}
                    placeholder="Расскажите о своём опыте взаимодействия с фондом"
                    className={`${field} resize-none`}
                  />
                  {errors.text && <p className="mt-1.5 text-xs text-accent">{errors.text}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-[var(--hero-radius)] bg-accent px-6 py-3.5 font-semibold text-accent-foreground transition-transform hover:scale-[1.01] disabled:opacity-60"
                >
                  {submitting ? 'Отправка…' : 'Отправить отзыв'}
                </button>

                <p className="text-xs text-muted-foreground">
                  Отзыв опубликуется на сайте после проверки модератором.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
