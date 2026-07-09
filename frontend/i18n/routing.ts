import { defineRouting } from "next-intl/routing";

/** Route bazlı çok dilli yönetim (rehber bölüm 2: /tr, /de, /en). */
export const routing = defineRouting({
  locales: ["tr", "de", "en"],
  defaultLocale: "tr",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
