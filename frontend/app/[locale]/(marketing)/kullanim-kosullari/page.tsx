import { LegalPage } from "@/components/public/LegalPage";

export const metadata = {
  title: "Kullanım Koşulları — Sefaris",
  description:
    "Sefaris web sitesi ve hizmetlerinin kullanımına ilişkin şart ve koşullar.",
};

export default function Page() {
  return (
    <LegalPage
      title="Kullanım Koşulları"
      updated="9 Temmuz 2026"
      intro="Bu Kullanım Koşulları, Sefaris web sitesini ve hizmetlerini kullanımınızı düzenler. Web sitemize erişerek veya hizmetlerimizi kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız."
      sections={[
        {
          heading: "Tanımlar",
          paragraphs: [
            "Bu metinde geçen 'Sefaris', 'biz' veya 'platform' ifadeleri hizmet sağlayıcıyı; 'kullanıcı' veya 'siz' ifadeleri web sitesini ziyaret eden veya hizmetlerimizi kullanan gerçek ya da tüzel kişileri ifade eder.",
          ],
        },
        {
          heading: "Hizmetlerin Kapsamı",
          paragraphs: [
            "Sefaris; yazılım geliştirme, proje ortaklığı, danışmanlık, dijital pazarlama ve ilgili teknoloji hizmetleri sunar. Hizmetlerin kapsamı taraflar arasında imzalanan ayrı sözleşmelerle belirlenir.",
            "Web sitesi içeriği bilgilendirme amaçlıdır ve önceden haber verilmeksizin değiştirilebilir.",
          ],
        },
        {
          heading: "Kullanıcı Yükümlülükleri",
          paragraphs: [
            "Web sitesini yalnızca yasalara uygun amaçlarla kullanmayı kabul edersiniz. Platformun güvenliğini tehlikeye atacak, yetkisiz erişim sağlamaya çalışacak veya hizmetleri kötüye kullanacak eylemlerden kaçınmalısınız.",
            "İletişim formları aracılığıyla ilettiğiniz bilgilerin doğru ve güncel olmasından siz sorumlusunuz.",
          ],
        },
        {
          heading: "Fikri Mülkiyet Hakları",
          paragraphs: [
            "Web sitesindeki tüm içerik, tasarım, logo, metin ve yazılım Sefaris'e aittir veya lisanslıdır. Bu içerikler yazılı izin olmaksızın kopyalanamaz, çoğaltılamaz veya ticari amaçla kullanılamaz.",
          ],
        },
        {
          heading: "Sorumluluğun Sınırlandırılması",
          paragraphs: [
            "Web sitesi 'olduğu gibi' sunulmaktadır. Sefaris, sitenin kesintisiz veya hatasız çalışacağını garanti etmez. Sitenin kullanımından doğabilecek dolaylı zararlardan yürürlükteki mevzuatın izin verdiği ölçüde sorumlu tutulamaz.",
          ],
        },
        {
          heading: "Üçüncü Taraf Bağlantıları",
          paragraphs: [
            "Web sitemiz üçüncü taraf sitelere bağlantılar içerebilir. Bu sitelerin içeriğinden veya gizlilik uygulamalarından Sefaris sorumlu değildir.",
          ],
        },
        {
          heading: "Uygulanacak Hukuk",
          paragraphs: [
            "Bu koşullar Türkiye Cumhuriyeti kanunlarına tabidir. Doğabilecek uyuşmazlıklarda İstanbul mahkemeleri ve icra daireleri yetkilidir.",
          ],
        },
        {
          heading: "Değişiklikler",
          paragraphs: [
            "Sefaris, bu Kullanım Koşullarını dilediği zaman güncelleme hakkını saklı tutar. Güncel sürüm bu sayfada yayımlandığı andan itibaren geçerlidir.",
          ],
        },
      ]}
    />
  );
}
