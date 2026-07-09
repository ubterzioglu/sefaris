"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Globe } from "lucide-react";

const LABELS: Record<string, string> = { tr: "TR", de: "DE", en: "EN" };

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 rounded-lg border border-line px-2 py-1">
      <Globe className="h-4 w-4 text-text-muted" />
      {routing.locales.map((l) => (
        <button
          key={l}
          onClick={() => router.replace(pathname, { locale: l })}
          className={`rounded px-1.5 text-xs font-semibold transition ${
            l === locale ? "text-accent" : "text-text-muted hover:text-primary"
          }`}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}
