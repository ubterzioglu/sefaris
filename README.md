# Sefaris — Coming Soon

A tech-forward "coming soon" landing page for **[sefaris.site](https://sefaris.site)**, built with Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS. Containerized for one-click deployment on **Coolify**.

## Features

- Animated aurora / gradient-mesh hero background (pure CSS, no dependencies)
- Live countdown to launch
- Email waitlist capture with a Next.js API route (persists to a JSON file on a mounted volume)
- Brand wordmark, tagline, and social footer
- Responsive, accessible, reduced-motion friendly
- SEO / OpenGraph / Twitter metadata for `sefaris.site`

## Local development

```bash
npm install
npm run dev
# http://localhost:3000
```

Run the unit tests (email validation):

```bash
npm test
```

## Production build

```bash
npm run build
npm start
```

## Docker (local)

```bash
docker compose up --build
# http://localhost:3000
```

The image uses Next.js **standalone** output on `node:22-alpine`, runs as a non-root user, exposes port **3000**, and has a built-in `HEALTHCHECK`.

## Deploying on Coolify

1. **New Resource → Application → Public/Private Repository** and point it at `github.com/ubterzioglu/sefaris`.
2. **Build Pack:** choose **Dockerfile** (not Nixpacks). Coolify will use the `Dockerfile` in the repo root.
3. **Port:** set the exposed port to **`3000`**.
4. **Domain:** set the domain to **`https://sefaris.site`**. Coolify provisions TLS via Let's Encrypt automatically. Point the `sefaris.site` DNS A/AAAA record at your Coolify server first.
5. **Persistent storage:** add a **Volume Mount** with destination **`/data`** so waitlist signups survive redeploys (`subscribers.json` is written there).
6. **Environment variables (optional):**
   - `NEXT_PUBLIC_LAUNCH_DATE` — ISO date for the countdown, e.g. `2026-08-01T09:00:00Z`. Defaults to 30 days from build if unset.
   - `SUBSCRIBERS_PATH` — defaults to `/data/subscribers.json`; leave as-is when using the volume above.
7. **Deploy.** Coolify builds the Dockerfile and runs the container. The built-in healthcheck hits `/`.

## Project structure

```
app/
  layout.tsx            # metadata, fonts
  page.tsx              # composes the page
  globals.css           # tailwind + animations
  api/subscribe/route.ts# waitlist endpoint (POST)
components/
  AuroraBackground.tsx
  Countdown.tsx
  SubscribeForm.tsx
  Footer.tsx
lib/
  validateEmail.ts      # shared pure validator
  validateEmail.test.ts # unit tests
Dockerfile              # multi-stage standalone build
docker-compose.yml      # local prod test
```

## Editing copy

- **Wordmark / tagline:** `app/page.tsx`
- **Social links:** `components/Footer.tsx`
- **Metadata / SEO:** `app/layout.tsx`
