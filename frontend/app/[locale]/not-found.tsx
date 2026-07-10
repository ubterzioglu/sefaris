"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { ArrowRight, Compass, Home } from "lucide-react";

const QUICK_LINKS = [
  { href: "/", key: "home" },
  { href: "/hakkimizda", key: "about" },
  { href: "/hizmetler", key: "services" },
  { href: "/projeler", key: "projects" },
  { href: "/iletisim", key: "contact" },
] as const;

export default function NotFound() {
  const t = useTranslations("notFound");
  const nav = useTranslations("nav");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero — marketing hero stiliyle aynı (bg-primary + accent + dekor bloblar) */}
        <section className="relative overflow-hidden bg-primary text-white">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-info/10 blur-3xl" />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32">
            <span className="text-8xl font-bold leading-none text-accent sm:text-9xl">404</span>
            <h1 className="mt-6 text-3xl font-bold sm:text-4xl">{t("title")}</h1>
            <p className="mt-4 max-w-xl text-lg text-slate-300">{t("description")}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-white hover:bg-accent-hover"
              >
                <Home className="h-4 w-4" /> {t("backHome")}
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3 font-medium text-white hover:bg-white/10"
              >
                {t("contact")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Popüler sayfalar */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="flex items-center justify-center gap-2 text-text-secondary">
            <Compass className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium">{t("quickLinks")}</span>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {QUICK_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-text-secondary transition hover:border-accent hover:text-primary"
              >
                {nav(l.key)}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
