import { LegalPage } from "@/components/public/LegalPage";

export const metadata = {
  title: "Çerez Politikası — Sefaris",
  description:
    "Web sitemizde kullanılan çerezler, türleri ve çerez tercihlerinizi nasıl yönetebileceğiniz.",
};

export default function Page() {
  return (
    <LegalPage
      title="Çerez Politikası"
      updated="9 Temmuz 2026"
      intro="Bu Çerez Politikası, Sefaris web sitesinde çerezleri nasıl kullandığımızı ve tercihlerinizi nasıl yönetebileceğinizi açıklar. Politika, KVKK ve GDPR düzenlemeleriyle uyumludur."
      sections={[
        {
          heading: "Çerez Nedir?",
          paragraphs: [
            "Çerezler, web sitelerini ziyaret ettiğinizde tarayıcınıza kaydedilen küçük metin dosyalarıdır. Sitenin düzgün çalışmasını sağlar ve kullanıcı deneyimini iyileştirmek için kullanılır.",
          ],
        },
        {
          heading: "Kullandığımız Çerez Türleri",
          paragraphs: [
            "Zorunlu Çerezler: Sitenin temel işlevleri için gereklidir ve devre dışı bırakılamaz.",
            "Performans / Analitik Çerezleri: Ziyaretçilerin siteyi nasıl kullandığını anonim olarak ölçerek deneyimi geliştirmemize yardımcı olur.",
            "İşlevsellik Çerezleri: Dil tercihi gibi seçimlerinizi hatırlayarak size kişiselleştirilmiş bir deneyim sunar.",
          ],
        },
        {
          heading: "Çerezlerin Kullanım Amaçları",
          paragraphs: [
            "Çerezleri; site performansını ölçmek, tercihlerinizi hatırlamak, güvenliği sağlamak ve genel kullanıcı deneyimini iyileştirmek amacıyla kullanırız.",
          ],
        },
        {
          heading: "Üçüncü Taraf Çerezleri",
          paragraphs: [
            "Analitik hizmetleri gibi bazı üçüncü taraf sağlayıcılar, kendi çerezlerini yerleştirebilir. Bu çerezler ilgili sağlayıcının gizlilik politikalarına tabidir.",
          ],
        },
        {
          heading: "Çerez Tercihlerinin Yönetimi",
          paragraphs: [
            "Tarayıcı ayarlarınız üzerinden çerezleri kabul edebilir, reddedebilir veya silebilirsiniz. Zorunlu çerezlerin devre dışı bırakılması sitenin bazı bölümlerinin düzgün çalışmamasına yol açabilir.",
            "Çoğu tarayıcı, çerez ayarlarını 'Ayarlar' veya 'Gizlilik' menüsü altında yönetmenize olanak tanır.",
          ],
        },
        {
          heading: "Politika Güncellemeleri",
          paragraphs: [
            "Bu Çerez Politikası zaman zaman güncellenebilir. Değişiklikler bu sayfada yayımlandığı andan itibaren geçerli olur.",
          ],
        },
      ]}
    />
  );
}
