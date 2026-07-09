import { ServiceDetail } from "@/components/public/ServiceDetail";

export const metadata = {
  title: "Almanya Proje Ortaklığı & Outsourcing — Sefaris",
  description:
    "Almanya pazarına açılan kurumlar için güvenilir yazılım proje ortaklığı ve ekip genişletme.",
};

export default function Page() {
  return (
    <ServiceDetail
      eyebrow="Proje Ortaklığı & Outsourcing"
      title="Almanya ve Avrupa için güvenilir yazılım ortağınız"
      intro="Almanya&apos;daki kurumlara, Türkiye&apos;nin mühendislik gücünü şeffaf ve öngörülebilir bir ortaklık modeliyle sunuyoruz."
      problem={[
        "Almanya&apos;da nitelikli yazılım kaynağına ulaşmak zor ve maliyetli.",
        "Uzak ekiplerle çalışırken iletişim, kalite ve zaman dilimi endişeleri yaşanıyor.",
        "Kısa vadeli freelancer çözümleri sürdürülebilir değil.",
      ]}
      solution={[
        "Almanya standartlarında çalışan, adanmış hibrit ekipler kurgular.",
        "Ortak zaman dilimleri ve asenkron iş akışlarıyla kesintisiz iş birliği sağlarız.",
        "Sözleşme, fatura ve raporlamada tam şeffaflık ve KVKK/GDPR uyumu sunarız.",
      ]}
      process={[
        { step: "İhtiyaç Eşleştirme", desc: "Rol, seviye ve teknoloji ihtiyaçlarınızı analiz ederiz." },
        { step: "Ekip Kurulumu", desc: "Sizin için doğru profilleri seçer ve onaya sunarız." },
        { step: "Entegrasyon", desc: "Ekibi süreçlerinize ve araçlarınıza dahil ederiz." },
        { step: "Sürekli Teslimat", desc: "Ölçülebilir çıktılar ve düzenli raporlarla ilerleriz." },
      ]}
      technologies={[
        "Scrum", "Jira", "Slack", "Git", "Spring Boot", "Next.js",
        "AWS", "Docker", "CI/CD", "GDPR / KVKK",
      ]}
      ctaTitle="Ekibinizi genişletmeye hazır mısınız?"
    />
  );
}
