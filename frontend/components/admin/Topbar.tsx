"use client";

import { Bell, LogOut } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";

/** Üst çubuk (64px). */
export function Topbar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const initials = user?.fullName
    ?.split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-line bg-white/90 px-4 backdrop-blur sm:px-6">
      <div className="lg:hidden text-base font-semibold text-primary">Sefaris</div>
      <div className="flex-1" />

      <button
        type="button"
        className="relative rounded-lg p-2 text-slate-500 transition hover:bg-surface hover:text-primary"
        aria-label="Bildirimler"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
      </button>

      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-light text-sm font-semibold text-accent-hover">
          {initials || "?"}
        </div>
        <div className="hidden text-sm sm:block">
          <div className="font-medium text-primary">{user?.fullName ?? "Kullanıcı"}</div>
          <div className="text-xs text-slate-500">{user?.email}</div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => dispatch(logout())}
        className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm font-medium text-primary transition hover:bg-surface"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Çıkış</span>
      </button>
    </header>
  );
}
