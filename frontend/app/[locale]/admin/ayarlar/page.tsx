"use client";

import { useState, type FormEvent } from "react";
import { Save, Mail, Info } from "lucide-react";
import { Button, Card, Field, Input, Select } from "@/components/ui";
import { PageHeader } from "@/components/admin/primitives";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Not: Ayar kaydetme için henüz bir API uç noktası yok — arayüz hazır.
    setSaved(true);
  };

  return (
    <div>
      <PageHeader title="Ayarlar" description="Sistem ve bildirim ayarları" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="mb-4 text-base font-semibold text-primary">Genel Ayarlar</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <Field label="Site Adı">
              <Input defaultValue="Sefaris" onChange={() => setSaved(false)} />
            </Field>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="İletişim E-postası">
                <Input type="email" defaultValue="info@sefaris.site" onChange={() => setSaved(false)} />
              </Field>
              <Field label="Varsayılan Para Birimi">
                <Select defaultValue="eur" onChange={() => setSaved(false)}>
                  <option value="eur">EUR</option>
                  <option value="try">TRY</option>
                  <option value="usd">USD</option>
                </Select>
              </Field>
            </div>
            <Field label="Varsayılan Dil">
              <Select defaultValue="tr" onChange={() => setSaved(false)}>
                <option value="tr">Türkçe</option>
                <option value="de">Almanca</option>
                <option value="en">İngilizce</option>
              </Select>
            </Field>

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" className="px-4 py-2.5">
                <Save className="h-4 w-4" /> Kaydet
              </Button>
              {saved && <span className="text-sm text-success">Ayarlar kaydedildi.</span>}
            </div>
          </form>
        </Card>

        <div className="space-y-6">
          <Card>
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-primary">
              <Mail className="h-5 w-5 text-accent" /> E-posta Şablonları
            </h2>
            <p className="text-sm text-slate-500">
              Hoş geldin, teklif ve fatura e-postaları için şablonlar backend üzerinden yönetilir.
              Şablon düzenleme arayüzü yakında eklenecektir.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="rounded-lg border border-line bg-surface/50 px-3 py-2">Hoş geldin e-postası</li>
              <li className="rounded-lg border border-line bg-surface/50 px-3 py-2">Teklif bildirimi</li>
              <li className="rounded-lg border border-line bg-surface/50 px-3 py-2">Fatura hatırlatma</li>
            </ul>
          </Card>

          <Card>
            <div className="flex items-start gap-2 text-sm text-slate-500">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p>
                Bu sayfadaki ayarlar şu an yalnızca arayüz düzeyindedir. Kalıcı kayıt için ilgili
                API uç noktaları bağlanmalıdır.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
