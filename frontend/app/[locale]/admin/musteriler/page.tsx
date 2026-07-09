"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react";
import {
  useGetCustomersQuery,
  useCreateCustomerMutation,
} from "@/store/api/customerApi";
import {
  useGetLeadsQuery,
  useUpdateLeadStatusMutation,
} from "@/store/api/leadApi";
import type { LeadStatus } from "@/lib/types";
import { formatCurrency, cn } from "@/lib/utils";
import { Button, Badge, Field, Input, Select } from "@/components/ui";
import { PageHeader, Modal, Skeleton, EmptyState } from "@/components/admin/primitives";
import { LEAD_STATUS_LABELS_TR, LEAD_STATUS_STYLES } from "@/components/admin/status";

const PIPELINE_COLUMNS: LeadStatus[] = [
  "new",
  "contacted",
  "meeting_scheduled",
  "proposal_sent",
  "won",
  "lost",
];
const ALL_LEAD_STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "meeting_scheduled",
  "proposal_sent",
  "won",
  "lost",
  "on_hold",
];

const customerSchema = z.object({
  companyName: z.string().min(2, "En az 2 karakter").max(200),
  contactPerson: z.string().max(120).optional(),
  email: z.string().email("Geçerli e-posta girin").optional().or(z.literal("")),
  phone: z.string().max(40).optional(),
  country: z.string().max(80).optional(),
  city: z.string().max(80).optional(),
});
type CustomerForm = z.infer<typeof customerSchema>;

export default function CustomersPage() {
  const [tab, setTab] = useState<"musteriler" | "pipeline">("musteriler");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <PageHeader
        title="Müşteriler"
        description="CRM — müşteriler ve lead pipeline"
        action={
          tab === "musteriler" ? (
            <Button onClick={() => setModalOpen(true)} className="px-4 py-2.5">
              <Plus className="h-4 w-4" /> Yeni Müşteri
            </Button>
          ) : undefined
        }
      />

      <div className="mb-5 flex gap-1 border-b border-line">
        <TabButton active={tab === "musteriler"} onClick={() => setTab("musteriler")}>
          Müşteriler
        </TabButton>
        <TabButton active={tab === "pipeline"} onClick={() => setTab("pipeline")}>
          Lead Pipeline
        </TabButton>
      </div>

      {tab === "musteriler" ? <CustomersTab /> : <PipelineTab />}

      <CreateCustomerModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition",
        active
          ? "border-accent text-accent-hover"
          : "border-transparent text-slate-500 hover:text-primary"
      )}
    >
      {children}
    </button>
  );
}

function CustomersTab() {
  const { data: customers, isLoading } = useGetCustomersQuery();

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full" />
        ))}
      </div>
    );
  }
  if (!customers || customers.length === 0) {
    return <EmptyState message="Henüz müşteri yok." />;
  }

  return (
    <div className="overflow-x-auto rounded-card border border-line bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-slate-500">
            <th className="px-4 py-3 font-medium">Firma</th>
            <th className="px-4 py-3 font-medium">İlgili Kişi</th>
            <th className="px-4 py-3 font-medium">E-posta</th>
            <th className="px-4 py-3 font-medium">Ülke</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {customers.map((c) => (
            <tr key={c.id} className="hover:bg-surface/60">
              <td className="px-4 py-3 font-medium text-primary">{c.companyName}</td>
              <td className="px-4 py-3 text-slate-600">{c.contactPerson ?? "—"}</td>
              <td className="px-4 py-3 text-slate-600">{c.email ?? "—"}</td>
              <td className="px-4 py-3 text-slate-600">
                {[c.city, c.country].filter(Boolean).join(", ") || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PipelineTab() {
  const { data: leads, isLoading } = useGetLeadsQuery();
  const [updateLeadStatus] = useUpdateLeadStatusMutation();

  const onStatusChange = async (id: string, status: string) => {
    try {
      await updateLeadStatus({ id, status }).unwrap();
    } catch {
      /* hata */
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-6">
      {PIPELINE_COLUMNS.map((col) => {
        const colLeads = (leads ?? []).filter((l) => l.status === col);
        return (
          <div key={col} className="rounded-card border border-line bg-surface/60 p-3">
            <div className="mb-3 flex items-center justify-between">
              <Badge className={LEAD_STATUS_STYLES[col]}>{LEAD_STATUS_LABELS_TR[col]}</Badge>
              <span className="text-xs text-slate-400">{colLeads.length}</span>
            </div>
            <div className="space-y-2">
              {colLeads.map((l) => (
                <div key={l.id} className="rounded-lg border border-line bg-white p-3 shadow-sm">
                  <p className="text-sm font-medium text-primary">{l.contactName ?? "İsimsiz"}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {formatCurrency(l.expectedValue, l.currency?.toUpperCase())}
                  </p>
                  <select
                    value={l.status}
                    onChange={(e) => onStatusChange(l.id, e.target.value)}
                    className="mt-2 w-full rounded-lg border border-line bg-white px-2 py-1.5 text-xs text-primary outline-none focus:border-accent"
                  >
                    {ALL_LEAD_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {LEAD_STATUS_LABELS_TR[s]}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              {colLeads.length === 0 && (
                <p className="rounded-lg border border-dashed border-line py-6 text-center text-xs text-slate-400">
                  Boş
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CreateCustomerModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [createCustomer, { isLoading }] = useCreateCustomerMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerForm>({ resolver: zodResolver(customerSchema) });

  const onSubmit = async (data: CustomerForm) => {
    try {
      await createCustomer({
        companyName: data.companyName,
        contactPerson: data.contactPerson || null,
        email: data.email || null,
        phone: data.phone || null,
        country: data.country || null,
        city: data.city || null,
      }).unwrap();
      reset();
      onClose();
    } catch {
      /* hata */
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Yeni Müşteri">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field label="Firma Adı" error={errors.companyName?.message}>
          <Input {...register("companyName")} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="İlgili Kişi" error={errors.contactPerson?.message}>
            <Input {...register("contactPerson")} />
          </Field>
          <Field label="E-posta" error={errors.email?.message}>
            <Input type="email" {...register("email")} />
          </Field>
          <Field label="Telefon" error={errors.phone?.message}>
            <Input {...register("phone")} />
          </Field>
          <Field label="Şehir" error={errors.city?.message}>
            <Input {...register("city")} />
          </Field>
        </div>
        <Field label="Ülke" error={errors.country?.message}>
          <Input {...register("country")} />
        </Field>
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
