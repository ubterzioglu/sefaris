"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { useSubmitContactMutation } from "@/store/api/publicApi";
import { Button, Field, Input, Textarea, Select } from "@/components/ui";
import { CheckCircle2 } from "lucide-react";

// rehber bölüm 11.3 — contactSchema
const contactSchema = z.object({
  name: z.string().min(2, "Adınızı girin").max(100),
  email: z.string().email("Geçerli e-posta girin"),
  company: z.string().max(200).optional(),
  projectType: z.enum(["web", "mobile", "consulting", "seo", "partnership", "other"]).optional(),
  budgetRange: z.enum(["under_5k", "5k_10k", "10k_25k", "25k_50k", "50k_plus", "not_sure"]).optional(),
  message: z.string().min(10, "En az 10 karakter").max(5000),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const t = useTranslations("contact");
  const [submit, { isLoading, isSuccess, isError }] = useSubmitContactMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactForm) => {
    try {
      await submit(data).unwrap();
      reset();
    } catch {
      /* isError ile gösterilir */
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold text-primary">{t("title")}</h1>

      {isSuccess ? (
        <div className="mt-8 flex items-center gap-3 rounded-card border border-success/30 bg-success/10 p-6 text-success">
          <CheckCircle2 className="h-6 w-6" />
          <span>{t("success")}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <Field label={t("name")} error={errors.name?.message}>
            <Input {...register("name")} />
          </Field>
          <Field label={t("email")} error={errors.email?.message}>
            <Input type="email" {...register("email")} />
          </Field>
          <Field label={t("company")} error={errors.company?.message}>
            <Input {...register("company")} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={t("projectType")}>
              <Select {...register("projectType")}>
                <option value="">—</option>
                <option value="web">Web</option>
                <option value="mobile">Mobil</option>
                <option value="consulting">Danışmanlık</option>
                <option value="seo">SEO</option>
                <option value="partnership">Ortaklık</option>
                <option value="other">Diğer</option>
              </Select>
            </Field>
            <Field label={t("budget")}>
              <Select {...register("budgetRange")}>
                <option value="">—</option>
                <option value="under_5k">&lt; 5.000€</option>
                <option value="5k_10k">5.000€ - 10.000€</option>
                <option value="10k_25k">10.000€ - 25.000€</option>
                <option value="25k_50k">25.000€ - 50.000€</option>
                <option value="50k_plus">50.000€+</option>
                <option value="not_sure">Emin değilim</option>
              </Select>
            </Field>
          </div>
          <Field label={t("message")} error={errors.message?.message}>
            <Textarea rows={5} {...register("message")} />
          </Field>
          {isError && <p className="text-sm text-danger">{t("error")}</p>}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "..." : t("submit")}
          </Button>
        </form>
      )}
    </div>
  );
}
