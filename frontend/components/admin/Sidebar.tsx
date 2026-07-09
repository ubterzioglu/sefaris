"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./nav";

function isActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Masaüstü sabit kenar çubuğu (260px). */
export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-line bg-white lg:flex">
      <div className="flex h-16 items-center gap-2 border-b border-line px-6">
        <ShieldCheck className="h-6 w-6 text-accent" />
        <span className="text-base font-semibold text-primary">Sefaris Yönetim</span>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "bg-accent-light text-accent-hover"
                  : "text-slate-600 hover:bg-surface hover:text-primary"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

/** Mobil alt navigasyon (5 ana bağlantı). */
export function MobileBottomNav() {
  const pathname = usePathname();
  const items = NAV_ITEMS.filter((i) => i.primary);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-line bg-white lg:hidden">
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium transition",
              active ? "text-accent-hover" : "text-slate-500 hover:text-primary"
            )}
          >
            <Icon className="h-5 w-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
