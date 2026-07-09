import { Link } from "@/i18n/navigation";
import { ArrowRight, Clock } from "lucide-react";

type Post = {
  title: string;
  category: string;
  readTime: string;
  author: { name: string; role: string; initials: string };
  paragraphs: { heading?: string; body: string }[];
};

const AUTHORS = {
  emre: { name: "Emre Yıldız", role: "Yazılım Mimarı", initials: "EY" },
  deniz: { name: "Deniz Aksoy", role: "Frontend Lideri", initials: "DA" },
  mert: { name: "Mert Çelik", role: "Bulut Danışmanı", initials: "MÇ" },
};

const POSTS: Record<string, Post> = {
  "spring-boot-mikroservis-mimarisi": {
    title: "Spring Boot ile Ölçeklenebilir Mikroservis Mimarisi",
    category: "Backend",
    readTime: "8 dk",
    author: AUTHORS.emre,
    paragraphs: [
      {
        body: "Monolitik uygulamalar başlangıçta hızlıdır; ancak ekip ve trafik büyüdükçe dağıtım riskleri ve teknik borç birikir. Mikroservisler bu sorunu çözebilir, ancak yanlış uygulandığında karmaşıklığı artırır.",
      },
      {
        heading: "Ne zaman mikroservis?",
        body: "Mikroservise geçiş kararı, ekip yapınız ve alan sınırlarınızla ilgilidir. Bağımsız olarak ölçeklenmesi ve dağıtılması gereken net iş yetenekleri varsa, ayrıştırma anlamlıdır.",
      },
      {
        heading: "Spring Boot ile pratik yaklaşım",
        body: "Her servisi kendi veri sahipliği ile tasarlayın, senkron çağrılar yerine olay tabanlı iletişimi tercih edin ve dağıtık izleme ile gözlemlenebilirliği ilk günden kurun.",
      },
      {
        heading: "Sonuç",
        body: "Mikroservisler bir hedef değil, bir araçtır. Doğru alan sınırları, güçlü otomasyon ve gözlemlenebilirlik ile gerçek değer üretirler.",
      },
    ],
  },
  "geo-nedir-yapay-zeka-seo": {
    title: "GEO Nedir? Yapay Zeka Çağında Yeni SEO",
    category: "SEO / GEO",
    readTime: "6 dk",
    author: AUTHORS.deniz,
    paragraphs: [
      {
        body: "Kullanıcılar artık yalnızca arama sonuçlarına değil, yapay zeka asistanlarının ürettiği cevaplara da güveniyor. GEO (Generative Engine Optimization), markanızı bu cevaplarda görünür kılma disiplinidir.",
      },
      {
        heading: "SEO ve GEO farkı",
        body: "SEO sıralamayı, GEO ise yapay zeka tarafından alıntılanmayı hedefler. İkisi de kaliteli içerik ve yapılandırılmış veriyle beslenir, ancak GEO otorite ve netliğe daha fazla önem verir.",
      },
      {
        heading: "Nasıl optimize edilir?",
        body: "Açık, kaynaklandırılmış ve iyi yapılandırılmış içerik üretin; şema işaretlemesi kullanın ve konunuzda gerçek uzmanlık sinyalleri verin.",
      },
    ],
  },
  "nextjs-15-performans": {
    title: "Next.js 15 ile Performans: 0.8s LCP'ye Giden Yol",
    category: "Frontend",
    readTime: "7 dk",
    author: AUTHORS.deniz,
    paragraphs: [
      {
        body: "Performans bir özellik değil, temel bir gerekliliktir. Next.js 15 App Router ile gerçek dünyada LCP değerini nasıl 0.8 saniyeye indirdiğimizi paylaşıyoruz.",
      },
      {
        heading: "Sunucu bileşenleri",
        body: "Sunucu bileşenleri ile istemciye gönderilen JavaScript miktarını azalttık. Etkileşim gerektirmeyen her şeyi sunucuda render ettik.",
      },
      {
        heading: "Önbellekleme ve görseller",
        body: "Akıllı önbellekleme katmanları ve optimize edilmiş görsel yükleme ile ilk boya süresini ciddi ölçüde düşürdük.",
      },
    ],
  },
  "uzaktan-calisma-kulturu": {
    title: "Asenkron Uzaktan Çalışma Kültürü Nasıl Kurulur?",
    category: "Kültür",
    readTime: "5 dk",
    author: AUTHORS.emre,
    paragraphs: [
      {
        body: "İki ülkeye yayılmış bir ekip için asenkron çalışma bir tercih değil, zorunluluktur. Doğru kurulduğunda ise derin odak ve yüksek verim getirir.",
      },
      {
        heading: "Yazılı iletişim önceliği",
        body: "Kararları ve bağlamı yazılı hale getirmek, zaman dilimi farklarını avantaja çevirir ve herkesin aynı bilgiye erişmesini sağlar.",
      },
      {
        heading: "Şeffaflık",
        body: "Açık dokümantasyon ve görünür ilerleme, güveni artırır ve mikro yönetimi ortadan kaldırır.",
      },
    ],
  },
  "bulut-maliyet-optimizasyonu": {
    title: "AWS'de Bulut Maliyetlerini Düşürmenin 7 Yolu",
    category: "Bulut",
    readTime: "9 dk",
    author: AUTHORS.mert,
    paragraphs: [
      {
        body: "Bulut esneklik sunar, ancak kontrolsüz büyüyen maliyetler bütçeleri zorlayabilir. Performanstan ödün vermeden tasarruf etmenin yolları var.",
      },
      {
        heading: "Doğru boyutlandırma",
        body: "Gerçek kullanım metriklerine göre kaynakları küçültmek, çoğu zaman en hızlı kazancı sağlar.",
      },
      {
        heading: "Otomatik ölçekleme ve spot örnekler",
        body: "Değişken yükler için otomatik ölçekleme, kritik olmayan işler için spot örnekler kullanmak maliyeti önemli ölçüde düşürür.",
      },
    ],
  },
};

const RELATED = [
  { slug: "spring-boot-mikroservis-mimarisi", title: "Spring Boot ile Mikroservis Mimarisi" },
  { slug: "nextjs-15-performans", title: "Next.js 15 ile Performans" },
  { slug: "geo-nedir-yapay-zeka-seo", title: "GEO Nedir?" },
];

export function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS[slug];
  return {
    title: post ? `${post.title} — Sefaris Blog` : "Blog — Sefaris",
    description: post?.paragraphs[0]?.body ?? "Sefaris blog yazısı.",
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const post: Post = POSTS[slug] ?? {
    title: "Yazı Yakında",
    category: "Genel",
    readTime: "3 dk",
    author: AUTHORS.emre,
    paragraphs: [
      {
        body: "Aradığınız yazı henüz yayında değil. Bu arada diğer yazılarımıza göz atabilir veya bir konu önerisinde bulunabilirsiniz.",
      },
    ],
  };

  const related = RELATED.filter((r) => r.slug !== slug).slice(0, 2);

  return (
    <>
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <Link href="/blog" className="text-sm font-medium text-accent hover:underline">
            ← Blog
          </Link>
          <span className="mt-6 inline-flex w-fit items-center rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent">
            {post.category}
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h1>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-300">
            <Clock className="h-4 w-4" /> {post.readTime} okuma
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        {/* Yazar kartı */}
        <div className="flex items-center gap-4 rounded-card border border-line bg-surface p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 font-bold text-accent">
            {post.author.initials}
          </div>
          <div>
            <div className="font-semibold text-primary">{post.author.name}</div>
            <div className="text-sm text-text-secondary">{post.author.role}</div>
          </div>
        </div>

        {/* İçerik */}
        <div className="mt-10 space-y-6">
          {post.paragraphs.map((p, i) => (
            <div key={i}>
              {p.heading && (
                <h2 className="mb-2 text-xl font-semibold text-primary">{p.heading}</h2>
              )}
              <p className="leading-relaxed text-text-secondary">{p.body}</p>
            </div>
          ))}
        </div>

        {/* İlgili yazılar */}
        {related.length > 0 && (
          <div className="mt-16 border-t border-line pt-10">
            <h2 className="text-2xl font-semibold text-primary">İlgili Yazılar</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group rounded-card border border-line bg-white p-5 transition hover:border-accent"
                >
                  <h3 className="font-semibold text-primary">{r.title}</h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2">
                    Oku <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <section className="bg-surface py-16 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-semibold text-primary">Projenizi konuşalım</h2>
          <p className="mt-3 text-text-secondary">
            Bu konularda size nasıl yardımcı olabileceğimizi öğrenin.
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
