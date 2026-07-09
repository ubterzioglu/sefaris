"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ShieldCheck } from "lucide-react";
import { useLoginMutation } from "@/store/api/authApi";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { Button, Field, Input } from "@/components/ui";

const loginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta girin"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalı"),
});

type LoginForm = z.infer<typeof loginSchema>;

export function AdminLogin() {
  const dispatch = useAppDispatch();
  const [login, { isLoading, isError }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result));
    } catch {
      /* isError ile gösterilir */
    }
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
          <p className="mt-1 text-sm text-slate-500">Devam etmek için giriş yapın.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <Field label="E-posta" error={errors.email?.message}>
              <Input type="email" autoComplete="email" {...register("email")} />
            </Field>
            <Field label="Şifre" error={errors.password?.message}>
              <Input type="password" autoComplete="current-password" {...register("password")} />
            </Field>
            {isError && (
              <p className="text-sm text-danger">Giriş başarısız. Bilgilerinizi kontrol edin.</p>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Giriş yapılıyor..." : "Giriş yap"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
