"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Plus, FolderKanban } from "lucide-react";
import { useGetProjectsQuery, useCreateProjectMutation } from "@/store/api/projectApi";
import type { ProjectStatus, Currency } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Button, Card, Badge, Field, Input, Textarea, Select } from "@/components/ui";
import { PageHeader, Modal, Skeleton, EmptyState } from "@/components/admin/primitives";
import { PROJECT_STATUS_STYLES, PROJECT_STATUS_LABELS_TR } from "@/components/admin/status";

const PROJECT_STATUSES: ProjectStatus[] = [
  "proposal",
  "approved",
  "in_progress",
  "testing",
  "live",
  "maintenance",
  "cancelled",
  "completed",
];

const projectSchema = z.object({
  name: z.string().min(2, "En az 2 karakter").max(200),
  status: z.enum([
    "proposal",
    "approved",
    "in_progress",
    "testing",
    "live",
    "maintenance",
    "cancelled",
    "completed",
  ]),
  budgetAmount: z.coerce.number().min(0).optional(),
  budgetCurrency: z.enum(["eur", "try", "usd"]),
  description: z.string().max(2000).optional(),
  profitShareDev: z.coerce.number().min(0).max(100),
  profitShareDesign: z.coerce.number().min(0).max(100),
  profitSharePm: z.coerce.number().min(0).max(100),
  profitShareCompany: z.coerce.number().min(0).max(100),
});
type ProjectForm = z.infer<typeof projectSchema>;

export default function ProjectsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data, isLoading } = useGetProjectsQuery();
  const projects = data?.content ?? [];

  return (
    <div>
      <PageHeader
        title="Projeler"
        description="Aktif ve tamamlanan projeler"
        action={
          <Button onClick={() => setModalOpen(true)} className="px-4 py-2.5">
            <Plus className="h-4 w-4" /> Yeni Proje
          </Button>
        }
      />

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((p) => (
            <Card key={p.id} className="flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <FolderKanban className="h-5 w-5 text-accent" />
                  <h3 className="font-semibold text-primary">{p.name}</h3>
                </div>
                <Badge className={PROJECT_STATUS_STYLES[p.status]}>
                  {PROJECT_STATUS_LABELS_TR[p.status]}
                </Badge>
              </div>
              {p.description && (
                <p className="mt-2 line-clamp-2 text-sm text-slate-500">{p.description}</p>
              )}
              <div className="mt-auto flex items-center justify-between pt-4 text-sm">
                <span className="font-semibold text-primary">
                  {formatCurrency(p.budgetAmount, p.budgetCurrency?.toUpperCase())}
                </span>
                <span className="text-xs text-slate-400">{formatDate(p.startDate)}</span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState message="Henüz proje yok." />
      )}

      <CreateProjectModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

function CreateProjectModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      status: "proposal",
      budgetCurrency: "eur",
      profitShareDev: 40,
      profitShareDesign: 20,
      profitSharePm: 15,
      profitShareCompany: 25,
    },
  });

  const onSubmit = async (data: ProjectForm) => {
    try {
      await createProject({
        name: data.name,
        status: data.status,
        budgetAmount: data.budgetAmount ?? null,
        budgetCurrency: data.budgetCurrency as Currency,
        description: data.description || null,
        profitShareDev: data.profitShareDev,
        profitShareDesign: data.profitShareDesign,
        profitSharePm: data.profitSharePm,
        profitShareCompany: data.profitShareCompany,
      }).unwrap();
      reset();
      onClose();
    } catch {
      /* hata */
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Yeni Proje">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field label="Proje Adı" error={errors.name?.message}>
          <Input {...register("name")} placeholder="Proje adı" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Durum" error={errors.status?.message}>
            <Select {...register("status")}>
              {PROJECT_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {PROJECT_STATUS_LABELS_TR[s]}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Para Birimi" error={errors.budgetCurrency?.message}>
            <Select {...register("budgetCurrency")}>
              <option value="eur">EUR</option>
              <option value="try">TRY</option>
              <option value="usd">USD</option>
            </Select>
          </Field>
        </div>
        <Field label="Bütçe" error={errors.budgetAmount?.message}>
          <Input type="number" step="0.01" {...register("budgetAmount")} placeholder="0" />
        </Field>
        <Field label="Açıklama" error={errors.description?.message}>
          <Textarea rows={2} {...register("description")} placeholder="Opsiyonel" />
        </Field>

        <div>
          <p className="mb-2 text-sm font-medium text-primary">Kâr Paylaşımı (%)</p>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Geliştirme" error={errors.profitShareDev?.message}>
              <Input type="number" {...register("profitShareDev")} />
            </Field>
            <Field label="Tasarım" error={errors.profitShareDesign?.message}>
              <Input type="number" {...register("profitShareDesign")} />
            </Field>
            <Field label="Proje Yönetimi" error={errors.profitSharePm?.message}>
              <Input type="number" {...register("profitSharePm")} />
            </Field>
            <Field label="Şirket" error={errors.profitShareCompany?.message}>
              <Input type="number" {...register("profitShareCompany")} />
            </Field>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose} className="px-4 py-2.5">
            İptal
          </Button>
          <Button type="submit" disabled={isLoading} className="px-4 py-2.5">
            {isLoading ? "Kaydediliyor..." : "Oluştur"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
