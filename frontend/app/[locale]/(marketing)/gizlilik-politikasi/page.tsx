import { LegalPage } from "@/components/public/LegalPage";

export const metadata = {
  title: "Gizlilik Politikası — Sefaris",
  description:
    "KVKK ve GDPR uyumlu kişisel verilerin işlenmesi ve korunmasına ilişkin gizlilik politikamız.",
};

export default function Page() {
  return (
    <LegalPage
      title="Gizlilik Politikası"
      updated="9 Temmuz 2026"
      intro="Sefaris olarak kişisel verilerinizin güvenliğine büyük önem veriyoruz. Bu Gizlilik Politikası, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Avrupa Birliği Genel Veri Koruma Tüzüğü (GDPR) kapsamında, verilerinizi nasıl topladığımızı, işlediğimizi ve koruduğumuzu açıklar."
      sections={[
        {
          heading: "Veri Sorumlusu",
          paragraphs: [
            "KVKK ve GDPR kapsamında kişisel verileriniz, veri sorumlusu sıfatıyla Sefaris tarafından işlenmektedir. Her türlü soru ve talebiniz için bizimle iletişim sayfamız üzerinden ulaşabilirsiniz.",
          ],
        },
        {
          heading: "Toplanan Kişisel Veriler",
          paragraphs: [
            "İletişim formu, hizmet talepleri ve iş başvuruları aracılığıyla ad-soyad, e-posta adresi, şirket bilgisi ve tarafınızca iletilen mesaj içerikleri gibi verileri topluyoruz.",
            "Web sitemizi ziyaretinizde çerezler aracılığıyla sınırlı teknik veri (IP adresi, tarayıcı bilgisi, ziyaret istatistikleri) işlenebilir.",
          ],
        },
        {
          heading: "İşleme Amaçları",
          paragraphs: [
            "Kişisel verileriniz; taleplerinizi yanıtlamak, hizmet sunmak, sözleşmesel yükümlülükleri yerine getirmek, iş başvurularını değerlendirmek ve yasal yükümlülükleri karşılamak amacıyla işlenir.",
            "Verileriniz, açık rızanız olmadan pazarlama amacıyla üçüncü taraflarla paylaşılmaz.",
          ],
        },
        {
          heading: "Hukuki Sebepler",
          paragraphs: [
            "Verileriniz; açık rızanız, bir sözleşmenin kurulması veya ifası, hukuki yükümlülüğün yerine getirilmesi ve meşru menfaat hukuki sebeplerine dayanılarak işlenir.",
          ],
        },
        {
          heading: "Verilerin Saklanma Süresi",
          paragraphs: [
            "Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca ve ilgili mevzuatta öngörülen zamanaşımı süreleri kadar saklanır. Sürenin sonunda verileriniz silinir, yok edilir veya anonim hale getirilir.",
          ],
        },
        {
          heading: "İlgili Kişinin Hakları",
          paragraphs: [
            "KVKK madde 11 ve GDPR uyarınca; verilerinize erişme, düzeltme, silme, işlemeyi kısıtlama, veri taşınabilirliği ve itiraz haklarına sahipsiniz.",
            "Bu haklarınızı kullanmak için iletişim kanallarımız üzerinden bize başvurabilirsiniz. Talepleriniz en geç 30 gün içinde sonuçlandırılır.",
          ],
        },
        {
          heading: "Veri Güvenliği",
          paragraphs: [
            "Verilerinizi yetkisiz erişime, kayba ve kötüye kullanıma karşı korumak için şifreleme, erişim kontrolü ve düzenli güvenlik denetimleri dahil uygun teknik ve idari tedbirleri uygularız.",
          ],
        },
        {
          heading: "Politika Değişiklikleri",
          paragraphs: [
            "Bu Gizlilik Politikası zaman zaman güncellenebilir. Güncel sürüm her zaman bu sayfada yayımlanır ve yürürlük tarihi belirtilir.",
          ],
        },
      ]}
    />
  );
}
