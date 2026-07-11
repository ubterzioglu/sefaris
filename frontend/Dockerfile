# syntax=docker/dockerfile:1

# ---- Base ----
FROM node:22-alpine AS base
# libc6-compat helps some native deps on alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ---- Dependencies ----
FROM base AS deps
COPY package.json package-lock.json* ./
# BuildKit cache mount keeps the npm cache warm across builds, so repeat
# installs are near-instant. --no-audit/--no-fund skip slow network calls.
RUN --mount=type=cache,target=/root/.npm \
  if [ -f package-lock.json ]; then \
    npm ci --prefer-offline --no-audit --no-fund; \
  else \
    npm install --no-audit --no-fund; \
  fi

# ---- Builder ----
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Backend API adresi build sırasında gömülür (NEXT_PUBLIC_*). Varsayılan
# PROD adresi: Coolify build-arg geçmezse bile tarayıcı canlı API'ye gider
# (localhost:8080 tarayıcıda çözülemez → ERR_NAME_NOT_RESOLVED olurdu).
# Yerel geliştirmede `npm run dev` .env'den localhost'u kullanır.
ARG NEXT_PUBLIC_API_URL=https://api.sefaris.site/api/v1
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
# Cache the Next.js build cache across builds to speed up recompiles.
RUN --mount=type=cache,target=/app/.next/cache npm run build

# ---- Runner ----
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Persisted subscribers live here — mount a Coolify volume at /data.
ENV SUBSCRIBERS_PATH=/data/subscribers.json

# Run as non-root
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs \
  && mkdir -p /data \
  && chown -R nextjs:nodejs /data

# Standalone output: server.js + minimal node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

# Container-level healthcheck (Coolify also has its own). Next.js standalone
# saniyeler içinde açılır → kısa start-period + sık kontrol = hızlı "healthy".
HEALTHCHECK --interval=10s --timeout=5s --start-period=8s --retries=5 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
