import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';
import func2url from '../../backend/func2url.json';

type Review = {
  id: number;
  name: string;
  rating: number;
  text: string;
  is_approved: boolean;
  created_at: string;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

export const ReviewsAdmin = () => {
  const [token, setToken] = useState('');
  const [authed, setAuthed] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async (t: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${func2url['reviews']}?all=1`, { headers: { 'X-Admin-Token': t } });
      if (res.status === 403) {
        setError('Неверный пароль');
        setAuthed(false);
        return;
      }
      const json = await res.json();
      setReviews(json.items || []);
      setAuthed(true);
      sessionStorage.setItem('reviews_admin_token', t);
    } catch {
      setError('Не удалось загрузить отзывы');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem('reviews_admin_token');
    if (saved) {
      setToken(saved);
      load(saved);
    }
  }, []);

  const setApproved = async (id: number, approved: boolean) => {
    await fetch(func2url['reviews'], {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Token': token },
      body: JSON.stringify({ id, is_approved: approved }),
    });
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, is_approved: approved } : r)));
    toast({ title: approved ? 'Отзыв опубликован' : 'Отзыв скрыт' });
  };

  const remove = async (id: number) => {
    await fetch(`${func2url['reviews']}?id=${id}`, {
      method: 'DELETE',
      headers: { 'X-Admin-Token': token },
    });
    setReviews((prev) => prev.filter((r) => r.id !== id));
    toast({ title: 'Отзыв удалён' });
  };

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40 px-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            load(token);
          }}
          className="w-full max-w-sm rounded-[var(--hero-radius)] bg-card p-8 shadow-[inset_0_0_0_1px_var(--hero-x-line)]"
        >
          <h1 className="font-display text-2xl font-bold text-foreground">Модерация отзывов</h1>
          <p className="mt-2 text-sm text-muted-foreground">Введите пароль администратора.</p>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Пароль"
            className="mt-6 w-full rounded-[var(--hero-radius)] bg-background px-4 py-3 text-[0.95rem] outline-none ring-accent transition focus:ring-1"
          />
          {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-[var(--hero-radius)] bg-accent px-6 py-3 font-semibold text-accent-foreground disabled:opacity-60"
          >
            {loading ? 'Проверка…' : 'Войти'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40 px-5 py-10 lg:px-14">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold text-foreground">Модерация отзывов</h1>
          <button
            onClick={() => {
              sessionStorage.removeItem('reviews_admin_token');
              setAuthed(false);
              setToken('');
            }}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Выйти
          </button>
        </div>

        {reviews.length === 0 && (
          <p className="mt-10 text-center text-muted-foreground">Отзывов пока нет.</p>
        )}

        <div className="mt-8 space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-[var(--hero-radius)] bg-card p-6 shadow-[inset_0_0_0_1px_var(--hero-x-line)]">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-foreground">{r.name}</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide ${
                        r.is_approved ? 'bg-accent/15 text-accent' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {r.is_approved ? 'опубликован' : 'на проверке'}
                    </span>
                  </div>
                  <div className="mt-1 flex gap-0.5 text-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon key={i} name="Star" size={14} className={i < r.rating ? 'fill-accent' : 'text-muted-foreground/40'} />
                    ))}
                  </div>
                  <div className="mt-1 text-[0.78rem] text-muted-foreground">{formatDate(r.created_at)}</div>
                </div>
                <div className="flex gap-2">
                  {!r.is_approved && (
                    <button
                      onClick={() => setApproved(r.id, true)}
                      className="inline-flex items-center gap-1.5 rounded-[var(--hero-radius)] bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
                    >
                      <Icon name="Check" size={16} />
                      Опубликовать
                    </button>
                  )}
                  {r.is_approved && (
                    <button
                      onClick={() => setApproved(r.id, false)}
                      className="inline-flex items-center gap-1.5 rounded-[var(--hero-radius)] px-4 py-2 text-sm font-medium text-foreground shadow-[inset_0_0_0_1px_var(--hero-x-line)]"
                    >
                      <Icon name="EyeOff" size={16} />
                      Скрыть
                    </button>
                  )}
                  <button
                    onClick={() => remove(r.id)}
                    className="inline-flex items-center gap-1.5 rounded-[var(--hero-radius)] px-4 py-2 text-sm font-medium text-destructive shadow-[inset_0_0_0_1px_var(--hero-x-line)]"
                  >
                    <Icon name="Trash2" size={16} />
                    Удалить
                  </button>
                </div>
              </div>
              <p className="mt-4 text-[0.95rem] text-foreground">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsAdmin;
