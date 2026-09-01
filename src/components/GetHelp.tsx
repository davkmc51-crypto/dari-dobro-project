import { useState } from 'react';
import Icon from '@/components/ui/icon';
import SectionHeading from '@/components/SectionHeading';
import { HELP_STEPS } from '@/data/site';
import { toast } from '@/hooks/use-toast';

type Errors = Partial<Record<'name' | 'phone' | 'message', string>>;

export const GetHelp = () => {
  const [form, setForm] = useState({ name: '', phone: '', category: 'Продукты и вещи', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [k]: e.target.value });
    setErrors({ ...errors, [k]: undefined });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = 'Укажите имя';
    if (form.phone.replace(/\D/g, '').length < 10) next.phone = 'Укажите телефон для связи';
    if (form.message.trim().length < 10) next.message = 'Опишите ситуацию подробнее (от 10 символов)';
    setErrors(next);
    if (Object.keys(next).length) return;

    setSent(true);
    toast({
      title: 'Заявка принята',
      description: 'Мы свяжемся с вами в рабочие часы, обычно в течение одного дня.',
    });
  };

  const field = 'w-full rounded-[var(--hero-radius)] bg-background px-4 py-3 text-[0.95rem] outline-none ring-accent transition placeholder:text-muted-foreground focus:ring-1';

  return (
    <section id="gethelp" className="border-t bg-muted/60 px-5 py-20 lg:px-14 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Получить помощь"
              title={
                <>
                  Если сейчас трудно — <em className="font-medium italic text-accent">напишите нам</em>
                </>
              }
              text="Мы помогаем жителям города Октябрьский и ближайших посёлков. Обращение бесплатное и конфиденциальное."
            />

            <ol className="reveal mt-10 space-y-6">
              {HELP_STEPS.map((s) => (
                <li key={s.step} className="flex gap-5">
                  <span className="font-display text-2xl font-bold text-accent">{s.step}</span>
                  <div>
                    <h3 className="font-medium text-foreground">{s.title}</h3>
                    <p className="mt-1 text-[0.93rem] text-muted-foreground">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="reveal mt-8 flex items-start gap-2.5 text-[0.85rem] text-muted-foreground">
              <Icon name="Lock" size={16} className="mt-0.5 shrink-0 text-accent" />
              Данные из заявки видит только координатор программы помощи.
            </p>
          </div>

          <div className="reveal rounded-[var(--hero-radius)] bg-card p-8 shadow-[inset_0_0_0_1px_var(--hero-x-line)] lg:p-10">
            {sent ? (
              <div className="flex h-full min-h-[380px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 animate-scale-in items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Icon name="Check" size={28} />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-foreground">Заявка отправлена</h3>
                <p className="mt-2 max-w-sm text-muted-foreground">
                  Спасибо за доверие. Координатор свяжется с вами по указанному телефону.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: '', phone: '', category: 'Продукты и вещи', message: '' });
                  }}
                  className="mt-8 text-sm text-accent story-link"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="space-y-5">
                <h3 className="font-display text-2xl font-bold text-foreground">Заявка на помощь</h3>

                <div>
                  <label htmlFor="gh-name" className="mb-1.5 block text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                    Ваше имя
                  </label>
                  <input id="gh-name" value={form.name} onChange={set('name')} placeholder="Анна" className={field} />
                  {errors.name && <p className="mt-1.5 text-xs text-accent">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="gh-phone" className="mb-1.5 block text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                    Телефон
                  </label>
                  <input id="gh-phone" value={form.phone} onChange={set('phone')} placeholder="+7 900 000-00-00" inputMode="tel" className={field} />
                  {errors.phone && <p className="mt-1.5 text-xs text-accent">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="gh-cat" className="mb-1.5 block text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                    Какая помощь нужна
                  </label>
                  <select id="gh-cat" value={form.category} onChange={set('category')} className={field}>
                    <option>Продукты и вещи</option>
                    <option>Тепло и бытовой ремонт</option>
                    <option>Помощь с документами</option>
                    <option>Здоровье и лекарства</option>
                    <option>Помощь детям</option>
                    <option>Другое</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="gh-msg" className="mb-1.5 block text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                    Опишите ситуацию
                  </label>
                  <textarea id="gh-msg" value={form.message} onChange={set('message')} rows={4} placeholder="Коротко расскажите, что произошло и какая помощь нужна" className={`${field} resize-none`} />
                  {errors.message && <p className="mt-1.5 text-xs text-accent">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full rounded-[var(--hero-radius)] bg-accent px-6 py-3.5 font-semibold text-accent-foreground transition-transform hover:scale-[1.01]"
                >
                  Отправить заявку
                </button>

                <p className="text-xs text-muted-foreground">
                  Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetHelp;
