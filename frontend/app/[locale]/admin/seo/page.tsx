"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Search, ArrowUp, ArrowDown, Minus } from "lucide-react";
import {
  useGetCampaignsQuery,
  useCreateCampaignMutation,
  useGetKeywordsQuery,
  useCreateKeywordMutation,
  useUpdateRankMutation,
} from "@/store/api/seoApi";
import { cn } from "@/lib/utils";
import { Button, Card, Field, Input } from "@/components/ui";
import { PageHeader, Modal, Skeleton, EmptyState } from "@/components/admin/primitives";

const campaignSchema = z.object({
  name: z.string().min(2, "En az 2 karakter").max(200),
  targetCountry: z.string().max(80).optional(),
  monthlyBudget: z.coerce.number().min(0).optional(),
});
type CampaignForm = z.infer<typeof campaignSchema>;

const keywordSchema = z.object({
  keyword: z.string().min(1, "Anahtar kelime gerekli").max(200),
  targetUrl: z.string().max(500).optional(),
});
type KeywordForm = z.infer<typeof keywordSchema>;

export default function SeoPage() {
  const [campaignModal, setCampaignModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data: campaigns, isLoading } = useGetCampaignsQuery();

  return (
    <div>
      <PageHeader
        title="SEO"
        description="Kampanyalar ve anahtar kelime sıralamaları"
        action={
          <Button onClick={() => setCampaignModal(true)} className="px-4 py-2.5">
            <Plus className="h-4 w-4" /> Yeni Kampanya
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Kampanya listesi */}
        <div className="space-y-2 lg:col-span-1">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)
          ) : campaigns && campaigns.length > 0 ? (
            campaigns.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedId(c.id)}
                className={cn(
                  "w-full rounded-card border bg-white p-4 text-left shadow-sm transition",
                  selectedId === c.id
                    ? "border-accent ring-2 ring-accent-light"
                    : "border-line hover:border-accent/50"
                )}
              >
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-accent" />
                  <span className="font-medium text-primary">{c.name}</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  {c.targetCountry ?? "—"} · {c.status}
                </p>
              </button>
            ))
          ) : (
            <EmptyState message="Kampanya yok." />
          )}
        </div>

        {/* Keyword paneli */}
        <div className="lg:col-span-2">
          {selectedId ? (
            <KeywordPanel campaignId={selectedId} />
          ) : (
            <Card>
              <EmptyState message="Anahtar kelimeleri görmek için bir kampanya seçin." />
            </Card>
          )}
        </div>
      </div>

      <CreateCampaignModal open={campaignModal} onClose={() => setCampaignModal(false)} />
    </div>
  );
}

function KeywordPanel({ campaignId }: { campaignId: string }) {
  const [keywordModal, setKeywordModal] = useState(false);
  const { data: keywords, isLoading } = useGetKeywordsQuery({ campaign_id: campaignId });
  const [updateRank] = useUpdateRankMutation();

  const onRankChange = async (id: string, value: string) => {
    const currentRank = Number(value);
    if (!Number.isFinite(currentRank)) return;
    try {
      await updateRank({ id, currentRank }).unwrap();
    } catch {
      /* hata */
    }
  };

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-primary">Anahtar Kelimeler</h2>
        <Button
          variant="secondary"
          onClick={() => setKeywordModal(true)}
          className="px-3 py-2 text-xs"
        >
          <Plus className="h-4 w-4" /> Yeni Keyword
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : keywords && keywords.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-2 py-2 font-medium">Kelime</th>
                <th className="px-2 py-2 font-medium">Trend</th>
                <th className="px-2 py-2 font-medium">Önceki</th>
                <th className="px-2 py-2 font-medium">Güncel Sıra</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {keywords.map((k) => (
                <tr key={k.id} className="hover:bg-surface/60">
                  <td className="px-2 py-2.5 font-medium text-primary">{k.keyword}</td>
                  <td className="px-2 py-2.5">
                    <RankTrend current={k.currentRank} previous={k.previousRank} />
                  </td>
                  <td className="px-2 py-2.5 text-slate-500">{k.previousRank ?? "—"}</td>
                  <td className="px-2 py-2.5">
                    <Input
                      type="number"
                      defaultValue={k.currentRank ?? ""}
                      onBlur={(e) => onRankChange(k.id, e.target.value)}
                      className="w-24 px-2 py-1.5 text-sm"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState message="Bu kampanyada anahtar kelime yok." />
      )}

      <CreateKeywordModal
        open={keywordModal}
        onClose={() => setKeywordModal(false)}
        campaignId={campaignId}
      />
    </Card>
  );
}

function RankTrend({
  current,
  previous,
}: {
  current?: number | null;
  previous?: number | null;
}) {
  if (current == null || previous == null) return <Minus className="h-4 w-4 text-slate-300" />;
  // Sıralamada küçük sayı daha iyi
  if (current < previous)
    return (
      <span className="inline-flex items-center gap-1 text-emerald-600">
        <ArrowUp className="h-4 w-4" /> {previous - current}
      </span>
    );
  if (current > previous)
    return (
      <span className="inline-flex items-center gap-1 text-red-600">
        <ArrowDown className="h-4 w-4" /> {current - previous}
      </span>
    );
  return <Minus className="h-4 w-4 text-slate-400" />;
}

function CreateCampaignModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [createCampaign, { isLoading }] = useCreateCampaignMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CampaignForm>({ resolver: zodResolver(campaignSchema) });

  const onSubmit = async (data: CampaignForm) => {
    try {
      await createCampaign({
        name: data.name,
        targetCountry: data.targetCountry || undefined,
        monthlyBudget: data.monthlyBudget,
      }).unwrap();
      reset();
      onClose();
    } catch {
      /* hata */
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Yeni Kampanya">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field label="Kampanya Adı" error={errors.name?.message}>
          <Input {...register("name")} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Hedef Ülke" error={errors.targetCountry?.message}>
            <Input {...register("targetCountry")} placeholder="TR, DE..." />
          </Field>
          <Field label="Aylık Bütçe" error={errors.monthlyBudget?.message}>
            <Input type="number" step="0.01" {...register("monthlyBudget")} />
          </Field>
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

function CreateKeywordModal({
  open,
  onClose,
  campaignId,
}: {
  open: boolean;
  onClose: () => void;
  campaignId: string;
}) {
  const [createKeyword, { isLoading }] = useCreateKeywordMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<KeywordForm>({ resolver: zodResolver(keywordSchema) });

  const onSubmit = async (data: KeywordForm) => {
    try {
      await createKeyword({
        campaignId,
        keyword: data.keyword,
        targetUrl: data.targetUrl || undefined,
      }).unwrap();
      reset();
      onClose();
    } catch {
      /* hata */
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Yeni Anahtar Kelime">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field label="Anahtar Kelime" error={errors.keyword?.message}>
          <Input {...register("keyword")} />
        </Field>
        <Field label="Hedef URL" error={errors.targetUrl?.message}>
          <Input {...register("targetUrl")} placeholder="https://..." />
        </Field>
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose} className="px-4 py-2.5">
            İptal
          </Button>
          <Button type="submit" disabled={isLoading} className="px-4 py-2.5">
            {isLoading ? "Kaydediliyor..." : "Ekle"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
