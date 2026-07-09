"use client";

import { useState, type DragEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, LayoutList, Columns3 } from "lucide-react";
import {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
  type GetTasksParams,
} from "@/store/api/taskApi";
import type { Task, TaskStatus, TaskPriority } from "@/lib/types";
import { formatDate, cn } from "@/lib/utils";
import { Button, Badge, Field, Input, Textarea, Select } from "@/components/ui";
import { PageHeader, Modal, Skeleton, EmptyState } from "@/components/admin/primitives";
import {
  TASK_STATUS_STYLES,
  TASK_STATUS_LABELS_TR,
  PRIORITY_STYLES,
  PRIORITY_LABELS_TR,
} from "@/components/admin/status";

const ALL_STATUSES: TaskStatus[] = [
  "open",
  "in_progress",
  "in_review",
  "completed",
  "cancelled",
  "delayed",
];
const ALL_PRIORITIES: TaskPriority[] = ["low", "medium", "high", "urgent"];
const KANBAN_COLUMNS: TaskStatus[] = ["open", "in_progress", "in_review", "completed"];

const taskSchema = z.object({
  title: z.string().min(2, "En az 2 karakter").max(300, "En fazla 300 karakter"),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  dueDate: z.string().optional(),
  description: z.string().max(5000).optional(),
});
type TaskForm = z.infer<typeof taskSchema>;

export default function TasksPage() {
  const [view, setView] = useState<"liste" | "kanban">("liste");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);

  const params: GetTasksParams = {};
  if (statusFilter) params.status = statusFilter;
  if (priorityFilter) params.priority = priorityFilter;

  const { data: tasks, isLoading } = useGetTasksQuery(params);
  const [updateStatus] = useUpdateTaskStatusMutation();

  const onQuickStatus = async (id: string, status: TaskStatus) => {
    try {
      await updateStatus({ id, status }).unwrap();
    } catch {
      /* optimistic geri alınır */
    }
  };

  const onDrop = async (e: DragEvent<HTMLDivElement>, status: TaskStatus) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (id) await onQuickStatus(id, status);
  };

  return (
    <div>
      <PageHeader
        title="Görevler"
        description="Görevleri liste veya pano görünümünde yönetin"
        action={
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-line bg-white p-1">
              <button
                type="button"
                onClick={() => setView("liste")}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition",
                  view === "liste" ? "bg-accent-light text-accent-hover" : "text-slate-500"
                )}
              >
                <LayoutList className="h-4 w-4" /> Liste
              </button>
              <button
                type="button"
                onClick={() => setView("kanban")}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition",
                  view === "kanban" ? "bg-accent-light text-accent-hover" : "text-slate-500"
                )}
              >
                <Columns3 className="h-4 w-4" /> Kanban
              </button>
            </div>
            <Button onClick={() => setModalOpen(true)} className="px-4 py-2.5">
              <Plus className="h-4 w-4" /> Yeni Görev
            </Button>
          </div>
        }
      />

      {view === "liste" && (
        <>
          <div className="mb-4 flex flex-wrap gap-3">
            <div className="w-44">
              <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">Tüm durumlar</option>
                {ALL_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {TASK_STATUS_LABELS_TR[s]}
                  </option>
                ))}
              </Select>
            </div>
            <div className="w-44">
              <Select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                <option value="">Tüm öncelikler</option>
                {ALL_PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {PRIORITY_LABELS_TR[p]}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full" />
              ))}
            </div>
          ) : tasks && tasks.length > 0 ? (
            <div className="overflow-x-auto rounded-card border border-line bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-slate-500">
                    <th className="px-4 py-3 font-medium">Başlık</th>
                    <th className="px-4 py-3 font-medium">Öncelik</th>
                    <th className="px-4 py-3 font-medium">Son Tarih</th>
                    <th className="px-4 py-3 font-medium">Durum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {tasks.map((t) => (
                    <tr key={t.id} className="hover:bg-surface/60">
                      <td className="px-4 py-3 font-medium text-primary">{t.title}</td>
                      <td className="px-4 py-3">
                        <Badge className={PRIORITY_STYLES[t.priority]}>
                          {PRIORITY_LABELS_TR[t.priority]}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-slate-500">{formatDate(t.dueDate)}</td>
                      <td className="px-4 py-3">
                        <select
                          value={t.status}
                          onChange={(e) => onQuickStatus(t.id, e.target.value as TaskStatus)}
                          className={cn(
                            "rounded-full px-3 py-1 text-xs font-medium outline-none",
                            TASK_STATUS_STYLES[t.status]
                          )}
                        >
                          {ALL_STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {TASK_STATUS_LABELS_TR[s]}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState message="Görev bulunamadı." />
          )}
        </>
      )}

      {view === "kanban" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {KANBAN_COLUMNS.map((col) => {
            const colTasks = (tasks ?? []).filter((t) => t.status === col);
            return (
              <div
                key={col}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => onDrop(e, col)}
                className="flex flex-col rounded-card border border-line bg-surface/60 p-3"
              >
                <div className="mb-3 flex items-center justify-between">
                  <Badge className={TASK_STATUS_STYLES[col]}>{TASK_STATUS_LABELS_TR[col]}</Badge>
                  <span className="text-xs text-slate-400">{colTasks.length}</span>
                </div>
                <div className="space-y-2">
                  {colTasks.map((t) => (
                    <KanbanCard key={t.id} task={t} />
                  ))}
                  {colTasks.length === 0 && (
                    <p className="rounded-lg border border-dashed border-line py-6 text-center text-xs text-slate-400">
                      Buraya sürükleyin
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <CreateTaskModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

function KanbanCard({ task }: { task: Task }) {
  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", task.id);
    e.dataTransfer.effectAllowed = "move";
  };
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="cursor-grab rounded-lg border border-line bg-white p-3 shadow-sm active:cursor-grabbing"
    >
      <p className="text-sm font-medium text-primary">{task.title}</p>
      <div className="mt-2 flex items-center justify-between">
        <Badge className={PRIORITY_STYLES[task.priority]}>
          {PRIORITY_LABELS_TR[task.priority]}
        </Badge>
        <span className="text-xs text-slate-400">{formatDate(task.dueDate)}</span>
      </div>
    </div>
  );
}

function CreateTaskModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskForm>({
    resolver: zodResolver(taskSchema),
    defaultValues: { priority: "medium" },
  });

  const onSubmit = async (data: TaskForm) => {
    try {
      await createTask({
        title: data.title,
        priority: data.priority,
        dueDate: data.dueDate || null,
        description: data.description || null,
      }).unwrap();
      reset({ priority: "medium", title: "", dueDate: "", description: "" });
      onClose();
    } catch {
      /* hata */
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Yeni Görev">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field label="Başlık" error={errors.title?.message}>
          <Input {...register("title")} placeholder="Görev başlığı" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Öncelik" error={errors.priority?.message}>
            <Select {...register("priority")}>
              {ALL_PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {PRIORITY_LABELS_TR[p]}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Son Tarih" error={errors.dueDate?.message}>
            <Input type="date" {...register("dueDate")} />
          </Field>
        </div>
        <Field label="Açıklama" error={errors.description?.message}>
          <Textarea rows={4} {...register("description")} placeholder="Opsiyonel" />
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
