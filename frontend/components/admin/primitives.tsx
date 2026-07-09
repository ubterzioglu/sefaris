"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/** Admin panel için paylaşılan küçük yapı taşları. */

export function Modal({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-primary/40 p-4 backdrop-blur-sm sm:items-center"
      onMouseDown={onClose}
    >
      <div
        className={cn(
          "my-8 w-full max-w-lg rounded-modal border border-line bg-white shadow-xl",
          className
        )}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="text-lg font-semibold text-primary">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 transition hover:bg-surface hover:text-primary"
            aria-label="Kapat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-surface", className)} />;
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-primary">{title}</h1>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-card border border-dashed border-line bg-surface/50 p-10 text-center text-sm text-slate-500">
      {message}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon,
  loading,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <div className="rounded-card border border-line bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <span className="text-sm text-slate-500">{label}</span>
        {icon && <span className="text-accent">{icon}</span>}
      </div>
      {loading ? (
        <Skeleton className="mt-3 h-8 w-24" />
      ) : (
        <div className="mt-2 text-2xl font-semibold text-primary">{value}</div>
      )}
      {hint && <div className="mt-1 text-xs text-slate-400">{hint}</div>}
    </div>
  );
}
