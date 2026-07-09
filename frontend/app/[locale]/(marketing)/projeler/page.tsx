"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

type Project = {
  slug: string;
  title: string;
  sector: string;
  tech: string;
  metric: string;
};

const PROJECTS: Project[] = [
  {
    slug: "lojistik-takip-platformu",
    title: "Gerçek Zamanlı Lojistik Takip Platformu",
    sector: "Lojistik",
    tech: "Spring Boot · Next.js · AWS",
    metric: "%40 performans artışı",
  },
  {
    slug: "fintech-odeme-altyapisi",
    title: "Mobil Fintech Ödeme Altyapısı",
    sector: "Fintech",
    tech: "React Native · PostgreSQL",
    metric: "API < 50ms yanıt",
  },
  {
    slug: "eticaret-hiz-optimizasyonu",
    title: "E-ticaret Hız & Dönüşüm Optimizasyonu",
    sector: "E-ticaret",
    tech: "Next.js · Docker · Redis",
    metric: "0.8s LCP",
  },
  {
    slug: "saglik-randevu-sistemi",
    title: "Bulut Tabanlı Sağlık Randevu Sistemi",
    sector: "Sağlık",
    tech: "Spring Boot · Kubernetes",
    metric: "%99.9 uptime",
  },
  {
    slug: "egitim-lms-platformu",
    title: "Kurumsal Eğitim LMS Platformu",
    sector: "Eğitim",
    tech: "Next.js · SCORM · AWS",
    metric: "50K+ aktif kullanıcı",
  },
  {
    slug: "uretim-veri-panosu",
    title: "Endüstriyel Üretim Veri Panosu",
    sector: "Üretim",
    tech: "React · IoT · TimescaleDB",
    metric: "%25 verimlilik artışı",
  },
];

const SECTORS = ["Tümü", ...Array.from(new Set(PROJECTS.map((p) => p.sector)))];

export default function ProjectsPage() {
  const [active, setActive] = useState("Tümü");
  const filtered =
    active === "Tümü" ? PROJECTS : PROJECTS.filter((p) => p.sector === active);

  return (
    <>
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">Projeler</span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Gerçek problemlere ölçülebilir çözümler
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Farklı sektörlerde hayata geçirdiğimiz vaka çalışmalarımızdan bir seçki.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap gap-3">
          {SECTORS.map((s) => (
            <button
              key={s}
              onClick={() => setActive(s)}
              className={
                "rounded-full border px-4 py-2 text-sm font-medium transition " +
                (active === s
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-white text-text-secondary hover:border-accent")
              }
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Link
              key={p.slug}
              href={`/projeler/${p.slug}`}
              className="group flex flex-col rounded-card border border-line bg-white p-6 transition hover:border-accent hover:shadow-lg"
            >
              <span className="inline-flex w-fit items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                {p.sector}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-primary">{p.title}</h3>
              <p className="mt-2 text-sm text-text-secondary">{p.tech}</p>
              <div className="mt-4 text-2xl font-bold text-primary">{p.metric}</div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2">
                Vakayı İncele <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-semibold text-primary">Sıradaki başarı hikayesi sizinki olsun</h2>
          <p className="mt-3 text-text-secondary">
            Projenizi konuşmak ve size özel bir çözüm kurgulamak için bize ulaşın.
          </p>
          <Link
            href="/iletisim"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-white hover:bg-accent-hover"
          >
            Projenizi Başlatın <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
