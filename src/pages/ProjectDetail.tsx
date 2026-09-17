import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DonateDialog from '@/components/DonateDialog';
import Icon from '@/components/ui/icon';
import { PROJECTS } from '@/data/site';

export const ProjectDetail = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [donateOpen, setDonateOpen] = useState(false);

  const project = PROJECTS.find((p) => p.slug === slug);
  const others = PROJECTS.filter((p) => p.slug !== slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header onDonate={() => setDonateOpen(true)} />
        <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">Проект не найден</h1>
          <button
            onClick={() => navigate('/')}
            className="story-link mt-4 text-accent"
          >
            Вернуться на главную
          </button>
        </main>
        <DonateDialog open={donateOpen} onOpenChange={setDonateOpen} />
      </div>
    );
  }

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

            <div className="mt-6 flex flex-wrap items-start justify-between gap-8">
              <div className="max-w-2xl">
                <div className="eyebrow">{project.period}</div>
                <h1 className="mt-4 font-display text-[2.4rem] font-bold leading-[1.1] text-foreground sm:text-[3rem]">
                  {project.title}
                </h1>
                <p className="mt-4 text-[1.05rem] text-muted-foreground">{project.text}</p>
              </div>

              <div className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-[var(--hero-radius)] bg-muted text-foreground">
                <Icon name={project.icon} size={28} fallback="Sparkles" />
              </div>
            </div>

            {project.results.length > 0 && (
              <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--hero-radius)] bg-border sm:grid-cols-2 lg:max-w-xl">
                {project.results.map((r) => (
                  <div key={r.label} className="bg-card p-6">
                    <div className="font-display text-3xl font-bold text-accent">{r.value}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{r.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="border-t bg-muted/60 px-5 py-20 lg:px-14 lg:py-28">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
              <div className="space-y-5">
                {project.fullText.map((paragraph, i) => (
                  <p key={i} className="text-[1.02rem] leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="rounded-[var(--hero-radius)] bg-card p-8 shadow-[inset_0_0_0_1px_var(--hero-x-line)] lg:p-10">
                <h3 className="font-display text-xl font-bold text-foreground">Хотите поддержать проект?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Любая помощь — деньгами, временем или вещами — приближает нас к результату.
                </p>
                <button
                  onClick={() => setDonateOpen(true)}
                  className="mt-6 w-full rounded-[var(--hero-radius)] bg-accent px-6 py-3.5 font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
                >
                  Сделать пожертвование
                </button>
                <Link
                  to="/join"
                  className="mt-3 block w-full rounded-[var(--hero-radius)] bg-background px-6 py-3.5 text-center font-semibold text-foreground shadow-[inset_0_0_0_1px_var(--hero-x-line)] transition-colors hover:bg-muted"
                >
                  Стать волонтёром
                </Link>
              </div>
            </div>
          </div>
        </section>

        {others.length > 0 && (
          <section className="border-t bg-background px-5 py-20 lg:px-14 lg:py-28">
            <div className="mx-auto max-w-[1400px]">
              <div className="eyebrow">Другие проекты</div>
              <div className="mt-8 grid gap-px overflow-hidden rounded-[var(--hero-radius)] bg-border sm:grid-cols-2">
                {others.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/projects/${p.slug}`}
                    className="group bg-card p-7 transition-colors hover:bg-muted"
                  >
                    <Icon name={p.icon} size={22} fallback="Sparkles" className="text-accent" />
                    <h3 className="mt-4 font-display text-lg font-bold text-foreground">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <DonateDialog open={donateOpen} onOpenChange={setDonateOpen} />
    </div>
  );
};

export default ProjectDetail;
