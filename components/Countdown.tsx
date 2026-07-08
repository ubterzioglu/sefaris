"use client";

import { useEffect, useMemo, useState } from "react";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diffToParts(targetMs: number, nowMs: number): Parts {
  const total = Math.max(0, targetMs - nowMs);
  const seconds = Math.floor(total / 1000) % 60;
  const minutes = Math.floor(total / (1000 * 60)) % 60;
  const hours = Math.floor(total / (1000 * 60 * 60)) % 24;
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds };
}

const UNITS: Array<{ key: keyof Parts; label: string }> = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export default function Countdown({ target }: { target: string }) {
  const targetMs = useMemo(() => {
    const t = new Date(target).getTime();
    return Number.isNaN(t) ? Date.now() + 30 * 24 * 60 * 60 * 1000 : t;
  }, [target]);

  // Avoid hydration mismatch: render zeros on the server, hydrate on mount.
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const tick = () => setParts(diffToParts(targetMs, Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  const shown = parts ?? { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <div
      className="flex items-center justify-center gap-3 sm:gap-5"
      aria-label="Time until launch"
    >
      {UNITS.map(({ key, label }) => (
        <div key={key} className="flex flex-col items-center">
          <div className="relative w-16 rounded-xl border border-white/10 bg-white/5 py-3 backdrop-blur-md sm:w-20 sm:py-4">
            <span className="block text-center font-mono text-2xl font-semibold tabular-nums text-white sm:text-3xl">
              {String(shown[key]).padStart(2, "0")}
            </span>
          </div>
          <span className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/50 sm:text-xs">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
