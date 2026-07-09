import { ServiceDetail } from "@/components/public/ServiceDetail";

export const metadata = {
  title: "AI & Bulut Danışmanlığı — Sefaris",
  description:
    "AWS/Cloud, mikroservis mimarisi ve yapay zeka entegrasyonlarında uçtan uca danışmanlık.",
};

export default function Page() {
  return (
    <ServiceDetail
      eyebrow="AI & Bulut Danışmanlığı"
      title="Bulut ve yapay zekada doğru stratejik kararlar"
      intro="Mevcut altyapınızı değerlendirip; maliyet, performans ve güvenlik dengesini gözeten bir bulut ve yapay zeka yol haritası çıkarıyoruz."
      problem={[
        "Bulut maliyetleri kontrolden çıkıyor, kaynaklar verimsiz kullanılıyor.",
        "Monolitik yapı yeni özelliklerin hızını düşürüyor.",
        "Yapay zeka projelerine nereden başlanacağı belirsiz.",
      ]}
      solution={[
        "Bulut mimarinizi gözden geçirip maliyet ve performans optimizasyonu yapar.",
        "Monolitten mikroservise kademeli geçiş stratejisi kurgular.",
        "İş değeri yüksek, uygulanabilir yapay zeka kullanım senaryoları belirleriz.",
      ]}
      process={[
        { step: "Değerlendirme", desc: "Mevcut mimari, maliyet ve olgunluk seviyesini analiz ederiz." },
        { step: "Yol Haritası", desc: "Önceliklendirilmiş, uygulanabilir bir plan hazırlarız." },
        { step: "Uygulama Desteği", desc: "Ekibinizle birlikte çözümü hayata geçiririz." },
        { step: "Optimizasyon", desc: "İzleme ve sürekli iyileştirme ile verimi artırırız." },
      ]}
      technologies={[
        "AWS", "Azure", "Kubernetes", "Terraform", "Docker",
        "Mikroservisler", "OpenAI", "LangChain", "Vektör Veritabanları",
      ]}
      ctaTitle="Bulut yolculuğunuzu planlayalım"
    />
  );
}
