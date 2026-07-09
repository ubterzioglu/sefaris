"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, TrendingUp, TrendingDown, Scale, Trash2, Calculator } from "lucide-react";
import {
  useGetFinancesQuery,
  useGetFinanceSummaryQuery,
  useGetProfitShareQuery,
  useCreateFinanceMutation,
  useDeleteFinanceMutation,
} from "@/store/api/financeApi";
import type { Currency } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Button, Card, Badge, Field, Input, Select } from "@/components/ui";
import { PageHeader, Modal, StatCard, Skeleton, EmptyState } from "@/components/admin/primitives";
import { ROLE_LABELS_TR } from "@/components/admin/status";

const financeSchema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z.coerce.number().positive("Tutar 0'dan büyük olmalı"),
  currency: z.enum(["eur", "try", "usd"]),
  category: z.string().max(120).optional(),
  date: z.string().min(1, "Tarih gerekli"),
  description: z.string().max(1000).optional(),
});
type FinanceForm = z.infer<typeof financeSchema>;

export default function FinancePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: summary, isLoading: sumLoading } = useGetFinanceSummaryQuery();
  const { data: finances, isLoading: finLoading } = useGetFinancesQuery();
  const [deleteFinance] = useDeleteFinanceMutation();

  const onDelete = async (id: string) => {
    try {
      await deleteFinance(id).unwrap();
    } catch {
      /* hata */
    }
  };

  return (
    <div>
      <PageHeader
        title="Finans"
        description="Gelir, gider ve hakediş"
        action={
          <Button onClick={() => setModalOpen(true)} className="px-4 py-2.5">
            <Plus className="h-4 w-4" /> Yeni Kayıt
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Toplam Gelir"
          value={formatCurrency(summary?.totalIncome)}
          icon={<TrendingUp className="h-5 w-5" />}
          loading={sumLoading}
        />
        <StatCard
          label="Toplam Gider"
          value={formatCurrency(summary?.totalExpense)}
          icon={<TrendingDown className="h-5 w-5" />}
          loading={sumLoading}
        />
        <StatCard
          label="Net Kâr"
          value={formatCurrency(summary?.netProfit)}
          icon={<Scale className="h-5 w-5" />}
          loading={sumLoading}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="mb-4 text-base font-semibold text-primary">Gelir - Gider</h2>
          {finLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : finances && finances.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-slate-500">
                    <th className="px-2 py-2 font-medium">Tarih</th>
                    <th className="px-2 py-2 font-medium">Tür</th>
                    <th className="px-2 py-2 font-medium">Kategori</th>
                    <th className="px-2 py-2 text-right font-medium">Tutar</th>
                    <th className="px-2 py-2" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {finances.map((f) => (
                    <tr key={f.id} className="hover:bg-surface/60">
                      <td className="px-2 py-2.5 text-slate-500">{formatDate(f.date)}</td>
                      <td className="px-2 py-2.5">
                        <Badge
                          className={
                            f.type === "income"
                              ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                              : "bg-red-100 text-red-700 border border-red-200"
                          }
                        >
                          {f.type === "income" ? "Gelir" : "Gider"}
                        </Badge>
                      </td>
                      <td className="px-2 py-2.5 text-slate-600">{f.category ?? "—"}</td>
                      <td className="px-2 py-2.5 text-right font-medium text-primary">
                        {formatCurrency(f.amount, f.currency?.toUpperCase())}
                      </td>
                      <td className="px-2 py-2.5 text-right">
                        <button
                          type="button"
                          onClick={() => onDelete(f.id)}
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-danger"
                          aria-label="Sil"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState message="Kayıt bulunamadı." />
          )}
        </Card>

        <ProfitShareCalculator />
      </div>

      <CreateFinanceModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

function ProfitShareCalculator() {
  const [projectId, setProjectId] = useState("");
  const [query, setQuery] = useState("");
  const { data, isLoading, isError, isFetching } = useGetProfitShareQuery(query, {
    skip: !query,
  });

  return (
    <Card>
      <div className="mb-4 flex items-center gap-2">
        <Calculator className="h-5 w-5 text-accent" />
        <h2 className="text-base font-semibold text-primary">Hakediş Hesaplayıcı</h2>
      </div>
      <Field label="Proje ID">
        <Input
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          placeholder="Proje UUID"
        />
      </Field>
      <Button
        type="button"
        className="mt-3 w-full px-4 py-2.5"
        onClick={() => setQuery(projectId.trim())}
        disabled={!projectId.trim()}
      >
        Hesapla
      </Button>

      {query && (
        <div className="mt-4">
          {isLoading || isFetching ? (
            <Skeleton className="h-24 w-full" />
          ) : isError || !data ? (
            <p className="text-sm text-danger">Hakediş bulunamadı.</p>
          ) : (
            <>
              <p className="mb-2 text-sm text-slate-500">
                Toplam Kâr:{" "}
                <span className="font-semibold text-primary">
                  {formatCurrency(data.totalProfit)}
                </span>
              </p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-xs uppercase text-slate-500">
                    <th className="py-2 font-medium">Rol</th>
                    <th className="py-2 text-right font-medium">%</th>
                    <th className="py-2 text-right font-medium">Tutar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {data.shares.map((s, i) => (
                    <tr key={i}>
                      <td className="py-2 text-slate-600">{ROLE_LABELS_TR[s.role] ?? s.role}</td>
                      <td className="py-2 text-right text-slate-600">{s.percentage}</td>
                      <td className="py-2 text-right font-medium text-primary">
                        {formatCurrency(s.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </Card>
  );
}

function CreateFinanceModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [createFinance, { isLoading }] = useCreateFinanceMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FinanceForm>({
    resolver: zodResolver(financeSchema),
    defaultValues: { type: "income", currency: "eur" },
  });

  const onSubmit = async (data: FinanceForm) => {
    try {
      await createFinance({
        type: data.type,
        amount: data.amount,
        currency: data.currency as Currency,
        category: data.category || null,
        date: data.date,
        description: data.description || null,
      }).unwrap();
      reset({ type: "income", currency: "eur" });
      onClose();
    } catch {
      /* hata */
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Yeni Finansal Kayıt">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Tür" error={errors.type?.message}>
            <Select {...register("type")}>
              <option value="income">Gelir</option>
              <option value="expense">Gider</option>
            </Select>
          </Field>
          <Field label="Para Birimi" error={errors.currency?.message}>
            <Select {...register("currency")}>
              <option value="eur">EUR</option>
              <option value="try">TRY</option>
              <option value="usd">USD</option>
            </Select>
          </Field>
          <Field label="Tutar" error={errors.amount?.message}>
            <Input type="number" step="0.01" {...register("amount")} />
          </Field>
          <Field label="Tarih" error={errors.date?.message}>
            <Input type="date" {...register("date")} />
          </Field>
        </div>
        <Field label="Kategori" error={errors.category?.message}>
          <Input {...register("category")} placeholder="Opsiyonel" />
        </Field>
        <Field label="Açıklama" error={errors.description?.message}>
          <Input {...register("description")} placeholder="Opsiyonel" />
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
