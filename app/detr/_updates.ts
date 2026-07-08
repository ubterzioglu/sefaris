/**
 * Hard-coded DETR changelog / "Güncellemeler".
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
    title: "Toplantı görevleri panoya eklendi",
    body:
      "CorteQS ekip görüşmelerinden (2 oturum) çıkan görevler panoya işlendi. Ana hedef: Almanya pazarında freelance/proje bazlı ortak çalışma. 4 ana başlık: Kiwi, Markalaşma/Kurumsal Kimlik, Almanya iş alımı, SEO/GEO. Herkes 13'üne kadar not/soru yazacak; 14'ünde tekrar toplantı.",
    tag: "toplantı"
  },
  {
    date: "2026-07-08",
    title: "DETR admin panosu yayında",
    body:
      "Görev panosu sefaris.site/detr adresine taşındı: görevler, sorumlular, teslim tarihleri, yorumlar ve dosya ekleri. Giriş, e-posta allowlist + şifre ile yapılıyor.",
    tag: "yeni"
  },
  {
    date: "2026-07-08",
    title: "Güncellemeler sekmesi eklendi",
    body:
      "Yapılan değişiklikleri buradan takip edeceğiz. Şimdilik elle güncelleniyor.",
    tag: "yeni"
  }
];
