# Sefaris — Genel Bilgi & Kullanım Rehberi

Ekibe özel yönetim paneli ve proje hakkında bilmen gereken her şey.

## Bağlantılar

- **Ana sayfa:** https://sefaris.site
- **Yönetim paneli:** https://sefaris.site/admin

## Giriş nasıl yapılır?

1. https://sefaris.site/admin adresine git.
2. İki yol var:
   - **Google ile devam et** (izinli e-postanla), veya
   - **E-posta + şifre** ile giriş yap.
3. Giriş başarılıysa görev panosu açılır.

> Erişim ekipteki belirli e-postalara tanımlıdır. Girişte sorun yaşarsan
> yöneticinle iletişime geç. Şifreni değiştirebilirsin.

## Panoda ne var?

Giriş yapınca sırasıyla:

1. **Güncellemeler** — Projede yapılan son değişiklikler / duyurular.
2. **İstatistikler** — Toplam / açık / tamamlanan / geciken görev sayısı.
3. **Yeni görev ekle** — Görev başlığı, sorumlu kişi, teslim tarihi ve
   (opsiyonel) dosya ekleyebilirsin.
4. **Görev listesi** — Her görev için:
   - ✓ ile tamamlandı işaretle / geri aç
   - **Düzenle** / **Sil**
   - **Dosyalar** — göreve dosya yükle/indir (en fazla 10 MB)
   - **Yorumlar** — göreve not/yorum ekle

## Görev ekleme ipuçları

- **Görev:** Ne yapılacağını net yaz (en az 2 karakter).
- **Kim:** Sorumlu kişinin adı (boş bırakırsan "Ortak" olur).
- **Ne zamana kadar:** Teslim tarihi. Geçmiş tarihli açık görevler
  "Geciken" olarak kırmızı görünür.

## Proje neyle ilgili? (özet)

Sefaris; ekibin ortak çalışma ve görev takibi için kurduğu platform.
Ana hedef: Almanya pazarında freelance/proje bazlı birlikte iş alıp
geliştirmek, pazarlamak ve geliri paylaşmak.

**4 ana konu başlığı:**
1. **Kiwi / Kiwi Akademi** — eğitim teknolojileri (ayrı değerlendirilecek)
2. **Markalaşma / Kurumsal Kimlik** — kurumsal kimlik + referans web sitesi
3. **Almanya İş Alımı** — Almanya'dan gelen web/yazılım işlerini dağıtmak
4. **SEO / GEO** — müşteri bulup SEO işlerinden komisyon

## Sık sorulanlar

**Girişte "server-side exception" görüyorum.**
Sunucu ortam değişkenleri eksik olabilir; yöneticiye bildir.

**Google ile giriş dönmüyor.**
Yönetici Supabase'de yönlendirme adresini (`/auth/callback`) tanımlamalı.

**Yeni bir güncelleme duyurusu ekletmek istiyorum.**
Yöneticiye ilet; "Güncellemeler" listesi kod tarafında elle güncelleniyor.

---

_Bu rehber bilgilendirme amaçlıdır. Şifreler ve teknik anahtarlar burada
yer almaz; güvenli kanaldan paylaşılır._
