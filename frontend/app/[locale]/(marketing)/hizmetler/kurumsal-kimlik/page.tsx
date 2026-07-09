import { ServiceDetail } from "@/components/public/ServiceDetail";

export const metadata = {
  title: "Kurumsal Kimlik & Tasarım — Sefaris",
  description:
    "Marka kimliği, tasarım sistemleri ve kullanıcı deneyimi ile dijital varlığınızı güçlendirin.",
};

export default function Page() {
  return (
    <ServiceDetail
      eyebrow="Kurumsal Kimlik & Tasarım"
      title="Markanızı tutarlı ve akılda kalıcı kılın"
      intro="Logo ve renkten öte; tüm dijital temas noktalarında tutarlı çalışan bir marka ve tasarım sistemi kuruyoruz."
      problem={[
        "Marka görseliniz platformlar arasında tutarsız görünüyor.",
        "Tasarım her projede sıfırdan yapıldığı için zaman ve para kaybediliyor.",
        "Kullanıcı deneyimi zayıf, dönüşüm oranları düşük.",
      ]}
      solution={[
        "Marka değerlerinizi yansıtan bütüncül bir görsel kimlik oluşturur.",
        "Yeniden kullanılabilir bileşenlerden oluşan bir tasarım sistemi kurar.",
        "Kullanıcı araştırmasına dayalı, dönüşüm odaklı arayüzler tasarlarız.",
      ]}
      process={[
        { step: "Marka Keşfi", desc: "Değerlerinizi, hedef kitlenizi ve rakipleri analiz ederiz." },
        { step: "Kimlik Tasarımı", desc: "Logo, renk, tipografi ve görsel dili oluştururuz." },
        { step: "Tasarım Sistemi", desc: "Bileşen kütüphanesi ve stil rehberi hazırlarız." },
        { step: "Uygulama", desc: "Kimliği web ve ürünlerinize tutarlıca uygularız." },
      ]}
      technologies={[
        "Figma", "Design Tokens", "Storybook", "Tailwind CSS",
        "Adobe Illustrator", "Erişilebilirlik (WCAG)",
      ]}
      ctaTitle="Marka kimliğinizi güçlendirelim"
    />
  );
}
