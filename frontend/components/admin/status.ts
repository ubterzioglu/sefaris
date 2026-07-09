import type { TaskStatus, TaskPriority, LeadStatus, ProjectStatus } from "@/lib/types";

/**
 * Admin panel durum renkleri ve Türkçe etiketleri (rehber bölüm 12.4).
 * Tailwind sınıfları önceden tanımlı — dinamik string birleştirme yok ki purge çalışsın.
 */

export const TASK_STATUS_STYLES: Record<TaskStatus, string> = {
  open: "bg-slate-100 text-slate-700 border border-slate-200",
  in_progress: "bg-accent-light text-accent-hover border border-accent/30",
  in_review: "bg-amber-100 text-amber-700 border border-amber-200",
  completed: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  cancelled: "bg-slate-100 text-slate-400 border border-slate-200",
  delayed: "bg-red-100 text-red-700 border border-red-200",
};

export const TASK_STATUS_LABELS_TR: Record<TaskStatus, string> = {
  open: "Açık",
  in_progress: "Devam Ediyor",
  in_review: "İncelemede",
  completed: "Tamamlandı",
  cancelled: "İptal",
  delayed: "Gecikti",
};

export const PRIORITY_STYLES: Record<TaskPriority, string> = {
  low: "bg-slate-100 text-slate-600 border border-slate-200",
  medium: "bg-sky-100 text-sky-700 border border-sky-200",
  high: "bg-amber-100 text-amber-700 border border-amber-200",
  urgent: "bg-red-100 text-red-700 border border-red-200",
};

export const PRIORITY_LABELS_TR: Record<TaskPriority, string> = {
  low: "Düşük",
  medium: "Orta",
  high: "Yüksek",
  urgent: "Acil",
};

export const LEAD_STATUS_LABELS_TR: Record<LeadStatus, string> = {
  new: "Yeni",
  contacted: "İletişime Geçildi",
  meeting_scheduled: "Toplantı Planlandı",
  proposal_sent: "Teklif Gönderildi",
  won: "Kazanıldı",
  lost: "Kaybedildi",
  on_hold: "Beklemede",
};

export const LEAD_STATUS_STYLES: Record<LeadStatus, string> = {
  new: "bg-slate-100 text-slate-700 border border-slate-200",
  contacted: "bg-sky-100 text-sky-700 border border-sky-200",
  meeting_scheduled: "bg-violet-100 text-violet-700 border border-violet-200",
  proposal_sent: "bg-amber-100 text-amber-700 border border-amber-200",
  won: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  lost: "bg-red-100 text-red-700 border border-red-200",
  on_hold: "bg-slate-100 text-slate-500 border border-slate-200",
};

export const PROJECT_STATUS_STYLES: Record<ProjectStatus, string> = {
  proposal: "bg-slate-100 text-slate-700 border border-slate-200",
  approved: "bg-sky-100 text-sky-700 border border-sky-200",
  in_progress: "bg-accent-light text-accent-hover border border-accent/30",
  testing: "bg-amber-100 text-amber-700 border border-amber-200",
  live: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  maintenance: "bg-violet-100 text-violet-700 border border-violet-200",
  cancelled: "bg-slate-100 text-slate-400 border border-slate-200",
  completed: "bg-emerald-100 text-emerald-700 border border-emerald-200",
};

export const PROJECT_STATUS_LABELS_TR: Record<ProjectStatus, string> = {
  proposal: "Teklif",
  approved: "Onaylandı",
  in_progress: "Devam Ediyor",
  testing: "Test",
  live: "Yayında",
  maintenance: "Bakım",
  cancelled: "İptal",
  completed: "Tamamlandı",
};

export const ROLE_LABELS_TR: Record<string, string> = {
  super_admin: "Süper Admin",
  admin: "Admin",
  developer: "Geliştirici",
  designer: "Tasarımcı",
  seo_specialist: "SEO Uzmanı",
  viewer: "İzleyici",
  accountant: "Muhasebe",
};
