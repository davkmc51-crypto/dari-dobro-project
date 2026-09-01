import Icon from '@/components/ui/icon';
import SectionHeading from '@/components/SectionHeading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AWARDS, MEDIA, ORG, TEAM } from '@/data/site';

const HISTORY = [
  { year: '2021', text: 'Группа горожан начала возить продукты одиноким пожилым людям — сначала за свой счёт.' },
  { year: '2022', text: 'Зарегистрирована АНО «Дари Добро». Запущен первый проект «Тёплый дом».' },
  { year: '2024', text: 'Открыт постоянный пункт приёма вещей и продуктов на ул. Девонской.' },
  { year: '2026', text: 'Четыре постоянные программы, более 40 обученных волонтёров и 214 семей за год.' },
];

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('');

export const About = () => (
  <section id="about" className="border-t bg-background px-5 py-20 lg:px-14 lg:py-28">
    <div className="mx-auto max-w-[1400px]">
      <SectionHeading
        eyebrow="Об организации"
        title={
          <>
            Мы работаем открыто — <em className="font-medium italic text-accent">с 2021 года</em>
          </>
        }
        text={`${ORG.full}, ${ORG.city}.`}
      />

      <Tabs defaultValue="history" className="reveal mt-12">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
          {[
            { v: 'history', l: 'История' },
            { v: 'director', l: 'Слово руководителя' },
            { v: 'team', l: 'Команда' },
            { v: 'awards', l: 'Награды' },
            { v: 'media', l: 'СМИ о нас' },
          ].map((t) => (
            <TabsTrigger
              key={t.v}
              value={t.v}
              className="rounded-[var(--hero-radius)] bg-card px-4 py-2.5 text-[0.88rem] text-muted-foreground shadow-[inset_0_0_0_1px_var(--hero-x-line)] data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-none"
            >
              {t.l}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="history" className="mt-10">
          <ol className="grid gap-px overflow-hidden rounded-[var(--hero-radius)] bg-border sm:grid-cols-2 lg:grid-cols-4">
            {HISTORY.map((h) => (
              <li key={h.year} className="bg-card p-7">
                <span className="font-display text-3xl font-bold text-accent">{h.year}</span>
                <p className="mt-3 text-[0.95rem] text-muted-foreground">{h.text}</p>
              </li>
            ))}
          </ol>
        </TabsContent>

        <TabsContent value="director" className="mt-10">
          <figure className="grid gap-8 rounded-[var(--hero-radius)] bg-card p-8 shadow-[inset_0_0_0_1px_var(--hero-x-line)] lg:grid-cols-[auto_1fr] lg:p-12">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted font-display text-2xl font-bold text-foreground">
              ГХ
            </div>
            <div>
              <Icon name="Quote" size={28} className="text-accent" />
              <blockquote className="mt-4 font-display text-xl leading-relaxed text-foreground lg:text-2xl">
                «Мы начинали вчетвером с багажника машины. Сегодня за нами — десятки волонтёров и сотни семей,
                которые знают: если позвонить, к ним приедут. Мы не обещаем чуда, но обещаем, что каждый рубль
                дойдёт по назначению и будет виден в отчёте».
              </blockquote>
              <figcaption className="mt-6 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Гульнара Хайруллина</span> — директор АНО «Дари
                Добро»
              </figcaption>
            </div>
          </figure>
        </TabsContent>

        <TabsContent value="team" className="mt-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m) => (
              <div
                key={m.name}
                className="rounded-[var(--hero-radius)] bg-card p-7 shadow-[inset_0_0_0_1px_var(--hero-x-line)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted font-display text-lg font-bold text-foreground">
                  {initials(m.name)}
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-foreground">{m.name}</h3>
                <div className="text-[0.72rem] uppercase tracking-[0.16em] text-accent">{m.role}</div>
                <p className="mt-3 text-sm text-muted-foreground">{m.text}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="awards" className="mt-10">
          <ul className="divide-y overflow-hidden rounded-[var(--hero-radius)] bg-card shadow-[inset_0_0_0_1px_var(--hero-x-line)]">
            {AWARDS.map((a) => (
              <li key={a.title} className="flex flex-wrap items-start gap-5 p-6 transition-colors hover:bg-muted">
                <span className="font-display text-2xl font-bold text-accent">{a.year}</span>
                <div className="min-w-[240px] flex-1">
                  <h3 className="font-medium text-foreground">{a.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{a.text}</p>
                </div>
                <Icon name="Award" size={20} className="text-muted-foreground" />
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="media" className="mt-10">
          <div className="grid gap-6 lg:grid-cols-3">
            {MEDIA.map((m) => (
              <a
                key={m.title}
                href="#"
                className="group rounded-[var(--hero-radius)] bg-card p-7 shadow-[inset_0_0_0_1px_var(--hero-x-line)] transition-colors hover:bg-muted"
              >
                <div className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                  {m.source} · {m.date}
                </div>
                <h3 className="mt-3 font-display text-lg font-bold text-foreground">{m.title}</h3>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-accent">
                  Смотреть материал
                  <Icon name="ArrowUpRight" size={16} />
                </span>
              </a>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </section>
);

export default About;
