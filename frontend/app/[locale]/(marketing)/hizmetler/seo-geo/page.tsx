import { ServiceDetail } from "@/components/public/ServiceDetail";

export const metadata = {
  title: "SEO / GEO & Dijital Büyüme — Sefaris",
  description:
    "Arama motoru ve üretken yapay zeka görünürlüğü ile sürdürülebilir organik büyüme.",
};

export default function Page() {
  return (
    <ServiceDetail
      eyebrow="SEO / GEO & Dijital Büyüme"
      title="Arama motorlarında ve yapay zekada görünür olun"
      intro="Klasik SEO&apos;nun yanında GEO (Generative Engine Optimization) ile markanızı yapay zeka asistanlarının cevaplarında da öne çıkarıyoruz."
      problem={[
        "Web siteniz organik aramada rakiplerinizin gerisinde kalıyor.",
        "Trafik var ama dönüşüme yansımıyor.",
        "Yapay zeka arama araçları markanızı önermiyor.",
      ]}
      solution={[
        "Teknik SEO, içerik stratejisi ve site hızını uçtan uca optimize eder.",
        "Dönüşüm odaklı içerik ve iç bağlantı mimarisi kurgular.",
        "Yapılandırılmış veri ve otorite içeriklerle GEO görünürlüğünü artırırız.",
      ]}
      process={[
        { step: "Denetim", desc: "Teknik, içerik ve backlink profilinizi analiz ederiz." },
        { step: "Strateji", desc: "Anahtar kelime ve içerik yol haritası oluştururuz." },
        { step: "Uygulama", desc: "Teknik iyileştirme ve içerik üretimini hayata geçiririz." },
        { step: "Ölçüm & Büyüme", desc: "Sıralama, trafik ve dönüşümü izleyip optimize ederiz." },
      ]}
      technologies={[
        "Google Search Console", "GA4", "Ahrefs", "Semrush",
        "Schema.org", "Core Web Vitals", "Next.js SSR", "GEO",
      ]}
      ctaTitle="Organik büyümeyi başlatalım"
    />
  );
}
