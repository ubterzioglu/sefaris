# Sefaris — Deployment Rehberi

## Yerel (Docker Compose)
```bash
cp .env.example .env    # değişkenleri doldur
docker compose up -d db redis minio   # altyapı
docker compose up --build             # frontend + backend
# Frontend: http://localhost:3000  ·  Backend: http://localhost:8080/api/v1
```

## Yerel (Docker'sız)
```bash
# Backend (H2 ile — DB gerekmez)
cd backend && mvn spring-boot:run          # :8080, profil h2
# Postgres ile:
SPRING_PROFILES_ACTIVE=postgres mvn spring-boot:run

# Frontend
cd frontend && npm install && npm run dev  # :3000
```

Seed girişi: **admin@sefaris.site / Sefaris2026!** (super_admin).

## Prod (özet)
- **Frontend:** Vercel veya Docker (Coolify). `NEXT_PUBLIC_API_URL` build arg'ı prod API adresine set edilir.
- **Backend:** Docker imajı (`backend/Dockerfile`, JDK 21), `SPRING_PROFILES_ACTIVE=postgres`, env'ler (bölüm 18) secret olarak.
- **DB:** PostgreSQL 16 (AWS RDS / managed). Flyway migration'ları uygulama açılışında otomatik çalışır.
- **Depolama:** S3/MinIO (`S3_ENABLED=true`).
- **CI/CD:** `.github/workflows/deploy.yml` — backend `mvn package`, frontend `npm run build`, main'de deploy.

## Google OAuth (Faz 2)
`GOOGLE_CLIENT_ID/SECRET` verilip `application.yml`'de `spring.security.oauth2.client.registration.google` yeniden etkinleştirilir.
