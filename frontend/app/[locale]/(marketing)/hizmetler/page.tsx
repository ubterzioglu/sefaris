import { Link } from "@/i18n/navigation";
import {
  Code2, Handshake, TrendingUp, Cloud, Palette, GraduationCap, ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Hizmetler — Sefaris",
  description:
    "Özel yazılım geliştirme, proje ortaklığı, SEO/GEO, danışmanlık, kurumsal kimlik ve eğitim teknolojileri hizmetlerimiz.",
};

const services = [
  {
    icon: Code2,
    title: "Özel Yazılım Geliştirme",
    desc: "Web, mobil ve Spring Boot tabanlı ölçeklenebilir mimariler ile ihtiyaca özel çözümler.",
    href: "/hizmetler/ozel-yazilim",
  },
  {
    icon: Handshake,
    title: "Almanya Proje Ortaklığı & Outsourcing",
    desc: "Almanya pazarına açılan kurumlar için güvenilir yazılım ortaklığı ve ekip genişletme.",
    href: "/hizmetler/proje-ortakligi",
  },
  {
    icon: TrendingUp,
    title: "SEO / GEO & Dijital Büyüme",
    desc: "Arama motoru ve üretken yapay zeka görünürlüğü ile sürdürülebilir organik büyüme.",
    href: "/hizmetler/seo-geo",
  },
  {
    icon: Cloud,
    title: "AI & Bulut Danışmanlığı",
    desc: "AWS/Cloud, mikroservis ve yapay zeka entegrasyonlarında uçtan uca danışmanlık.",
    href: "/hizmetler/danismanlik",
  },
  {
    icon: Palette,
    title: "Kurumsal Kimlik & Tasarım",
    desc: "Marka kimliği, tasarım sistemleri ve kullanıcı deneyimi ile dijital varlığınızı güçlendirin.",
    href: "/hizmetler/kurumsal-kimlik",
  },
  {
    icon: GraduationCap,
    title: "Eğitim Teknolojileri",
    desc: "LMS, e-öğrenme platformları ve kurum içi teknik eğitim programları.",
    href: "/hizmetler/egitim-teknolojileri",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">Hizmetler</span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            İhtiyacınıza uygun uçtan uca dijital çözümler
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Fikir aşamasından canlı ürüne kadar; yazılım geliştirme, danışmanlık ve dijital büyüme
            hizmetlerimizi keşfedin.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group rounded-card border border-line bg-white p-6 transition hover:border-accent hover:shadow-lg"
            >
              <s.icon className="h-10 w-10 text-accent" />
              <h3 className="mt-4 text-lg font-semibold text-primary">{s.title}</h3>
              <p className="mt-2 text-sm text-text-secondary">{s.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2">
                İncele <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-semibold text-primary">Aradığınız hizmeti bulamadınız mı?</h2>
          <p className="mt-3 text-text-secondary">
            İhtiyacınızı bizimle paylaşın, size özel bir çözüm kurgulayalım.
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
