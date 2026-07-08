"use client";

import { useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabaseBrowser";
import { LoginVideoPanel } from "@/app/admin/_components/login-video-panel";
import {
  DETR_AMBIENT_BACKGROUND,
  DETR_BRAND_GRADIENT,
  DETR_GRID_TEXTURE,
  DETR_ORANGE
} from "@/app/detr/_components/theme";

type Mode = "signin" | "signup";

/**
 * Premium admin login. Supabase Auth via the browser client:
 * email/password (sign in or sign up) plus Google OAuth. On success the
 * session cookie is set and the page reloads into the DETR board.
 */
export function AdminLogin() {
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function handleGoogle() {
    setError("");
    setBusy(true);
    try {
      const supabase = getSupabaseBrowser();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback?next=/admin` }
      });
      if (error) {
        setError(error.message);
        setBusy(false);
      }
      // On success the browser redirects to Google; no further work here.
    } catch (e) {
      setError(e instanceof Error ? e.message : "Google ile giriş başarısız.");
      setBusy(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError("");
    setNotice("");
    setBusy(true);
    try {
      const supabase = getSupabaseBrowser();
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/admin` }
        });
        if (error) {
          setError(error.message);
        } else {
          setNotice(
            "Kayıt alındı. E-postanı doğrulaman gerekebilir, sonra giriş yap."
          );
          setMode("signin");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password
        });
        if (error) {
          setError("E-posta veya şifre hatalı.");
        } else {
          // Session cookie is set — reload so the server renders the board.
          window.location.assign("/admin");
          return;
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Bir hata oluştu.");
    }
    setBusy(false);
  }

  const inputClass =
    "w-full rounded-[1.05rem] border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] outline-none transition focus:border-[#FB923C]/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-[#FB923C]/15";

  return (
    <main
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-6"
      style={{ background: DETR_AMBIENT_BACKGROUND }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.4]"
        style={DETR_GRID_TEXTURE}
      />
      <div
        aria-hidden
        className="animate-float pointer-events-none absolute -left-24 top-16 -z-10 h-72 w-72 rounded-full blur-[130px]"
        style={{ background: "rgba(251,146,60,0.26)" }}
      />
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute -right-24 bottom-8 -z-10 h-80 w-80 rounded-full blur-[140px]"
        style={{ background: "rgba(251,113,133,0.26)" }}
      />

      <div
        className="animate-reveal w-full max-w-md rounded-[2rem] p-[1.5px] shadow-[0_50px_140px_-30px_rgba(0,0,0,0.9)]"
        style={{ backgroundImage: DETR_BRAND_GRADIENT }}
      >
        <div className="overflow-hidden rounded-[1.92rem] bg-[#090706]/90 px-7 py-9 backdrop-blur-2xl sm:px-10 sm:py-11">
          {/* Brand */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="relative flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-white/20"
                style={{ backgroundImage: DETR_BRAND_GRADIENT }}
              >
                <span className="text-base font-extrabold tracking-tight text-black">
                  S
                </span>
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold tracking-tight text-white">
                  Sefaris admin
                </p>
                <p className="text-[11px] font-medium text-white/45">
                  Yönetim paneli
                </p>
              </div>
            </div>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
              style={{
                borderColor: "rgba(251,146,60,0.35)",
                background: "rgba(251,146,60,0.10)",
                color: DETR_ORANGE
              }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full"
                  style={{ background: "rgba(251,146,60,0.7)" }}
                />
                <span
                  className="relative inline-flex h-1.5 w-1.5 rounded-full"
                  style={{ background: DETR_ORANGE }}
                />
              </span>
              Secure
            </span>
          </div>

          <p
            className="text-[11px] font-semibold uppercase tracking-[0.34em]"
            style={{ color: "#fda4af" }}
          >
            {mode === "signin" ? "Giriş yap" : "Kayıt ol"}
          </p>
          <h1 className="mt-3 text-[clamp(1.55rem,4vw,2rem)] font-bold leading-[1.08] tracking-[-0.035em] text-white">
            Sefaris yönetim
          </h1>
          <p className="mt-3 text-[13px] leading-6 text-white/55">
            Ekibe özel yönetim paneli. Google ile ya da e-posta ve şifrenle
            devam et.
          </p>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={busy}
            className="mt-7 inline-flex min-h-[50px] w-full items-center justify-center gap-3 rounded-[1.05rem] border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.1] disabled:opacity-60"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
              <path
                fill="#EA4335"
                d="M12 10.2v3.9h5.5c-.24 1.42-1.7 4.16-5.5 4.16-3.31 0-6.01-2.74-6.01-6.12S8.69 5.9 12 5.9c1.88 0 3.15.8 3.87 1.49l2.64-2.55C16.9 3.24 14.66 2.3 12 2.3 6.98 2.3 2.9 6.38 2.9 11.4S6.98 20.5 12 20.5c5.5 0 9.13-3.86 9.13-9.3 0-.63-.07-1.1-.16-1.58H12z"
              />
            </svg>
            Google ile devam et
          </button>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
              veya
            </span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          {/* Email + password */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
                E-posta
              </span>
              <div className="group relative">
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30 transition group-focus-within:text-[#FB923C]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="admin@sefaris.site"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
                Şifre
              </span>
              <div className="group relative">
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30 transition group-focus-within:text-[#FB923C]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type="password"
                  required
                  minLength={6}
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                />
              </div>
            </label>

            {error ? (
              <p className="rounded-[0.9rem] border border-rose-400/25 bg-rose-400/10 px-4 py-2.5 text-[12px] font-medium text-rose-200">
                {error}
              </p>
            ) : null}
            {notice ? (
              <p className="rounded-[0.9rem] border border-emerald-400/25 bg-emerald-400/10 px-4 py-2.5 text-[12px] font-medium text-emerald-200">
                {notice}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={busy}
              className="group relative inline-flex min-h-[52px] w-full items-center justify-center gap-2 overflow-hidden rounded-[1.05rem] px-6 py-3.5 text-sm font-bold tracking-tight text-black shadow-[0_16px_50px_-12px_rgba(251,146,60,0.6)] ring-1 ring-inset ring-white/20 transition duration-300 hover:shadow-[0_20px_60px_-12px_rgba(251,113,133,0.7)] disabled:opacity-70"
              style={{ backgroundImage: DETR_BRAND_GRADIENT }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              {busy
                ? "Lütfen bekle…"
                : mode === "signin"
                  ? "Giriş yap"
                  : "Kayıt ol"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError("");
              setNotice("");
            }}
            className="mt-5 w-full text-center text-[12px] font-medium text-white/45 transition hover:text-white/70"
          >
            {mode === "signin"
              ? "Hesabın yok mu? Kayıt ol"
              : "Zaten hesabın var mı? Giriş yap"}
          </button>

          <p className="mt-6 text-center text-[11px] font-medium uppercase tracking-[0.28em] text-white/25">
            sefaris.site · internal
          </p>
        </div>
      </div>
    </main>
  );
}
