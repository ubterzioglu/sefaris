import { CheckCircle2, CircleDashed, CircleDot } from "lucide-react";
import { Card } from "@/components/ui";
import { PageHeader, StatCard } from "@/components/admin/primitives";

/**
 * Kalanlar — sefarislast.md v4.0.0 mimarisine göre projenin dürüst durum dökümü.
 * "done" = çalışıyor/doğrulandı · "partial" = iskele/sadeleştirilmiş · "todo" = Faz 2/3.
 */
type Status = "done" | "partial" | "todo";

interface Item {
  title: string;
  status: Status;
  note?: string;
}
interface Group {
  title: string;
  items: Item[];
}

const GROUPS: Group[] = [
  {
    title: "Backend (Spring Boot)",
    items: [
      { title: "Şema + 16 entity + ~60 endpoint + JWT/RBAC", status: "done", note: "H2'de ayağa kalktı, uçtan uca doğrulandı" },
      { title: "Görev CRUD + Kanban durum + yorum/dosya", status: "done" },
      { title: "CRM: müşteri + lead pipeline + history", status: "done" },
      { title: "Finans + otomatik hakediş hesaplayıcı", status: "done" },
      { title: "Public iletişim formu → otomatik lead", status: "done", note: "Senaryo A çalışıyor" },
      { title: "Google OAuth2 giriş/callback", status: "todo", note: "client-id verilince application.yml'de aktifleşecek" },
      { title: "S3/MinIO gerçek dosya yükleme", status: "partial", note: "şu an metadata + URL; S3_ENABLED ile prod'da bağlanacak" },
      { title: "E-posta gönderimi (SMTP/SendGrid)", status: "partial", note: "şablonlar + akış hazır, EMAIL_ENABLED=false" },
      { title: "Bildirim sistemi (panel zil + SSE/WebSocket)", status: "todo" },
      { title: "Gecikmiş görev cron job (delayed)", status: "todo" },
      { title: "Refresh token rotasyonu / iptal listesi", status: "todo" },
    ],
  },
  {
    title: "Frontend (Next.js + RTK Query)",
    items: [
      { title: "next-intl (TR/DE/EN) + RTK Query store", status: "done" },
      { title: "Public kurumsal site (tüm sayfalar)", status: "done" },
      { title: "Admin: dashboard, görevler (Kanban), CRM, finans, seo, ekip", status: "done" },
      { title: "Optimistic update (sürükle-bırak Kanban)", status: "done" },
      { title: "Ayarlar sayfası gerçek API'ye bağlama", status: "partial", note: "UI hazır, /admin/settings bağlanacak" },
      { title: "Görev detay: thread yorum, dosya revizyon, alt görevler", status: "partial" },
      { title: "Bildirim dropdown (zil ikonu)", status: "todo" },
      { title: "Blog & Portfolyo CMS (statik → dinamik)", status: "todo" },
      { title: "İletişim: Calendly + Google Maps embed", status: "todo" },
      { title: "Çerez onay banner'ı (KVKK/GDPR)", status: "todo" },
    ],
  },
  {
    title: "DevOps & Altyapı",
    items: [
      { title: "docker-compose (frontend+backend+postgres+redis+minio)", status: "done" },
      { title: "Dockerfile'lar (JDK21 backend, standalone frontend)", status: "done" },
      { title: "CI/CD workflow (build + test)", status: "done" },
      { title: "Gerçek deploy hook (Coolify/AWS)", status: "partial", note: "workflow placeholder" },
      { title: "Maven wrapper (mvnw)", status: "todo" },
      { title: "Sentry hata takip + log toplama", status: "todo" },
      { title: "Yedekleme (pg_dump cron → S3)", status: "todo" },
    ],
  },
  {
    title: "Test & Kalite",
    items: [
      { title: "Backend birim/entegrasyon testleri (JUnit/MockMvc)", status: "todo" },
      { title: "Frontend testleri (Jest/Playwright)", status: "todo" },
      { title: "Lighthouse / Core Web Vitals ≥ 95", status: "todo" },
      { title: "Güvenlik testi (OWASP ZAP)", status: "todo" },
    ],
  },
];

const STATUS_META: Record<Status, { label: string; cls: string; icon: typeof CheckCircle2 }> = {
  done: { label: "Yapıldı", cls: "text-success bg-success/10", icon: CheckCircle2 },
  partial: { label: "Kısmi", cls: "text-warning bg-warning/10", icon: CircleDot },
  todo: { label: "Kaldı", cls: "text-slate-500 bg-slate-100", icon: CircleDashed },
};

export default function KalanlarPage() {
  const all = GROUPS.flatMap((g) => g.items);
  const count = (s: Status) => all.filter((i) => i.status === s).length;
  const pct = Math.round((count("done") / all.length) * 100);

  return (
    <div>
      <PageHeader
        title="Kalanlar"
        description="sefarislast.md v4.0.0 mimarisine göre projenin dürüst durum dökümü"
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Tamamlanan" value={`${pct}%`} hint={`${count("done")} / ${all.length} madde`} />
        <StatCard label="Yapıldı" value={count("done")} />
        <StatCard label="Kısmi" value={count("partial")} />
        <StatCard label="Kaldı" value={count("todo")} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {GROUPS.map((group) => (
          <Card key={group.title}>
            <h2 className="mb-4 text-base font-semibold text-primary">{group.title}</h2>
            <ul className="space-y-2.5">
              {group.items.map((item) => {
                const meta = STATUS_META[item.status];
                const Icon = meta.icon;
                return (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${meta.cls}`}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-primary">{item.title}</div>
                      {item.note && <div className="text-xs text-slate-500">{item.note}</div>}
                    </div>
                    <span className={`ml-auto shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${meta.cls}`}>
                      {meta.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
