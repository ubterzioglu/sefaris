import { Link } from "@/i18n/navigation";
import { ArrowRight, Target, Layers, BarChart3 } from "lucide-react";

type CaseStudy = {
  title: string;
  sector: string;
  tech: string;
  summary: string;
  challenge: string;
  architecture: string[];
  results: { value: string; label: string }[];
};

const CASES: Record<string, CaseStudy> = {
  "lojistik-takip-platformu": {
    title: "Gerçek Zamanlı Lojistik Takip Platformu",
    sector: "Lojistik — Berlin",
    tech: "Spring Boot · Next.js · AWS",
    summary:
      "Berlin merkezli bir lojistik şirketi için filo ve sevkiyatların gerçek zamanlı izlendiği uçtan uca bir platform geliştirdik.",
    challenge:
      "Mevcut sistem, artan sevkiyat hacminde yavaşlıyor ve konum güncellemeleri gecikmeli işleniyordu. Farklı depo sistemleri birbiriyle konuşmuyordu.",
    architecture: [
      "Olay tabanlı mimari ile gerçek zamanlı konum akışı",
      "Spring Boot mikroservisleri ve mesaj kuyruğu (event streaming)",
      "Next.js tabanlı canlı izleme paneli",
      "AWS üzerinde otomatik ölçeklenen altyapı",
    ],
    results: [
      { value: "%40", label: "performans artışı" },
      { value: "3x", label: "eş zamanlı sevkiyat kapasitesi" },
      { value: "%99.9", label: "hizmet erişilebilirliği" },
    ],
  },
  "fintech-odeme-altyapisi": {
    title: "Mobil Fintech Ödeme Altyapısı",
    sector: "Fintech — İstanbul",
    tech: "React Native · Spring Boot · PostgreSQL",
    summary:
      "Bir fintech girişimi için düşük gecikmeli, güvenli ve ölçeklenebilir bir mobil ödeme altyapısı kurduk.",
    challenge:
      "Ödeme işlemlerinde yüksek gecikme ve güvenlik uyumluluğu endişeleri vardı. Kullanıcı deneyimi yavaş onaylar nedeniyle olumsuz etkileniyordu.",
    architecture: [
      "React Native ile çok platformlu mobil uygulama",
      "Idempotent ödeme servisleri ve güvenli token yönetimi",
      "PostgreSQL üzerinde işlem tutarlılığı ve denetim kaydı",
      "Gözlemlenebilirlik için metrik ve izleme katmanı",
    ],
    results: [
      { value: "< 50ms", label: "ortalama API yanıtı" },
      { value: "%100", label: "işlem tutarlılığı" },
      { value: "PCI-DSS", label: "uyumlu mimari" },
    ],
  },
  "eticaret-hiz-optimizasyonu": {
    title: "E-ticaret Hız & Dönüşüm Optimizasyonu",
    sector: "E-ticaret — Münih",
    tech: "Next.js · Docker · Redis",
    summary:
      "Yüksek trafikli bir e-ticaret sitesinin performansını ve dönüşüm oranını artırmak için kapsamlı bir optimizasyon yürüttük.",
    challenge:
      "Yavaş sayfa yüklemeleri sepet terk oranını yükseltiyor, mobil deneyim zayıf kalıyordu.",
    architecture: [
      "Next.js ile sunucu tarafı render ve statik üretim",
      "Redis önbellekleme ve CDN optimizasyonu",
      "Görsel ve kod bölümleme ile hafifletilmiş yükler",
      "Docker tabanlı yeniden üretilebilir dağıtım",
    ],
    results: [
      { value: "0.8s", label: "LCP" },
      { value: "%32", label: "dönüşüm artışı" },
      { value: "%55", label: "daha düşük sayfa boyutu" },
    ],
  },
  "saglik-randevu-sistemi": {
    title: "Bulut Tabanlı Sağlık Randevu Sistemi",
    sector: "Sağlık — İzmir",
    tech: "Spring Boot · Kubernetes · PostgreSQL",
    summary:
      "Çok şubeli bir sağlık kuruluşu için merkezi, yüksek erişilebilirlikli randevu ve hasta yönetim sistemi geliştirdik.",
    challenge:
      "Şubeler arası veri tutarsızlığı ve yoğun saatlerdeki sistem kesintileri hasta memnuniyetini düşürüyordu.",
    architecture: [
      "Kubernetes üzerinde yüksek erişilebilirlikli servisler",
      "Merkezi hasta ve randevu veri modeli",
      "Rol tabanlı erişim ve KVKK uyumlu veri yönetimi",
      "Otomatik yedekleme ve felaket kurtarma",
    ],
    results: [
      { value: "%99.9", label: "uptime" },
      { value: "%45", label: "daha hızlı randevu" },
      { value: "0", label: "veri tutarsızlığı" },
    ],
  },
  "egitim-lms-platformu": {
    title: "Kurumsal Eğitim LMS Platformu",
    sector: "Eğitim — Uzaktan",
    tech: "Next.js · Spring Boot · AWS",
    summary:
      "Büyük ölçekli bir kurum için 50.000+ çalışanın kullandığı bir öğrenme yönetim sistemi kurduk.",
    challenge:
      "Dağınık eğitim içerikleri, ölçülemeyen ilerleme ve yüksek eş zamanlı kullanımda yaşanan performans sorunları mevcuttu.",
    architecture: [
      "SCORM/xAPI uyumlu içerik motoru",
      "Video streaming ve adaptif oynatma",
      "Öğrenme analitiği ve kişiselleştirilmiş yollar",
      "AWS üzerinde otomatik ölçeklenen altyapı",
    ],
    results: [
      { value: "50K+", label: "aktif kullanıcı" },
      { value: "%80", label: "tamamlama oranı" },
      { value: "%99.9", label: "erişilebilirlik" },
    ],
  },
  "uretim-veri-panosu": {
    title: "Endüstriyel Üretim Veri Panosu",
    sector: "Üretim — Bursa",
    tech: "React · IoT · TimescaleDB",
    summary:
      "Bir üretim tesisi için makine verilerini gerçek zamanlı izleyen ve analiz eden bir veri panosu geliştirdik.",
    challenge:
      "Makine verileri manuel toplanıyor, arızalar geç fark ediliyor ve verimlilik ölçülemiyordu.",
    architecture: [
      "IoT sensörlerinden gerçek zamanlı veri toplama",
      "TimescaleDB ile zaman serisi depolama",
      "React tabanlı canlı üretim panosu",
      "Anomali tespiti ve uyarı mekanizması",
    ],
    results: [
      { value: "%25", label: "verimlilik artışı" },
      { value: "%60", label: "daha hızlı arıza tespiti" },
      { value: "7/24", label: "canlı izleme" },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(CASES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const cs = CASES[slug];
  return {
    title: cs ? `${cs.title} — Sefaris Projeler` : "Proje — Sefaris",
    description: cs?.summary ?? "Sefaris vaka çalışması.",
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const cs: CaseStudy = CASES[slug] ?? {
    title: "Vaka Çalışması",
    sector: "Genel",
    tech: "Modern Teknoloji Yığını",
    summary:
      "Bu vaka çalışmasının detayları yakında yayınlanacaktır. Benzer bir proje için bizimle iletişime geçebilirsiniz.",
    challenge:
      "Kurumların dijital dönüşüm süreçlerinde karşılaştığı ölçeklenebilirlik, performans ve entegrasyon zorluklarına odaklandık.",
    architecture: [
      "Ölçeklenebilir mikroservis mimarisi",
      "Bulut tabanlı, otomatik ölçeklenen altyapı",
      "Modern web ve mobil ön yüz",
      "Gözlemlenebilirlik ve sürekli teslimat",
    ],
    results: [
      { value: "%40", label: "performans artışı" },
      { value: "%99.9", label: "erişilebilirlik" },
      { value: "2x", label: "geliştirme hızı" },
    ],
  };

  return (
    <>
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <Link href="/projeler" className="text-sm font-medium text-accent hover:underline">
            ← Tüm Projeler
          </Link>
          <div className="mt-6 text-sm font-semibold uppercase tracking-wide text-accent">{cs.sector}</div>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">{cs.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">{cs.tech}</p>
        </div>
      </section>

      {/* Özet & Zorluk */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-card border border-line bg-surface p-8">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-accent" />
              <h2 className="text-2xl font-semibold text-primary">Proje Özeti</h2>
            </div>
            <p className="mt-4 text-text-secondary">{cs.summary}</p>
          </div>
          <div className="rounded-card border border-line bg-surface p-8">
            <h2 className="text-2xl font-semibold text-primary">Zorluk</h2>
            <p className="mt-4 text-text-secondary">{cs.challenge}</p>
          </div>
        </div>
      </section>

      {/* Çözüm Mimarisi */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Layers className="h-8 w-8 text-accent" />
            <h2 className="text-3xl font-semibold text-primary">Çözüm Mimarisi</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {cs.architecture.map((a, i) => (
              <div key={a} className="flex gap-4 rounded-card border border-line bg-white p-6">
                <div className="text-lg font-bold text-accent">0{i + 1}</div>
                <p className="text-text-secondary">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sonuç & Metrikler */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-accent" />
          <h2 className="text-3xl font-semibold text-primary">Sonuç & Metrikler</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {cs.results.map((r) => (
            <div key={r.label} className="rounded-card border border-line p-8 text-center">
              <div className="text-4xl font-bold text-accent">{r.value}</div>
              <div className="mt-2 text-sm text-text-secondary">{r.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-semibold">Benzer bir proje mi planlıyorsunuz?</h2>
          <p className="mt-3 text-slate-300">
            Deneyimimizi sizin hedeflerinize uyarlayalım. Hemen görüşelim.
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
