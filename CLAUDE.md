# Sefaris — Proje Kılavuzu (CLAUDE.md)

Projede çalışan herkes (ve AI ajanları) için tek referans. Mimari, kurulum ve
konvansiyonları özetler. Tam mimari: [`sefarislast.md`](./sefarislast.md).

## Ne bu proje?

**Sefaris** — Türkiye & Almanya arası yazılım/proje ortaklığı platformu. Monorepo:

1. **`frontend/`** — Next.js 15 (App Router) + React 19 + TypeScript.
   Public kurumsal site (`/tr`, `/de`, `/en`) + `/{locale}/admin` yönetim paneli.
2. **`backend/`** — Spring Boot 3.3 (Java 21) REST API (`/api/v1`).

> Önceki "coming soon + Supabase board" sürümü, `sefarislast.md` v4.0.0 rehberine
> göre Spring Boot + RTK Query mimarisine taşındı. Supabase artık kullanılmıyor.

## Teknoloji

- **Frontend:** Next.js 15, **RTK Query** (Axios/TanStack/Zustand YOK, useEffect
  ile derived state YOK — `selectFromResult`/`createSelector`), **next-intl**
  (TR/DE/EN), React Hook Form + Zod, Tailwind CSS, lucide-react.
- **Backend:** Spring Boot 3.3, PostgreSQL + Hibernate/JPA, Spring Security
  (stateless JWT + method `@PreAuthorize` RBAC), Flyway, JavaMail, AWS S3 SDK.

## Klasör yapısı
```
frontend/
  app/[locale]/            # (marketing)/... public sayfalar · admin/... panel
  store/                   # RTK Query: api/baseApi + feature api'ler, slices
  i18n/                    # next-intl routing/navigation/request
  messages/                # tr.json, de.json, en.json
  components/ui, components/public, components/admin
  lib/types.ts, lib/utils.ts
backend/
  src/main/java/site/sefaris/
    domain/ (+enums)       # JPA entity'ler
    repository/            # Spring Data JPA
    dto/ service/ controller/   # modüller: auth, task, project, customer, lead,
                                 # finance, document, seo, admin, dashboard, public
    security/ config/ common/
  src/main/resources/
    application*.yml       # h2 (varsayılan) · postgres profilleri
    db/migration/          # Flyway V1 şema, V2 seed
docs/ · docker-compose.yml · .github/workflows/deploy.yml
```

## Konvansiyonlar (dikkat)
- **State = %100 RTK Query.** Axios/TanStack/Zustand ekleme. Derived state
  `selectFromResult`/`createSelector`/`useMemo` ile; **useEffect ile YAPMA**.
- **Enum'lar:** JSON'da lowercase (`open`, `in_progress`), DB'de UPPERCASE
  (`@Enumerated(STRING)`). Frontend tipleri lowercase string union.
- **Backend katmanları:** entity(UUID id) → repository → service(@Transactional)
  → controller(@RequestMapping, context-path `/api/v1`). Hata → `ApiException(ErrorCode)`
  → `GlobalExceptionHandler` (bölüm 14).
- **Güvenlik:** JWT `Authorization: Bearer`. Şifreler BCrypt. secret'lar asla
  client'a/repo'ya girmez; `.env*` git-ignore'lu.
- **i18n:** rota `/{locale}/...`. Link için `@/i18n/navigation` (next/link değil).

## Komutlar
```bash
cd backend && mvn spring-boot:run        # H2 profili, :8080/api/v1
cd frontend && npm run dev               # :3000/tr
docker compose up --build                # tüm yığın
cd backend && mvn package                # backend derleme + test
cd frontend && npm run build             # frontend production build
```
Seed: **admin@sefaris.site / Sefaris2026!**

## Durum
`sefarislast.md`'deki mimarinin uçtan uca çalışan iskeleti. Çekirdek akışlar
(auth, görev/Kanban optimistic, CRM/lead, finans/hakediş, dashboard,
public→lead) gerçek; bazı endpoint/sayfalar Faz 2/3'te derinleştirilecek.
Google OAuth Faz 2.
