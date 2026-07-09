import { Link } from "@/i18n/navigation";
import { ArrowRight, Globe2, Clock, Share2, MapPin, Briefcase } from "lucide-react";

export const metadata = {
  title: "Kariyer — Sefaris",
  description:
    "Uzaktan, asenkron ve paylaşım ekonomisine dayalı çalışma kültürümüz ve açık pozisyonlarımız.",
};

const culture = [
  {
    icon: Globe2,
    title: "Uzaktan Çalışma",
    desc: "Konumdan bağımsız çalışın. Türkiye, Almanya ya da başka bir yerden; önemli olan çıktı.",
  },
  {
    icon: Clock,
    title: "Asenkron Kültür",
    desc: "Toplantı yorgunluğu yerine yazılı iletişim ve derin odak zamanı. Kendi ritminizde üretin.",
  },
  {
    icon: Share2,
    title: "Paylaşım Ekonomisi",
    desc: "Şeffaf gelir paylaşımı, açık bilgi ve ortak başarı. Kattığınız değer görünür ve ödüllendirilir.",
  },
];

const positions = [
  {
    title: "Frontend Developer",
    stack: "Next.js, React, TypeScript, Tailwind CSS",
    type: "Tam Zamanlı · Uzaktan",
  },
  {
    title: "Backend Developer",
    stack: "Java, Spring Boot, Hibernate, PostgreSQL",
    type: "Tam Zamanlı · Uzaktan",
  },
  {
    title: "Full-Stack Developer",
    stack: "Next.js, Spring Boot, AWS, Docker",
    type: "Tam Zamanlı · Uzaktan",
  },
  {
    title: "UI/UX Designer",
    stack: "Figma, Tasarım Sistemleri, Kullanıcı Araştırması",
    type: "Tam Zamanlı · Uzaktan",
  },
  {
    title: "SEO Specialist",
    stack: "Teknik SEO, İçerik Stratejisi, GA4, GEO",
    type: "Tam Zamanlı · Uzaktan",
  },
];

export default function CareersPage() {
  return (
    <>
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">Kariyer</span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            İki ülke arasında, sınırsız bir ekibin parçası olun
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Uzaktan, asenkron ve şeffaf bir kültürde; gerçek problemler çözen mühendisler ve
            tasarımcılar arıyoruz.
          </p>
        </div>
      </section>

      {/* Çalışma Kültürü */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-semibold text-primary">Çalışma Kültürümüz</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {culture.map((c) => (
            <div key={c.title} className="rounded-card border border-line p-6">
              <c.icon className="h-9 w-9 text-accent" />
              <h3 className="mt-4 text-lg font-semibold text-primary">{c.title}</h3>
              <p className="mt-2 text-sm text-text-secondary">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Açık Pozisyonlar */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl font-semibold text-primary">Açık Pozisyonlar</h2>
          <div className="mt-10 space-y-4">
            {positions.map((p) => (
              <div
                key={p.title}
                className="flex flex-col gap-4 rounded-card border border-line bg-white p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-accent" />
                    <h3 className="text-lg font-semibold text-primary">{p.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-text-secondary">{p.stack}</p>
                  <div className="mt-2 flex items-center gap-1 text-xs text-text-muted">
                    <MapPin className="h-3.5 w-3.5" /> {p.type}
                  </div>
                </div>
                <Link
                  href="/iletisim"
                  className="inline-flex w-fit items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover"
                >
                  Başvur <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-semibold">Aradığınız pozisyon listede yok mu?</h2>
          <p className="mt-3 text-slate-300">
            Yeteneğinize inanıyorsanız, açık başvuru gönderin. Doğru fırsatı birlikte bulalım.
          </p>
          <Link
            href="/iletisim"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium hover:bg-accent-hover"
          >
            Açık Başvuru Gönder <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
