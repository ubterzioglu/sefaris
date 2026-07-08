# Sefaris — Proje Kılavuzu (CLAUDE.md)

Bu dosya, projede çalışan herkes (ve AI ajanları) için tek referans. Mimariyi,
kurulumu, deploy akışını ve konvansiyonları özetler.

## Ne bu proje?

**Sefaris** — `sefaris.site` domaininde yayınlanan bir Next.js uygulaması.
İki parçası var:

1. **Ana sayfa (`/`)** — Abstract animasyonlu video hero + "Sefaris" wordmark.
   Halka açık "coming soon" teaser. Countdown/form yok, sade.
2. **Yönetim paneli (`/admin`)** — Ekibe özel, Supabase Auth ile korunan görev
   panosu. Giriş yapınca **önce Güncellemeler, sonra görev listesi** görünür.

> Not: Eski `/detr` route'u kaldırıldı. Tek yönetim giriş noktası `/admin`.

## Teknoloji

- **Next.js 15.5.20** (App Router) + React 19 + TypeScript + Tailwind CSS 3
- **Supabase** (Auth + Postgres + Storage) — iki ayrı proje:
  - Sefaris projesi (`rncgbyktuplaxdbvypix`) → **Auth** (admin girişleri, Google)
  - ubt2026 projesi (`pkbmcfpcvjmvjzqzixyc`) → **görev verisi** (`detr_todos`,
    `detr_todo_comments`, `detr_todo_attachments`, `detr-files` storage bucket)
- **Docker** (multi-stage, standalone output) + **Coolify** ile deploy

## Klasör yapısı

```
app/
  page.tsx                       # Ana sayfa (video hero)
  layout.tsx, globals.css        # Kök layout, global stiller
  not-found.tsx                  # Premium 404
  api/subscribe/route.ts         # (opsiyonel) e-posta kayıt endpoint'i
  auth/callback/route.ts         # Google OAuth / e-posta doğrulama dönüşü
  admin/
    page.tsx                     # Auth gate: yoksa login, varsa board
    _actions.ts                  # getAdminEmail (allowlist), sign-out
    _components/
      admin-login.tsx            # İki sütunlu premium login (Google + e-posta)
      login-video-panel.tsx      # Login sol taraf: abstract video/canvas
      detr-board.tsx             # Görev panosu (todos + yorumlar + dosyalar)
      updates.ts                 # Hard-coded "Güncellemeler" listesi (elle düzenle)
      updates-section.tsx        # Güncellemeler section bileşeni
      theme.ts                   # Marka renkleri (siyah·turuncu·rose)
components/
  VideoHero.tsx                  # Ana sayfa abstract video/canvas hero
lib/
  supabaseServer.ts              # SSR Supabase client (env yoksa null döner — çökmez)
  supabaseBrowser.ts             # Browser Supabase client (auth için)
  supabaseAdmin.ts               # Service-role client (waitlist yazımı)
  detr-todos.ts                  # Görev verisi katmanı (ubt2026 projesine bağlı)
  validateEmail.ts               # Saf e-posta doğrulama (+ .test.ts)
middleware.ts                    # /admin, /auth için Supabase session tazeleme
Dockerfile, docker-compose.yml   # Container build (standalone, non-root, healthcheck)
```

## Environment variables

**Gerçek değerler `.env.local` içinde (git'e GİTMEZ). Coolify'da da bunları
Secret olarak tanımla.** Şablon için `.env.example`'a bak.

| Değişken | Amaç |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Sefaris projesi URL (Auth) — browser'a gider |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable key — browser'a gider |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key — browser'a gider |
| `SUPABASE_SERVICE_ROLE_KEY` | Sunucu-only, RLS bypass — asla browser'a verme |
| `UBT_SUPABASE_URL` | ubt2026 projesi URL (görev verisi) |
| `UBT_SUPABASE_SERVICE_ROLE_KEY` | ubt2026 service-role — sunucu-only |
| `DETR_ALLOWED_EMAILS` | (opsiyonel) admin allowlist override, virgülle |
| `NEXT_PUBLIC_LAUNCH_DATE` | (opsiyonel) countdown için ISO tarih |

> `NEXT_PUBLIC_*` değişkenleri build sırasında gömülür — değiştirince
> **yeniden build/deploy** şart.

## Admin erişimi

- Giriş: `sefaris.site/admin` → e-posta+şifre **veya** "Google ile devam et".
- İzinli e-postalar allowlist'te (`app/admin/_actions.ts`, `DETR_ALLOWED_EMAILS`
  ile override edilebilir). Kullanıcılar Supabase Auth'ta tanımlı.
- Yeni admin eklemek: (1) Supabase Auth'ta kullanıcı oluştur, (2) e-postayı
  allowlist'e ekle.
- **Şifreler ve gerçek anahtarlar bu dosyaya/gite YAZILMAZ.** Ekip içi güvenli
  kanaldan paylaşılır; kullanıcılar kendi şifresini değiştirebilir.

## Görevler ve güncellemeler

- **Görevler** doğrudan `/admin` panosundan eklenir/düzenlenir (ubt2026 DB'ye
  yazılır, anında görünür — deploy gerekmez).
- **"Güncellemeler"** hard-coded: `app/admin/_components/updates.ts` içindeki
  listeyi elle düzenle (en yeni en üstte). Bu bir deploy gerektirir.

## Komutlar

```bash
npm install          # bağımlılıklar
npm run dev          # yerel geliştirme (localhost:3000)
npm run build        # production build (eslint atlanır, tsc çalışır)
npm start            # production sunucu
npm test             # birim testler (validateEmail)
docker compose up --build   # yerelde container testi
```

## Deploy (Coolify)

1. Uygulama repo'yu `github.com/ubterzioglu/sefaris` (branch `main`) izler.
2. Build Pack: **Dockerfile**. Port: **3000**. Domain: **sefaris.site** (TLS otomatik).
3. Env vars'ları (yukarıdaki tablo) Secret olarak ekle.
4. **Google OAuth için:** Supabase Dashboard → Auth → URL Configuration →
   Redirect URLs'e `https://sefaris.site/auth/callback` ekle.
5. Deploy et. Sağlık kontrolü `/` üzerinden.

## Konvansiyonlar / dikkat edilecekler

- **Küçük, odaklı dosyalar.** Bileşenleri ayrı tut; board mantığı `detr-board.tsx`'te.
- **Secret güvenliği:** `service_role` key ve şifreler asla client'a, repo'ya
  veya bu dosyaya girmez. `.env.local` / `.env.ubt` git-ignore'lu.
- **Env-safe kod:** `createSupabaseServer()` env yoksa `null` döner ve uygulama
  çökmez — çağıran her yer null kontrolü yapar. Bu davranışı koru.
- **RLS:** ubt2026'daki `detr_*` tabloları RLS açık, sadece service-role erişir.
- **İki Supabase projesini karıştırma:** Auth → `NEXT_PUBLIC_SUPABASE_*`,
  görev verisi → `UBT_SUPABASE_*`.
- **Commit sonrası** production build'in geçtiğini doğrula (`npm run build`).
```
