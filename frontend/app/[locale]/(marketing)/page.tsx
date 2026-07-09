import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Code2, Handshake, TrendingUp, Cloud, ArrowRight, CheckCircle2,
} from "lucide-react";

const SERVICE_ICONS = [Code2, Handshake, TrendingUp, Cloud];

export default function HomePage() {
  const t = useTranslations("home");
  const ts = useTranslations("services");

  const stats = [
    { value: "10+", label: t("stats.experience") },
    { value: "100+", label: t("stats.delivery") },
    { value: "%98", label: t("stats.satisfaction") },
    { value: "2", label: t("stats.countries") },
  ];

  const services = [
    { key: "ozelYazilim", desc: "Web, Mobil & Spring Boot Mimarileri", href: "/hizmetler/ozel-yazilim" },
    { key: "projeOrtakligi", desc: "Almanya Proje Ortaklığı & Outsourcing", href: "/hizmetler/proje-ortakligi" },
    { key: "seoGeo", desc: "SEO / GEO & Dijital Büyüme", href: "/hizmetler/seo-geo" },
    { key: "danismanlik", desc: "AWS/Cloud & Mikroservis Danışmanlığı", href: "/hizmetler/danismanlik" },
  ] as const;

  const featured = [
    { sector: "Lojistik — Berlin", tech: "Spring Boot · Next.js · AWS", metric: "%40 performans artışı" },
    { sector: "Fintech — İstanbul", tech: "React Native · PostgreSQL", metric: "API < 50ms" },
    { sector: "E-ticaret — Münih", tech: "Next.js · Docker", metric: "0.8s LCP" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="animate-aurora absolute -left-20 top-0 h-96 w-96 rounded-full bg-accent blur-3xl" />
          <div className="animate-aurora-slow absolute right-0 top-20 h-96 w-96 rounded-full bg-info blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-6xl">{t("heroTitle")}</h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">{t("heroSubtitle")}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/iletisim" className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium hover:bg-accent-hover">
              {t("ctaPrimary")} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/hizmetler" className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 font-medium hover:bg-white/10">
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </section>

      {/* Trust stats */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-bold text-accent">{s.value}</div>
              <div className="mt-2 text-sm text-text-secondary">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-semibold text-primary">{t("servicesTitle")}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => {
              const Icon = SERVICE_ICONS[i];
              return (
                <Link key={s.key} href={s.href} className="group rounded-card border border-line bg-white p-6 transition hover:border-accent hover:shadow-lg">
                  <Icon className="h-10 w-10 text-accent" />
                  <h3 className="mt-4 text-lg font-semibold text-primary">{ts(s.key)}</h3>
                  <p className="mt-2 text-sm text-text-secondary">{s.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2">
                    İncele <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-semibold text-primary">{t("whyTitle")}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-text-secondary">{t("whySubtitle")}</p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {["Alman Disiplini", "Türk Mühendislik Esnekliği", "Şeffaf Paylaşım Ekonomisi"].map((title) => (
              <div key={title} className="rounded-card border border-line p-6">
                <CheckCircle2 className="h-8 w-8 text-success" />
                <h3 className="mt-4 text-lg font-semibold text-primary">{title}</h3>
                <p className="mt-2 text-sm text-text-secondary">
                  Kurumların iki dünyanın en iyisini aynı anda almasını sağlayan hibrit çalışma modeli.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-semibold text-primary">{t("featuredTitle")}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featured.map((p) => (
              <div key={p.sector} className="rounded-card border border-line bg-white p-6">
                <div className="text-sm font-semibold text-accent">{p.sector}</div>
                <div className="mt-2 text-sm text-text-secondary">{p.tech}</div>
                <div className="mt-4 text-2xl font-bold text-primary">{p.metric}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/projeler" className="inline-flex items-center gap-2 font-medium text-accent">
              Tüm Projeler <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-semibold">{t("ctaPrimary")}</h2>
          <p className="mt-3 text-slate-300">{t("heroSubtitle")}</p>
          <Link href="/iletisim" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium hover:bg-accent-hover">
            {t("ctaPrimary")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
