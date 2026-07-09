# Sefaris — Yapılanlar (Sürüm 4.0.0 Geçişi)

**Tarih:** 9 Temmuz 2026
**Kapsam:** `sefarislast.md` v4.0.0 mimari rehberinin birebir hayata geçirilmesi
**Sonuç:** Monorepo (Spring Boot backend + Next.js/RTK Query frontend) — uçtan uca çalışan iskelet, `origin/main`'e push'landı.

---

## 1. Özet

Depo, küçük bir **Next.js 15 + Supabase "coming soon"** uygulamasıydı. Bu çalışmayla `sefarislast.md`
rehberindeki hedef mimariye taşındı:

| Katman | Önce | Sonra |
|--------|------|-------|
| Yapı | Tek Next.js uygulaması (kök) | **Monorepo**: `frontend/` + `backend/` |
| Backend | Yok (Next API route + Supabase) | **Spring Boot 3.3 / Java 21** + PostgreSQL/JPA |
| State | Server actions | **RTK Query** (Axios/Zustand/TanStack YOK) |
| Çok dil | Elle (TR/EN) | **next-intl** — `/tr`, `/de`, `/en` |
| Auth | Supabase Auth | **Stateless JWT + RBAC** (Spring Security) |
| Public site | 1 sayfa | Tam kurumsal site (10+ sayfa) |
| Admin | 1 görev panosu | **10 modül** yönetim paneli |

---

## 2. Milestone dökümü

### M0 — Monorepo'ya geçiş
- Repo root'a indirildi (`git init` + remote + `main` fetch/checkout); yeni `sefarislast.md` korundu.
- Mevcut Next.js uygulaması `frontend/`'e taşındı (`git mv`).
- `.gitignore` monorepo (Node + Java) için güncellendi.

### M1 — Backend (Spring Boot) — *derlendi + çalıştı + uçtan uca doğrulandı*
- **Şema:** Flyway `V1` (16 tablo) + `V2` referans seed. Taşınabilir SQL (PostgreSQL **ve** H2).
- **Domain:** 16 JPA entity + 17 enum. `@Enumerated(STRING)` (DB'de UPPERCASE), JSON'da lowercase (global Jackson config).
- **Modüller (~60 endpoint):** auth, tasks (Kanban durum + yorum + dosya), projects (+üye+hakediş özeti),
  customers, leads (pipeline + history), finances (+ otomatik hakediş hesaplayıcı), documents, seo,
  admin (kullanıcı/rol/ayar/şablon/duyuru), dashboard, public (iletişim → lead).
- **Güvenlik:** JWT filtresi, BCrypt, method-bazlı `@PreAuthorize` RBAC (7 rol), 401 entry point.
- **Servisler:** e-posta (şablonlu, `EMAIL_ENABLED` bayrağı), dosya (S3/MinIO-hazır, 10 MB limit, tür kontrolü), aktivite log.
- **Seed:** `DataInitializer` → super_admin + örnek müşteri/proje/görev/duyuru.
- **Profiller:** `h2` (varsayılan, DB'siz) · `postgres` (compose/prod).

### M2 — Frontend (Next.js 15) — *`npm run build` geçti, 117 statik sayfa*
- **next-intl:** `/{locale}` routing, middleware, `messages/{tr,de,en}.json`, `[locale]/layout.tsx`.
- **RTK Query store:** `baseApi` (JWT `prepareHeaders`) + 11 feature API (`injectEndpoints`),
  `authSlice` + `uiSlice`. **Optimistic update** (sürükle-bırak Kanban). Derived state `useMemo`/`selectFromResult` — **useEffect ile değil**.
- **Tasarım sistemi:** rehber bölüm 12 renk paleti/tipografi → Tailwind + CSS değişkenleri; UI kit (Button/Card/Badge/Input/Field...).
- **Public sayfalar:** ana sayfa (hero, trust sayaçları, hizmet grid, neden biz, öne çıkan projeler),
  hakkımızda, hizmetler + 6 alt sayfa, projeler + `[slug]`, kariyer, blog + `[slug]`,
  iletişim (RHF + Zod → `/public/contact`), yasal sayfalar, SSS. Navbar/Footer + dil seçici.
- **Admin panel:** JWT-gated layout (Sidebar 260px + Topbar 64px + mobil bottom-nav), login,
  dashboard, görevler (liste + Kanban), projeler, müşteriler (CRM + lead pipeline),
  finans (+ hakediş hesaplayıcı), seo, dokümanlar, ekip, ayarlar, **kalanlar**.
- **Supabase kaldırıldı** (auth/board/subscribe) — Spring Boot API'ye devredildi.

### M3 — Altyapı & Dokümanlar
- Kök `docker-compose.yml` (frontend + backend + postgres:16 + redis:7 + minio).
- `backend/Dockerfile` (JDK 21 çok aşamalı), frontend Dockerfile'a `NEXT_PUBLIC_API_URL` build-arg.
- `.github/workflows/deploy.yml` (backend `mvn package`, frontend `npm run build`, main'de deploy).
- Kök `.env.example` (rehber bölüm 18), `docs/API.md`, `docs/DEPLOYMENT.md`, README + CLAUDE.md yenilendi.

### M4 — Doğrulama & Push
- Backend: `mvn compile` (103 dosya) → **BUILD SUCCESS**; `spring-boot:run` (H2) → **Started**.
- Frontend: `npm run build` → **✓ 117 statik sayfa** (TR/DE/EN).
- 6 commit `origin/main`'e push'landı.

### Ek — "Kalanlar" bölümü (admin)
- `/admin/kalanlar` sayfası: Backend / Frontend / DevOps / Test kategorilerinde
  `Yapıldı` / `Kısmi` / `Kaldı` durumlu dürüst durum panosu + tamamlanma yüzdesi. Sidebar'a eklendi.

---

## 3. Uçtan uca doğrulanan akışlar (gerçek çalışma zamanı)

| Akış | Sonuç |
|------|-------|
| `POST /auth/login` (seed admin) | ✅ JWT token + kullanıcı (role `super_admin`) |
| `GET /dashboard/stats` (auth) | ✅ Seed verisiyle gerçek sayılar |
| `GET /tasks` (auth) | ✅ Enum'lar lowercase (`in_progress`, `high`) |
| Token'sız korumalı endpoint | ✅ 401 |
| `POST /public/contact` (auth'suz) | ✅ `{success:true}` → **otomatik lead** oluştu (Senaryo A) |
| Frontend `/tr` (SSR) | ✅ 200, hero + marka render |
| `/` → dil yönlendirme | ✅ 307 → `/tr` |
| CORS (origin `:3000`) | ✅ 200 + doğru `Access-Control-*` başlıkları |

Yerel giriş: **admin@sefaris.site / Sefaris2026!**

---

## 4. Nasıl çalıştırılır

```bash
cp .env.example .env
# Backend (H2, DB gerekmez):
cd backend && mvn spring-boot:run            # http://localhost:8080/api/v1  (Swagger: /swagger-ui.html)
# Frontend:
cd frontend && npm install && npm run dev    # http://localhost:3000/tr
# veya tüm yığın:
docker compose up --build
```

---

## 5. Bilinçli kapsam sınırı (Faz 2/3'e kalanlar)

Bu, 12 haftalık mimarinin **çalışan iskeletidir**; çekirdek akışlar gerçek ve doğrulandı.
Sadeleştirilmiş/ertelenmiş kalemler `/admin/kalanlar` sayfasında canlı listelenir. Öne çıkanlar:

- **Google OAuth2** — boş `client-id` doğrulamayı patlattığı için `application.yml`'de devre dışı; kimlik bilgisi verilince aktifleşir.
- **S3/MinIO gerçek upload** — şu an metadata + URL üretimi; `S3_ENABLED=true` ile prod'da bağlanır.
- **E-posta gönderimi** — şablon + akış hazır, `EMAIL_ENABLED=false`.
- **Bildirim sistemi** (panel zil + SSE/WebSocket), **gecikme cron'u**, **refresh token rotasyonu** — kaldı.
- **Ayarlar** kalıcı kayıt, **görev detay thread**, **blog/portfolyo CMS**, **çerez banner** — kaldı.
- **Testler** (backend JUnit/MockMvc, frontend Jest/Playwright), **Lighthouse**, **OWASP ZAP** — kaldı.

---

## 6. Commit geçmişi (bu çalışma)

| Commit | Açıklama |
|--------|----------|
| `bff682d` | monorepo'ya yeniden yapılandırma (frontend/ + backend/) |
| `736542a` | backend: şema, entity, ~60 endpoint, JWT+RBAC |
| `d434b5f` | altyapı: docker-compose, CI/CD, docs, README/CLAUDE |
| `a2bbde6` | frontend: RTK Query + next-intl, public site + admin panel |
| `94db937` | admin: "Kalanlar" durum panosu |
| `cc6bac5` | log temizliği |
