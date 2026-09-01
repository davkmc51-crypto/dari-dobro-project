import Icon from '@/components/ui/icon';
import SectionHeading from '@/components/SectionHeading';
import { PROJECTS } from '@/data/site';

export const Projects = () => (
  <section id="projects" className="border-t bg-background px-5 py-20 lg:px-14 lg:py-28">
    <div className="mx-auto max-w-[1400px]">
      <SectionHeading
        eyebrow="Проекты и программы"
        title={
          <>
            Постоянные программы, а не <em className="font-medium italic text-accent">разовые акции</em>
          </>
        }
        text="Каждый проект — это регулярная работа с понятным результатом, который мы показываем в отчётах."
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--hero-radius)] bg-border sm:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <article
            key={p.title}
            className="reveal group relative bg-card p-8 transition-colors hover:bg-muted lg:p-10"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <div className="flex items-start justify-between gap-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--hero-radius)] bg-muted text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon name={p.icon} size={22} fallback="Sparkles" />
              </div>
              <span className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                {p.period}
              </span>
            </div>

            <h3 className="mt-6 font-display text-2xl font-bold text-foreground">{p.title}</h3>
            <p className="mt-2 max-w-[46ch] text-[0.95rem] text-muted-foreground">{p.text}</p>

            <div className="mt-7 flex items-baseline gap-3 border-t pt-5">
              <span className="font-display text-3xl font-bold text-accent">{p.stat}</span>
              <span className="text-sm text-muted-foreground">{p.statLabel}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
