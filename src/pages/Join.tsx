import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DonateDialog from '@/components/DonateDialog';
import SubscribeDialog from '@/components/SubscribeDialog';
import Icon from '@/components/ui/icon';
import { HELP_WAYS } from '@/data/site';
import { toast } from '@/hooks/use-toast';
import func2url from '../../backend/func2url.json';

type Errors = Partial<Record<'name' | 'phone', string>>;

const field =
  'w-full rounded-[var(--hero-radius)] bg-background px-4 py-3 text-[0.95rem] outline-none ring-accent transition placeholder:text-muted-foreground focus:ring-1';

export const Join = () => {
  const navigate = useNavigate();
  const [donateOpen, setDonateOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);

  const [form, setForm] = useState({ name: '', phone: '', email: '', skills: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm({ ...form, [k]: e.target.value });
      setErrors({ ...errors, [k]: undefined });
    };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = 'Укажите имя';
    if (form.phone.replace(/\D/g, '').length < 10) next.phone = 'Укажите телефон для связи';
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      const res = await fetch(func2url.volunteers, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('request failed');

      setSent(true);
      toast({ title: 'Заявка отправлена', description: 'Мы свяжемся с вами в ближайшее время.' });
    } catch {
      toast({
        title: 'Не удалось отправить заявку',
        description: 'Попробуйте ещё раз или позвоните нам напрямую.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onDonate={() => setDonateOpen(true)} />

      <main>
        <section className="grain relative px-5 pb-16 pt-32 lg:px-14 lg:pt-40">
          <div className="mx-auto max-w-[1400px]">
            <button
              onClick={() => navigate('/')}
              className="story-link inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <Icon name="ArrowLeft" size={16} />
              На главную
            </button>

            <div className="mt-6 max-w-2xl">
              <div className="eyebrow">Присоединиться</div>
              <h1 className="mt-4 font-display text-[2.4rem] font-bold leading-[1.1] text-foreground sm:text-[3rem]">
                Станьте <em className="font-medium italic text-accent">частью команды</em>
              </h1>
              <p className="mt-4 text-[1.05rem] text-muted-foreground">
                Помогать можно по-разному: деньгами, вещами, временем или знаниями. Выберите способ,
                который вам ближе.
              </p>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--hero-radius)] bg-border sm:grid-cols-2 lg:grid-cols-4">
              {HELP_WAYS.map((w) => (
                <div key={w.title} className="bg-card p-7 transition-colors hover:bg-muted">
                  <Icon name={w.icon} size={22} fallback="Heart" className="text-accent" />
                  <h3 className="mt-4 font-display text-lg font-bold text-foreground">{w.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{w.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-3">
              <button
                onClick={() => setDonateOpen(true)}
                className="rounded-[var(--hero-radius)] bg-accent px-7 py-5 text-left font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
              >
                <Icon name="Heart" size={20} />
                <div className="mt-3">Сделать пожертвование</div>
              </button>
              <button
                onClick={() => setSubscribeOpen(true)}
                className="rounded-[var(--hero-radius)] bg-card px-7 py-5 text-left font-semibold text-foreground shadow-[inset_0_0_0_1px_var(--hero-x-line)] transition-colors hover:bg-muted"
              >
                <Icon name="Repeat" size={20} className="text-accent" />
                <div className="mt-3">Оформить подписку</div>
              </button>
              <a
                href="#volunteer-form"
                className="rounded-[var(--hero-radius)] bg-card px-7 py-5 text-left font-semibold text-foreground shadow-[inset_0_0_0_1px_var(--hero-x-line)] transition-colors hover:bg-muted"
              >
                <Icon name="HandHeart" size={20} className="text-accent" />
                <div className="mt-3">Стать волонтёром</div>
              </a>
            </div>
          </div>
        </section>

        <section id="volunteer-form" className="border-t bg-muted/60 px-5 py-20 lg:px-14 lg:py-28">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
              <div>
                <div className="eyebrow">Стать волонтёром</div>
                <h2 className="mt-4 font-display text-[2rem] font-bold leading-[1.1] text-foreground sm:text-[2.6rem]">
                  Расскажите о себе — мы найдём, чем вы можете помочь
                </h2>
                <p className="mt-4 max-w-md text-muted-foreground">
                  Юристы, психологи, водители, маркетологи, просто неравнодушные люди — координатор
                  свяжется с вами и подберёт задачу по вашим силам и времени.
                </p>

                <ul className="mt-8 space-y-2.5 text-[0.95rem] text-muted-foreground">
                  {[
                    'Помощь на адресных выездах к подопечным',
                    'Организация мероприятий и сборов',
                    'Профессиональная поддержка: юристы, психологи, врачи',
                    'Помощь в соцсетях, дизайне и текстах',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2.5">
                      <Icon name="Check" size={16} className="mt-1 shrink-0 text-accent" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[var(--hero-radius)] bg-card p-8 shadow-[inset_0_0_0_1px_var(--hero-x-line)] lg:p-10">
                {sent ? (
                  <div className="flex h-full min-h-[380px] flex-col items-center justify-center text-center">
                    <div className="flex h-16 w-16 animate-scale-in items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <Icon name="Check" size={28} />
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-bold text-foreground">Заявка отправлена</h3>
                    <p className="mt-2 max-w-sm text-muted-foreground">
                      Спасибо! Координатор волонтёров свяжется с вами по указанному телефону.
                    </p>
                    <button
                      onClick={() => {
                        setSent(false);
                        setForm({ name: '', phone: '', email: '', skills: '', message: '' });
                      }}
                      className="mt-8 text-sm text-accent story-link"
                    >
                      Отправить ещё одну заявку
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate className="space-y-5">
                    <h3 className="font-display text-2xl font-bold text-foreground">Заявка волонтёра</h3>

                    <div>
                      <label htmlFor="v-name" className="mb-1.5 block text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                        Ваше имя
                      </label>
                      <input id="v-name" value={form.name} onChange={set('name')} placeholder="Анна" className={field} />
                      {errors.name && <p className="mt-1.5 text-xs text-accent">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="v-phone" className="mb-1.5 block text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                        Телефон
                      </label>
                      <input id="v-phone" value={form.phone} onChange={set('phone')} placeholder="+7 900 000-00-00" inputMode="tel" className={field} />
                      {errors.phone && <p className="mt-1.5 text-xs text-accent">{errors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="v-email" className="mb-1.5 block text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                        Email (необязательно)
                      </label>
                      <input id="v-email" type="email" value={form.email} onChange={set('email')} placeholder="anna@mail.ru" className={field} />
                    </div>

                    <div>
                      <label htmlFor="v-skills" className="mb-1.5 block text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                        Чем можете помочь
                      </label>
                      <input id="v-skills" value={form.skills} onChange={set('skills')} placeholder="Например: юрист, водитель, дизайнер" className={field} />
                    </div>

                    <div>
                      <label htmlFor="v-msg" className="mb-1.5 block text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                        Комментарий
                      </label>
                      <textarea id="v-msg" value={form.message} onChange={set('message')} rows={4} placeholder="Коротко расскажите о себе и когда вам удобно помогать" className={`${field} resize-none`} />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-[var(--hero-radius)] bg-accent px-6 py-3.5 font-semibold text-accent-foreground transition-transform hover:scale-[1.01] disabled:opacity-60"
                    >
                      {loading ? 'Отправка…' : 'Отправить заявку'}
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
      </main>

      <Footer />

      <DonateDialog open={donateOpen} onOpenChange={setDonateOpen} />
      <SubscribeDialog open={subscribeOpen} onOpenChange={setSubscribeOpen} />
    </div>
  );
};

export default Join;
