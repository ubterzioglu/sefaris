"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/", key: "home" },
  { href: "/hakkimizda", key: "about" },
  { href: "/hizmetler", key: "services" },
  { href: "/projeler", key: "projects" },
  { href: "/blog", key: "blog" },
  { href: "/iletisim", key: "contact" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="gradient-text">Sefaris</span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-text-secondary hover:text-primary">
              {t(l.key)}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher />
          <Link
            href="/iletisim"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover"
          >
            {t("startProject")}
          </Link>
          <Link href="/admin" className="text-sm font-medium text-text-secondary hover:text-primary">
            {t("admin")}
          </Link>
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-text-secondary"
              >
                {t(l.key)}
              </Link>
            ))}
            <div className="pt-2">
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
