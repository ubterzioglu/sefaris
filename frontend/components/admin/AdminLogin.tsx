"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { Button, Field, Input } from "@/components/ui";

// Admin girişi DB'den bağımsız: şifre build sırasında gömülen bu değerle
// (NEXT_PUBLIC_ADMIN_PASSWORD) tarayıcıda karşılaştırılır. Backend/DB gerekmez.
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "";

const loginSchema = z.object({
  password: z.string().min(1, "Şifre gerekli"),
});

type LoginForm = z.infer<typeof loginSchema>;

export function AdminLogin() {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginForm) => {
    if (!ADMIN_PASSWORD || data.password !== ADMIN_PASSWORD) {
      setIsError(true);
      return;
    }
    setIsError(false);
    // Yerel admin oturumu — token backend'e gitmez, sadece paneli açar.
    dispatch(
      setCredentials({
        token: "local-admin",
        refreshToken: "local-admin",
        expiresAt: new Date(Date.now() + 86_400_000).toISOString(),
        user: {
          id: "00000000-0000-0000-0000-000000000000",
          email: "admin@sefaris.site",
          fullName: "Sefaris Admin",
          role: "super_admin",
          status: "active",
          avatarUrl: null,
          hourlyRate: null,
          expertiseTags: [],
          preferredLanguage: "tr",
        },
      })
    );
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Sol taraf — marka paneli */}
      <div className="relative hidden overflow-hidden bg-primary p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-info/20 blur-3xl" />
        <div className="relative flex items-center gap-2 text-lg font-semibold">
          <ShieldCheck className="h-6 w-6 text-accent" />
          Sefaris Yönetim
        </div>
        <div className="relative">
          <h2 className="text-3xl font-semibold leading-tight">
            Projelerinizi tek panelden yönetin.
          </h2>
          <p className="mt-4 max-w-md text-sm text-slate-300">
            Görevler, müşteriler, finans ve SEO — Sefaris ekip panosuyla tüm operasyonunuz
            tek bir yerde.
          </p>
        </div>
        <p className="relative text-xs text-slate-400">
          © {new Date().getFullYear()} Sefaris. Tüm hakları saklıdır.
        </p>
      </div>

      {/* Sağ taraf — form */}
      <div className="flex items-center justify-center bg-surface p-6">
        <div className="w-full max-w-sm rounded-card border border-line bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-2 lg:hidden">
            <ShieldCheck className="h-6 w-6 text-accent" />
            <span className="text-lg font-semibold text-primary">Sefaris Yönetim</span>
          </div>
          <h1 className="text-xl font-semibold text-primary">Panele giriş</h1>
          <p className="mt-1 text-sm text-slate-500">Devam etmek için yönetici şifresini girin.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <Field label="Yönetici şifresi" error={errors.password?.message}>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  autoFocus
                  className="pr-11"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 transition hover:text-primary"
                  aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </Field>
            {isError && (
              <p className="text-sm text-danger">Şifre hatalı.</p>
            )}
            <Button type="submit" className="w-full">
              Giriş yap
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
