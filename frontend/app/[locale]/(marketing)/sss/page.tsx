"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { ChevronDown, ArrowRight } from "lucide-react";

const FAQS = [
  {
    q: "Hangi hizmetleri sunuyorsunuz?",
    a: "Özel yazılım geliştirme, Almanya proje ortaklığı ve outsourcing, SEO/GEO ve dijital büyüme, AI & bulut danışmanlığı, kurumsal kimlik & tasarım ile eğitim teknolojileri alanlarında uçtan uca hizmet veriyoruz.",
  },
  {
    q: "Uzaktan mı çalışıyorsunuz?",
    a: "Evet. Türkiye ve Almanya'ya yayılmış, tamamen uzaktan ve asenkron çalışan hibrit bir ekibiz. Ofisler İstanbul, İzmir, Berlin ve Münih'te bulunsa da iş birliğimiz konumdan bağımsızdır.",
  },
  {
    q: "Bir proje ne kadar sürede tamamlanır?",
    a: "Süre; projenin kapsamına, karmaşıklığına ve önceliklerine göre değişir. Keşif görüşmesinin ardından size net bir zaman çizelgesi ve kilometre taşları sunarız. Çoğu MVP projesini 6-12 hafta arasında teslim ederiz.",
  },
  {
    q: "Hangi teknolojileri kullanıyorsunuz?",
    a: "Backend tarafında Java, Spring Boot ve Hibernate; frontend tarafında Next.js, React ve TypeScript; altyapıda AWS, Docker ve Kubernetes kullanıyoruz. Teknoloji seçimini her zaman projenin ihtiyacına göre yapıyoruz.",
  },
  {
    q: "Fiyatlandırma nasıl belirleniyor?",
    a: "Projeye özel kapsam belirlendikten sonra sabit fiyat veya adanmış ekip (aylık) modeli sunuyoruz. Şeffaflık ilkemiz gereği tüm maliyet kalemlerini önceden paylaşıyoruz.",
  },
  {
    q: "Verilerimin güvenliği nasıl sağlanıyor?",
    a: "Tüm süreçlerimiz KVKK ve GDPR ile uyumludur. Şifreleme, rol tabanlı erişim kontrolü, düzenli güvenlik denetimleri ve gizlilik sözleşmeleri ile verilerinizi koruruz.",
  },
  {
    q: "Mevcut ekibimizi genişletebilir misiniz?",
    a: "Evet. Ekip genişletme (team extension) modelimizle, adanmış geliştiricilerimizi sizin süreçlerinize ve araçlarınıza entegre ederek mevcut ekibinizin bir parçası gibi çalıştırabiliriz.",
  },
  {
    q: "Proje sonrası bakım ve destek sağlıyor musunuz?",
    a: "Kesinlikle. Yayın sonrası izleme, hata giderme, performans iyileştirme ve yeni özellik geliştirme için sürekli bakım ve destek paketleri sunuyoruz.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-card border border-line bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-primary">{q}</span>
        <ChevronDown
          className={"h-5 w-5 shrink-0 text-accent transition-transform " + (open ? "rotate-180" : "")}
        />
      </button>
      {open && <p className="px-6 pb-5 text-text-secondary">{a}</p>}
    </div>
  );
}

export default function FaqPage() {
  return (
    <>
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">SSS</span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Sıkça Sorulan Sorular
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Merak ettiklerinizi derledik. Cevabını bulamadığınız bir soru varsa bize ulaşın.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="space-y-4">
          {FAQS.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      <section className="bg-surface py-16 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-semibold text-primary">Başka sorunuz mu var?</h2>
          <p className="mt-3 text-text-secondary">
            Ekibimiz tüm sorularınızı yanıtlamaktan memnuniyet duyar.
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
