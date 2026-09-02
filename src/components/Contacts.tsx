import { useState } from 'react';
import Icon from '@/components/ui/icon';
import SectionHeading from '@/components/SectionHeading';
import { ORG, SOCIALS } from '@/data/site';
import { toast } from '@/hooks/use-toast';

export const Contacts = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const field =
    'w-full rounded-[var(--hero-radius)] bg-muted px-4 py-3 text-[0.95rem] outline-none ring-accent transition placeholder:text-muted-foreground focus:ring-1';

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string | undefined> = {};
    if (form.name.trim().length < 2) next.name = 'Укажите имя';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Проверьте адрес почты';
    if (form.message.trim().length < 5) next.message = 'Напишите сообщение';
    setErrors(next);
    if (Object.keys(next).length) return;

    setForm({ name: '', email: '', message: '' });
    toast({ title: 'Спасибо!', description: 'Мы свяжемся с вами в ближайшее время.' });
  };

  const items = [
    { icon: 'MapPin', label: 'Адрес', value: ORG.address },
    { icon: 'Phone', label: 'Телефон', value: ORG.phone, href: ORG.phoneHref },
    { icon: 'Mail', label: 'Почта', value: ORG.email, href: `mailto:${ORG.email}` },
    { icon: 'Clock', label: 'Часы работы', value: ORG.hours },
  ];

  return (
    <section id="contacts" className="border-t bg-muted/60 px-5 py-20 lg:px-14 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          eyebrow="Контакты"
          title={
            <>
              Напишите или <em className="font-medium italic text-accent">приходите</em>
            </>
          }
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="reveal">
            <ul className="space-y-6">
              {items.map((i) => (
                <li key={i.label} className="flex gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--hero-radius)] bg-card text-accent shadow-[inset_0_0_0_1px_var(--hero-x-line)]">
                    <Icon name={i.icon} size={18} fallback="Info" />
                  </span>
                  <div>
                    <div className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                      {i.label}
                    </div>
                    {i.href ? (
                      <a href={i.href} className="story-link text-foreground">
                        {i.value}
                      </a>
                    ) : (
                      <div className="text-foreground">{i.value}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <div className="mb-3 text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                Мы в соцсетях
              </div>
              <div className="flex gap-2.5">
                {SOCIALS.map((s) => (
                  <a
                    key={s.short}
                    href={s.href}
                    aria-label={s.label}
                    title={s.label}
                    className="flex h-11 w-11 items-center justify-center rounded-[var(--hero-radius)] bg-card text-sm font-semibold text-foreground shadow-[inset_0_0_0_1px_var(--hero-x-line)] transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {s.short}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form
            onSubmit={submit}
            noValidate
            className="reveal rounded-[var(--hero-radius)] bg-card p-8 shadow-[inset_0_0_0_1px_var(--hero-x-line)] lg:p-10"
          >
            <h3 className="font-display text-2xl font-bold text-foreground">Напишите нам</h3>

            <div className="mt-6 space-y-5">
              <div>
                <label htmlFor="cname" className="mb-1.5 block text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                  Ваше имя
                </label>
                <input
                  id="cname"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Анна"
                  className={field}
                />
                {errors.name && <p className="mt-1.5 text-xs text-accent">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="cemail" className="mb-1.5 block text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                  Email
                </label>
                <input
                  id="cemail"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="anna@mail.ru"
                  className={field}
                />
                {errors.email && <p className="mt-1.5 text-xs text-accent">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="cmsg" className="mb-1.5 block text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                  Сообщение
                </label>
                <textarea
                  id="cmsg"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Чем мы можем вам помочь?"
                  className={`${field} resize-none`}
                />
                {errors.message && <p className="mt-1.5 text-xs text-accent">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full rounded-[var(--hero-radius)] bg-accent px-6 py-3.5 font-semibold text-accent-foreground transition-transform hover:scale-[1.01]"
              >
                Отправить
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contacts;