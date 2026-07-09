import { ServiceDetail } from "@/components/public/ServiceDetail";

export const metadata = {
  title: "Eğitim Teknolojileri — Sefaris",
  description:
    "LMS, e-öğrenme platformları ve kurum içi teknik eğitim programları.",
};

export default function Page() {
  return (
    <ServiceDetail
      eyebrow="Eğitim Teknolojileri"
      title="Öğrenmeyi ölçeklenebilir ve ölçülebilir kılın"
      intro="Kurumsal eğitimden çevrimiçi kurslara; modern, etkileşimli ve veri odaklı öğrenme platformları geliştiriyoruz."
      problem={[
        "Mevcut eğitim içerikleri dağınık ve takibi zor.",
        "Öğrenen ilerlemesi ölçülemiyor, geri bildirim döngüsü yok.",
        "Platform artan kullanıcı sayısında zorlanıyor.",
      ]}
      solution={[
        "Merkezi bir LMS ile içerik, sınav ve sertifikaları tek yerde toplar.",
        "İlerleme takibi, analitik ve kişiselleştirilmiş öğrenme yolları sunar.",
        "Yüksek eş zamanlı kullanıma hazır ölçeklenebilir altyapı kurarız.",
      ]}
      process={[
        { step: "İhtiyaç Analizi", desc: "Öğrenme hedefleri ve kullanıcı profillerini belirleriz." },
        { step: "Platform Tasarımı", desc: "İçerik akışı ve etkileşim modelini kurgularız." },
        { step: "Geliştirme", desc: "LMS, video ve değerlendirme modüllerini inşa ederiz." },
        { step: "Yayın & Analiz", desc: "Canlıya alır, öğrenme verilerini analiz ederiz." },
      ]}
      technologies={[
        "Next.js", "Spring Boot", "SCORM / xAPI", "PostgreSQL",
        "Video Streaming", "WebRTC", "Analytics", "AWS",
      ]}
      ctaTitle="Eğitim platformunuzu kuralım"
    />
  );
}
