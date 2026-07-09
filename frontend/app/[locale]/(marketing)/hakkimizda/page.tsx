import { Link } from "@/i18n/navigation";
import {
  ArrowRight, Eye, Target, Users, Handshake, Zap, Globe2, Share2,
} from "lucide-react";

export const metadata = {
  title: "Hakkımızda — Sefaris",
  description:
    "Türkiye ve Almanya arasında köprü kuran hibrit mühendislik ekibimizin hikayesi, misyonu, vizyonu ve değerleri.",
};

const values = [
  {
    icon: Eye,
    title: "Şeffaflık",
    desc: "Her aşamada açık iletişim, izlenebilir süreçler ve öngörülebilir teslimat. Müşterilerimiz projelerinin nabzını her an tutabilir.",
  },
  {
    icon: Zap,
    title: "Çeviklik",
    desc: "Kısa iterasyonlar, hızlı geri bildirim döngüleri ve değişime hızla adapte olan esnek ekipler ile değer üretiriz.",
  },
  {
    icon: Globe2,
    title: "Uzaktan Çalışma",
    desc: "Coğrafyadan bağımsız, asenkron ve sonuç odaklı bir kültür. Doğru yeteneği doğru işe, konumdan bağımsız eşleştiririz.",
  },
  {
    icon: Share2,
    title: "Paylaşım Ekonomisi",
    desc: "Bilgi, kaynak ve kazancı adil paylaşan bir ekosistem. Ortak başarıyı bireysel çıkarın önünde tutarız.",
  },
];

const team = [
  { name: "Emre Yıldız", role: "Kurucu & Yazılım Mimarı", expertise: "Spring Boot, Hibernate, AWS" },
  { name: "Lena Hofmann", role: "Almanya Proje Ortaklıkları", expertise: "Outsourcing, Ürün Yönetimi" },
  { name: "Deniz Aksoy", role: "Frontend Lideri", expertise: "Next.js, React, TypeScript" },
  { name: "Mert Çelik", role: "DevOps & Bulut Danışmanı", expertise: "Docker, Kubernetes, Terraform" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">Hakkımızda</span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            İki ülke, tek mühendislik kültürü
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Sefaris; Türkiye&apos;nin mühendislik esnekliğini Almanya&apos;nın disiplini ile
            birleştiren, uzaktan çalışan hibrit bir dijital çözüm ortağıdır.
          </p>
        </div>
      </section>

      {/* Hikayemiz */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold text-primary">Hikayemiz</h2>
            <div className="mt-6 space-y-4 text-text-secondary">
              <p>
                Sefaris, Berlin ve İstanbul&apos;da çalışan bir grup yazılım mühendisinin ortak bir
                soruya verdiği cevapla doğdu: İki ülkenin en güçlü yönlerini tek bir ekipte
                buluşturabilir miyiz?
              </p>
              <p>
                Almanya&apos;daki kurumların süreç disiplini ve kalite beklentisi ile Türkiye&apos;deki
                mühendislerin hız ve yaratıcılığını bir araya getirdik. Zamanla bu yaklaşım, uzaktan
                çalışan çevik ekipler etrafında kurumsallaşan bir platforma dönüştü.
              </p>
              <p>
                Bugün lojistikten fintech&apos;e, e-ticaretten kurumsal yazılıma kadar birçok sektörde,
                iki ülke arasında güvenilir bir dijital köprü olarak projeler yürütüyoruz.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { value: "10+", label: "Yıl Kümülatif Tecrübe" },
              { value: "100+", label: "Başarılı Teslimat" },
              { value: "%98", label: "Müşteri Memnuniyeti" },
              { value: "2", label: "Ülke / 1 Hibrit Ekip" },
            ].map((s) => (
              <div key={s.label} className="rounded-card border border-line bg-surface p-6 text-center">
                <div className="text-4xl font-bold text-accent">{s.value}</div>
                <div className="mt-2 text-sm text-text-secondary">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Misyon & Vizyon */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-card border border-line bg-white p-8">
              <Target className="h-10 w-10 text-accent" />
              <h3 className="mt-4 text-2xl font-semibold text-primary">Misyonumuz</h3>
              <p className="mt-3 text-text-secondary">
                Kurumların dijital dönüşüm yolculuğunda; şeffaf, ölçeklenebilir ve sürdürülebilir
                yazılım çözümleri üretmek. Coğrafi sınırları ortadan kaldırarak doğru yeteneği doğru
                işle buluşturmak.
              </p>
            </div>
            <div className="rounded-card border border-line bg-white p-8">
              <Eye className="h-10 w-10 text-accent" />
              <h3 className="mt-4 text-2xl font-semibold text-primary">Vizyonumuz</h3>
              <p className="mt-3 text-text-secondary">
                Türkiye ve Almanya başta olmak üzere Avrupa genelinde, paylaşım ekonomisine dayalı en
                güvenilir hibrit mühendislik platformu olmak ve uzaktan çalışmanın kalite standardını
                belirlemek.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Değerlerimiz */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-3xl font-semibold text-primary">Değerlerimiz</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-text-secondary">
          Çalışma biçimimizi ve karar mekanizmalarımızı yönlendiren temel ilkeler.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-card border border-line p-6">
              <v.icon className="h-9 w-9 text-accent" />
              <h3 className="mt-4 text-lg font-semibold text-primary">{v.title}</h3>
              <p className="mt-2 text-sm text-text-secondary">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ekip */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-accent" />
            <h2 className="text-3xl font-semibold text-primary">Ekibimiz</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <div key={m.name} className="rounded-card border border-line bg-white p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-lg font-bold text-accent">
                  {m.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-primary">{m.name}</h3>
                <p className="mt-1 text-sm font-medium text-accent">{m.role}</p>
                <p className="mt-2 text-sm text-text-secondary">{m.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <Handshake className="mx-auto h-10 w-10 text-accent" />
          <h2 className="mt-4 text-3xl font-semibold">Birlikte çalışalım mı?</h2>
          <p className="mt-3 text-slate-300">
            Projenizi hibrit ekibimizle hayata geçirmek için bize ulaşın.
          </p>
          <Link
            href="/iletisim"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium hover:bg-accent-hover"
          >
            İletişime Geçin <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
