import { ServiceDetail } from "@/components/public/ServiceDetail";

export const metadata = {
  title: "Özel Yazılım Geliştirme — Sefaris",
  description:
    "Web, mobil ve Spring Boot tabanlı ölçeklenebilir mimariler ile ihtiyaca özel yazılım geliştirme.",
};

export default function Page() {
  return (
    <ServiceDetail
      eyebrow="Özel Yazılım Geliştirme"
      title="İşinize özel, ölçeklenebilir yazılım çözümleri"
      intro="Hazır paketlerin sınırlarına takılmadan; iş süreçlerinize birebir uyan, büyümeye hazır web ve mobil uygulamalar geliştiriyoruz."
      problem={[
        "Hazır çözümler iş süreçlerinize tam uymuyor ve süreçlerinizi yazılıma uydurmak zorunda kalıyorsunuz.",
        "Artan kullanıcı yükünde uygulama yavaşlıyor, teknik borç birikiyor.",
        "Farklı sistemler birbiriyle konuşmuyor, veri siloları oluşuyor.",
      ]}
      solution={[
        "İş akışlarınıza birebir uyan, modüler ve bakımı kolay bir mimari kurgular.",
        "Yatay ölçeklenebilen mikroservis ve bulut tabanlı altyapılar tasarlar.",
        "API öncelikli yaklaşımla mevcut sistemlerinizi tek çatı altında entegre ederiz.",
      ]}
      process={[
        { step: "Keşif & Analiz", desc: "İhtiyaçları, kısıtları ve başarı ölçütlerini netleştiririz." },
        { step: "Mimari & Tasarım", desc: "Ölçeklenebilir mimari ve kullanıcı deneyimini tasarlarız." },
        { step: "Geliştirme", desc: "Kısa iterasyonlarla test edilebilir sürümler teslim ederiz." },
        { step: "Yayın & Bakım", desc: "CI/CD ile canlıya alır, izler ve sürekli iyileştiririz." },
      ]}
      technologies={[
        "Java", "Spring Boot", "Hibernate", "Next.js", "React", "TypeScript",
        "React Native", "PostgreSQL", "Redis", "Docker", "AWS",
      ]}
    />
  );
}
