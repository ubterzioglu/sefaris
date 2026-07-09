import { Link } from "@/i18n/navigation";
import { ArrowRight, Clock } from "lucide-react";

export const metadata = {
  title: "Blog — Sefaris",
  description:
    "Yazılım mimarisi, bulut, SEO/GEO ve uzaktan çalışma üzerine ekibimizin yazıları.",
};

const posts = [
  {
    slug: "spring-boot-mikroservis-mimarisi",
    title: "Spring Boot ile Ölçeklenebilir Mikroservis Mimarisi",
    excerpt:
      "Monolitten mikroservise geçerken karşılaşılan tuzaklar ve Spring Boot ile sürdürülebilir bir mimari kurmanın pratik yolları.",
    category: "Backend",
    readTime: "8 dk",
  },
  {
    slug: "geo-nedir-yapay-zeka-seo",
    title: "GEO Nedir? Yapay Zeka Çağında Yeni SEO",
    excerpt:
      "Üretken arama motorları görünürlüğü nasıl değiştiriyor? GEO stratejisiyle markanızı yapay zeka cevaplarında öne çıkarın.",
    category: "SEO / GEO",
    readTime: "6 dk",
  },
  {
    slug: "nextjs-15-performans",
    title: "Next.js 15 ile Performans: 0.8s LCP'ye Giden Yol",
    excerpt:
      "App Router, sunucu bileşenleri ve akıllı önbellekleme ile gerçek dünyada nasıl hız kazandığımızı anlatıyoruz.",
    category: "Frontend",
    readTime: "7 dk",
  },
  {
    slug: "uzaktan-calisma-kulturu",
    title: "Asenkron Uzaktan Çalışma Kültürü Nasıl Kurulur?",
    excerpt:
      "İki ülkeye yayılmış bir ekibi verimli tutan iletişim ilkeleri, araçlar ve şeffaflık pratikleri.",
    category: "Kültür",
    readTime: "5 dk",
  },
  {
    slug: "bulut-maliyet-optimizasyonu",
    title: "AWS'de Bulut Maliyetlerini Düşürmenin 7 Yolu",
    excerpt:
      "Performanstan ödün vermeden bulut faturanızı küçültmek için uyguladığımız kanıtlanmış optimizasyon teknikleri.",
    category: "Bulut",
    readTime: "9 dk",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">Blog</span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Mühendislik, tasarım ve büyüme üzerine notlar
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Sahadan öğrendiklerimizi; yazılım mimarisi, bulut, SEO/GEO ve uzaktan çalışma
            başlıklarında paylaşıyoruz.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex flex-col rounded-card border border-line bg-white p-6 transition hover:border-accent hover:shadow-lg"
            >
              <span className="inline-flex w-fit items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                {p.category}
              </span>
              <h2 className="mt-4 text-lg font-semibold text-primary">{p.title}</h2>
              <p className="mt-2 flex-1 text-sm text-text-secondary">{p.excerpt}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-text-muted">
                  <Clock className="h-3.5 w-3.5" /> {p.readTime} okuma
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2">
                  Oku <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-semibold text-primary">Bir projeniz mi var?</h2>
          <p className="mt-3 text-text-secondary">
            Yazdıklarımızı hayata geçirmemizi ister misiniz? Bize ulaşın.
          </p>
          <Link
            href="/iletisim"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-white hover:bg-accent-hover"
          >
            İletişime Geçin <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
