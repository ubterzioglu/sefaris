# Sefaris — Kurumsal Web Sitesi & Yönetim Paneli

Türkiye ve Almanya (DACH) arasında yazılım geliştirme, dijital dönüşüm ve IT
danışmanlığı sunan proje ortaklığı platformu. `sefarislast.md` (v4.0.0) mimari
rehberine göre inşa edilmiştir.

- **Ön yüz:** Next.js 15 (App Router) · React 19 · TypeScript · **RTK Query** ·
  **next-intl** (TR/DE/EN) · React Hook Form + Zod · Tailwind CSS
- **Arka yüz:** Spring Boot 3.3 (Java 21) · PostgreSQL · Hibernate/JPA ·
  Spring Security (stateless JWT + RBAC) · Flyway · S3/MinIO · Mail
- **Altyapı:** Docker Compose · GitHub Actions CI/CD

## Hızlı Başlangıç

### Gereksinimler
- Node.js 20+ · Java 21+ · (opsiyonel) Docker & Docker Compose · PostgreSQL 16

### Kurulum
```bash
cp .env.example .env                     # değişkenleri doldur

# 1) Backend (H2 ile, DB gerekmez — hızlı deneme)
cd backend && mvn spring-boot:run        # http://localhost:8080/api/v1

# 2) Frontend
cd frontend && npm install && npm run dev # http://localhost:3000/tr

# veya tüm yığın:
docker compose up --build
```

Seed girişi: **admin@sefaris.site / Sefaris2026!**

## Yapı (monorepo)
```
sefaris/
  frontend/   # Next.js + RTK Query + next-intl
  backend/    # Spring Boot + PostgreSQL/JPA
  docs/       # API.md, DEPLOYMENT.md
  sefarislast.md         # mimari rehber (v4.0.0)
  docker-compose.yml     # frontend+backend+postgres+redis+minio
  .github/workflows/deploy.yml
```

## Mimari
- [Frontend](./frontend) · [Backend](./backend)
- [API Dokümantasyonu](./docs/API.md) · [Deployment Rehberi](./docs/DEPLOYMENT.md)
- Tam mimari: [`sefarislast.md`](./sefarislast.md)

## Komutlar
| Komut | Açıklama |
|-------|----------|
| `cd frontend && npm run dev` | Frontend geliştirme sunucusu |
| `cd frontend && npm run build` | Frontend production build |
| `cd backend && mvn spring-boot:run` | Backend (varsayılan H2 profili) |
| `cd backend && mvn package` | Backend jar + testler |
| `docker compose up --build` | Tüm servisleri başlat |

## Notlar
- Bu, `sefarislast.md`'deki 12 haftalık mimarinin uçtan uca **çalışan iskeletidir**;
  çekirdek akışlar (auth, görev/Kanban, CRM, dashboard, public→lead) gerçek, bazı
  modüller Faz 2/3'te derinleştirilecek sadeleştirilmiş sürümdür.
- Google OAuth Faz 2'de etkinleştirilir (bkz. `docs/DEPLOYMENT.md`).
