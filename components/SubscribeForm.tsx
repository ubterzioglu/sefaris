"use client";

import { useState } from "react";
import { isValidEmail } from "@/lib/validateEmail";

type Status = "idle" | "loading" | "success" | "error";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;

    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
      };

      if (res.ok && data.success) {
        setStatus("success");
        setMessage("You're on the list. We'll be in touch. ✦");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  const isDone = status === "success";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-md"
      noValidate
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          disabled={isDone}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none backdrop-blur-md transition focus:border-accent2/60 focus:bg-white/10 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading" || isDone}
          className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-accent to-accent2 px-6 py-3 text-sm font-semibold text-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading"
            ? "Joining…"
            : isDone
              ? "Joined ✓"
              : "Notify me"}
        </button>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={`mt-3 min-h-[1.25rem] text-center text-xs sm:text-left ${
          status === "error"
            ? "text-red-300"
            : status === "success"
              ? "text-emerald-300"
              : "text-white/40"
        }`}
      >
        {message || "No spam. Just one email when we launch."}
      </p>
    </form>
  );
}
