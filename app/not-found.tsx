import Link from "next/link";
import { DETR_BRAND_GRADIENT, DETR_ORANGE } from "@/app/detr/_components/theme";

export const metadata = {
  title: "404 · Sefaris",
  robots: { index: false, follow: false }
};

/**
 * Premium 404. Brand-consistent (black · orange · rose) with an oversized
 * gradient "404", a short message, and a way back home / to the panel.
 */
export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-[#090706] px-6 text-center">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 45% at 20% 12%, rgba(251,146,60,0.14), transparent 60%)," +
            "radial-gradient(45% 45% at 82% 8%, rgba(251,113,133,0.14), transparent 58%)," +
            "radial-gradient(70% 70% at 50% 118%, rgba(249,115,98,0.1), transparent 60%)," +
            "linear-gradient(180deg, #0b0908 0%, #090706 55%, #060404 100%)"
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.3]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(120% 80% at 50% 0%, black, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(120% 80% at 50% 0%, black, transparent 80%)"
        }}
      />

      <div className="animate-reveal flex flex-col items-center">
        <span
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em]"
          style={{
            borderColor: "rgba(251,146,60,0.35)",
            background: "rgba(251,146,60,0.10)",
            color: DETR_ORANGE
          }}
        >
          Sayfa bulunamadı
        </span>

        <h1
          className="bg-clip-text text-[clamp(5rem,20vw,12rem)] font-black leading-none tracking-tighter text-transparent"
          style={{ backgroundImage: DETR_BRAND_GRADIENT }}
        >
          404
        </h1>

        <p className="mt-4 max-w-md text-balance text-[15px] leading-7 text-white/60">
          Aradığın sayfa taşınmış ya da hiç var olmamış olabilir. Buradan devam
          edebilirsin.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center justify-center rounded-[0.95rem] px-6 py-3 text-sm font-bold tracking-tight text-black shadow-[0_16px_50px_-12px_rgba(251,146,60,0.6)] ring-1 ring-inset ring-white/20 transition hover:shadow-[0_20px_60px_-12px_rgba(251,113,133,0.7)]"
            style={{ backgroundImage: DETR_BRAND_GRADIENT }}
          >
            Ana sayfa
          </Link>
          <Link
            href="/admin"
            className="inline-flex min-h-[48px] items-center justify-center rounded-[0.95rem] border border-white/12 bg-white/[0.05] px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/25 hover:text-white"
          >
            Yönetim paneli
          </Link>
        </div>

        <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.28em] text-white/25">
          sefaris.site
        </p>
      </div>
    </main>
  );
}
