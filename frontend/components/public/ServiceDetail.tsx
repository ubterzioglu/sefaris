import { Link } from "@/i18n/navigation";
import { ArrowRight, AlertTriangle, Lightbulb, CheckCircle2 } from "lucide-react";

export type ServiceDetailProps = {
  eyebrow: string;
  title: string;
  intro: string;
  problem: string[];
  solution: string[];
  process: { step: string; desc: string }[];
  technologies: string[];
  ctaTitle?: string;
};

export function ServiceDetail({
  eyebrow,
  title,
  intro,
  problem,
  solution,
  process,
  technologies,
  ctaTitle = "Bu hizmet hakkında konuşalım",
}: ServiceDetailProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">{eyebrow}</span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">{intro}</p>
        </div>
      </section>

      {/* Problem & Çözüm */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-card border border-line bg-surface p-8">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-warning" />
              <h2 className="text-2xl font-semibold text-primary">Problem</h2>
            </div>
            <ul className="mt-6 space-y-3">
              {problem.map((p) => (
                <li key={p} className="flex gap-3 text-text-secondary">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card border border-line bg-surface p-8">
            <div className="flex items-center gap-3">
              <Lightbulb className="h-8 w-8 text-accent" />
              <h2 className="text-2xl font-semibold text-primary">Çözüm</h2>
            </div>
            <ul className="mt-6 space-y-3">
              {solution.map((s) => (
                <li key={s} className="flex gap-3 text-text-secondary">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Süreç */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl font-semibold text-primary">Süreç</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <div key={p.step} className="rounded-card border border-line bg-white p-6">
                <div className="text-sm font-bold text-accent">0{i + 1}</div>
                <h3 className="mt-2 text-lg font-semibold text-primary">{p.step}</h3>
                <p className="mt-2 text-sm text-text-secondary">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teknolojiler */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-semibold text-primary">Teknolojiler</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {technologies.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-text-secondary"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-semibold">{ctaTitle}</h2>
          <p className="mt-3 text-slate-300">
            Uzman ekibimizle ihtiyaçlarınızı değerlendirip size özel bir yol haritası çıkaralım.
          </p>
          <Link
            href="/iletisim"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium hover:bg-accent-hover"
          >
            Teklif Alın <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
