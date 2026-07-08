/**
 * Hard-coded admin changelog / "Güncellemeler".
 *
 * No database — edit this list by hand as changes ship. Newest first.
 * `date` is a plain yyyy-mm-dd string (rendered without timezone drift).
 * `tag` is an optional small label (e.g. "yeni", "düzeltme", "iyileştirme").
 */
export interface DetrUpdate {
  date: string;
  title: string;
  body: string;
  tag?: string;
}

export const DETR_UPDATES: DetrUpdate[] = [
  {
    date: "2026-07-08",
    title: "Yönetim paneli /admin adresine taşındı",
    body:
      "Giriş artık sefaris.site/admin üzerinden. Google veya e-posta/şifre ile giriş yapılıyor; eski /detr adresi kaldırıldı.",
    tag: "yeni"
  },
  {
    date: "2026-07-08",
    title: "Toplantı görevleri panoya eklendi",
    body:
      "CorteQS ekip görüşmelerinden (2 oturum) çıkan görevler panoya işlendi. Ana hedef: Almanya pazarında freelance/proje bazlı ortak çalışma. 4 ana başlık: Kiwi, Markalaşma/Kurumsal Kimlik, Almanya iş alımı, SEO/GEO. Herkes 13'üne kadar not/soru yazacak; 14'ünde tekrar toplantı.",
    tag: "toplantı"
  },
  {
    date: "2026-07-08",
    title: "Güncellemeler sekmesi eklendi",
    body:
      "Yapılan değişiklikleri buradan takip edeceğiz. Şimdilik elle güncelleniyor.",
    tag: "yeni"
  }
];
