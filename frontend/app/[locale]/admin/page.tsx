"use client";

import {
  ListTodo,
  FolderOpen,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity as ActivityIcon,
  Megaphone,
} from "lucide-react";
import {
  useGetDashboardStatsQuery,
  useGetActivitiesQuery,
  useGetActiveAnnouncementsQuery,
  useGetMyTasksQuery,
} from "@/store/api/dashboardApi";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Card, Badge } from "@/components/ui";
import { PageHeader, StatCard, Skeleton, EmptyState } from "@/components/admin/primitives";
import { TASK_STATUS_STYLES, TASK_STATUS_LABELS_TR } from "@/components/admin/status";

export default function AdminDashboardPage() {
  const { data: stats, isLoading: statsLoading } = useGetDashboardStatsQuery();
  const { data: activities, isLoading: actLoading } = useGetActivitiesQuery();
  const { data: announcements } = useGetActiveAnnouncementsQuery();
  const { data: myTasks, isLoading: myTasksLoading } = useGetMyTasksQuery();

  return (
    <div>
      <PageHeader title="Panel" description="Operasyona genel bakış" />

      {/* İstatistik kartları */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Toplam Görev"
          value={stats?.totalTasks ?? 0}
          hint={`${stats?.openTasks ?? 0} açık`}
          icon={<ListTodo className="h-5 w-5" />}
          loading={statsLoading}
        />
        <StatCard
          label="Tamamlanan Görev"
          value={stats?.completedTasks ?? 0}
          hint={`${stats?.delayedTasks ?? 0} geciken`}
          icon={<CheckCircle2 className="h-5 w-5" />}
          loading={statsLoading}
        />
        <StatCard
          label="Aktif Proje"
          value={stats?.activeProjects ?? 0}
          hint={`${stats?.totalProjects ?? 0} toplam`}
          icon={<FolderOpen className="h-5 w-5" />}
          loading={statsLoading}
        />
        <StatCard
          label="Geciken Görev"
          value={stats?.delayedTasks ?? 0}
          icon={<AlertTriangle className="h-5 w-5" />}
          loading={statsLoading}
        />
      </div>

      {/* Gelir / gider */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard
          label="Aylık Gelir"
          value={formatCurrency(stats?.monthlyIncome)}
          icon={<TrendingUp className="h-5 w-5" />}
          loading={statsLoading}
        />
        <StatCard
          label="Aylık Gider"
          value={formatCurrency(stats?.monthlyExpense)}
          icon={<TrendingDown className="h-5 w-5" />}
          loading={statsLoading}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Aktivite akışı */}
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <ActivityIcon className="h-5 w-5 text-accent" />
            <h2 className="text-base font-semibold text-primary">Aktivite Akışı</h2>
          </div>
          {actLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : activities && activities.length > 0 ? (
            <ul className="space-y-3">
              {activities.map((a) => (
                <li key={a.id} className="flex items-start gap-3 border-b border-line pb-3 last:border-0 last:pb-0">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <div className="min-w-0">
                    <p className="text-sm text-primary">{a.action}</p>
                    <p className="text-xs text-slate-400">
                      {a.entityType ? `${a.entityType} · ` : ""}
                      {formatDate(a.createdAt)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState message="Henüz aktivite yok." />
          )}
        </Card>

        {/* Duyurular */}
        <Card>
          <div className="mb-4 flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-accent" />
            <h2 className="text-base font-semibold text-primary">Duyurular</h2>
          </div>
          {announcements && announcements.length > 0 ? (
            <ul className="space-y-4">
              {announcements.map((an) => (
                <li key={an.id} className="rounded-lg border border-line bg-surface/50 p-3">
                  <p className="text-sm font-medium text-primary">{an.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{an.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState message="Aktif duyuru yok." />
          )}
        </Card>
      </div>

      {/* Üzerimdeki görevler */}
      <Card className="mt-6">
        <h2 className="mb-4 text-base font-semibold text-primary">Üzerimdeki Görevler</h2>
        {myTasksLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : myTasks && myTasks.length > 0 ? (
          <ul className="divide-y divide-line">
            {myTasks.map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-primary">{t.title}</p>
                  <p className="text-xs text-slate-400">Son tarih: {formatDate(t.dueDate)}</p>
                </div>
                <Badge className={TASK_STATUS_STYLES[t.status]}>
                  {TASK_STATUS_LABELS_TR[t.status]}
                </Badge>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState message="Üzerinizde görev yok." />
        )}
      </Card>
    </div>
  );
}
