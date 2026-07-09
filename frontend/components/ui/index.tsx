import * as React from "react";
import { cn } from "@/lib/utils";

/** Küçük, kurumsal UI kit (rehber bölüm 12.3). */

export function Button({
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger" }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition disabled:opacity-50 disabled:pointer-events-none";
  const variants: Record<string, string> = {
    primary: "bg-accent text-white hover:bg-accent-hover",
    secondary: "border border-line bg-white text-primary hover:bg-surface",
    ghost: "text-primary hover:bg-surface",
    danger: "bg-danger text-white hover:opacity-90",
  };
  return <button className={cn(base, variants[variant], className)} {...props} />;
}

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-card border border-line bg-white p-6 shadow-sm", className)}
      {...props}
    />
  );
}

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-medium", className)}
      {...props}
    />
  );
}

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-light",
          className
        )}
        {...props}
      />
    );
  }
);

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-light",
          className
        )}
        {...props}
      />
    );
  }
);

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, ...props }, ref) {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-light",
          className
        )}
        {...props}
      />
    );
  }
);

export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-primary">{label}</span>
      {children}
      {error && <span className="block text-xs text-danger">{error}</span>}
    </label>
  );
}
