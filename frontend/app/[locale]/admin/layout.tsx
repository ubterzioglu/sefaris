"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { Sidebar, MobileBottomNav } from "@/components/admin/Sidebar";
import { Topbar } from "@/components/admin/Topbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = useAppSelector((state) => state.auth.token);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // İlk client render'ı server ile birebir aynı olmalı (mounted=false -> her zaman AdminLogin).
  // Gerçek auth durumu ancak mount sonrası (hydration bittikten sonra) değerlendirilir.
  if (!mounted || !token) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <div className="lg:pl-64">
        <Topbar />
        <main className="mx-auto max-w-7xl p-4 pb-24 sm:p-6 lg:pb-6">{children}</main>
      </div>
      <MobileBottomNav />
    </div>
  );
}