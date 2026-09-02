import Icon from '@/components/ui/icon';
import SectionHeading from '@/components/SectionHeading';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { DOCUMENTS, ORG, REPORTS_ANNUAL, REPORTS_MONTHLY } from '@/data/site';

const FileRow = ({ title, meta, icon, href }: { title: string; meta: string; icon: string; href?: string }) => (
  <a
    href={href || '#'}
    {...(href ? { download: true, target: '_blank', rel: 'noopener noreferrer' } : {})}
    className="group flex items-center gap-4 border-b px-5 py-4 last:border-b-0 transition-colors hover:bg-muted"
  >
    <Icon name={icon} size={20} fallback="File" className="shrink-0 text-accent" />
    <span className="flex-1 text-[0.95rem] text-foreground">{title}</span>
    <span className="hidden text-xs text-muted-foreground sm:block">{meta}</span>
    <Icon
      name="Download"
      size={16}
      className="text-muted-foreground transition-transform group-hover:translate-y-0.5"
    />
  </a>
);

export const Documents = () => (
  <section id="documents" className="border-t bg-background px-5 py-20 lg:px-14 lg:py-28">
    <div className="mx-auto max-w-[1400px]">
      <SectionHeading
        eyebrow="Документы и отчёты"
        title={
          <>
            Прозрачность — это <em className="font-medium italic text-accent">не обещание</em>, а документ
          </>
        }
        text="Учредительные документы, ежемесячные и годовые отчёты открыты для всех. Скачать может любой человек, без регистрации."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="reveal">
          <Accordion type="multiple" defaultValue={['docs', 'monthly']} className="space-y-4">
            <AccordionItem
              value="docs"
              className="overflow-hidden rounded-[var(--hero-radius)] border-0 bg-card shadow-[inset_0_0_0_1px_var(--hero-x-line)]"
            >
              <AccordionTrigger className="px-5 py-4 font-display text-lg font-bold hover:no-underline">
                Учредительные документы
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <div className="border-t">
                  {DOCUMENTS.map((d) => (
                    <FileRow key={d.title} title={d.title} meta={d.type} icon={d.icon} href={d.href} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="monthly"
              className="overflow-hidden rounded-[var(--hero-radius)] border-0 bg-card shadow-[inset_0_0_0_1px_var(--hero-x-line)]"
            >
              <AccordionTrigger className="px-5 py-4 font-display text-lg font-bold hover:no-underline">
                Ежемесячные отчёты
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <div className="border-t">
                  {REPORTS_MONTHLY.map((r) => (
                    <FileRow key={r.title} title={r.title} meta={r.sum} icon={r.icon} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="annual"
              className="overflow-hidden rounded-[var(--hero-radius)] border-0 bg-card shadow-[inset_0_0_0_1px_var(--hero-x-line)]"
            >
              <AccordionTrigger className="px-5 py-4 font-display text-lg font-bold hover:no-underline">
                Годовые отчёты
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <div className="border-t">
                  {REPORTS_ANNUAL.map((r) => (
                    <FileRow key={r.title} title={r.title} meta={r.sum} icon={r.icon} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <p className="mt-6 flex items-start gap-2.5 text-[0.85rem] text-muted-foreground">
            <Icon name="Info" size={16} className="mt-0.5 shrink-0 text-accent" />
            С 2025 года мы сдаём отчёты в Минюст НКО в электронном виде.
          </p>
        </div>

        <aside className="reveal rounded-[var(--hero-radius)] bg-muted p-8">
          <h3 className="font-display text-xl font-bold text-foreground">Реквизиты организации</h3>
          <dl className="mt-6 space-y-4 text-[0.92rem]">
            {[
              ['Полное наименование', ORG.full],
              ['ИНН', ORG.inn],
              ['ОГРН', ORG.ogrn],
              ['Адрес', ORG.address],
              ['Телефон', ORG.phone],
              ['Электронная почта', ORG.email],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-border/70 pb-3 last:border-b-0">
                <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">{k}</dt>
                <dd className="mt-1 text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </div>
  </section>
);

export default Documents;