"use client";

import { useEffect, useRef } from "react";
import { DETR_BRAND_GRADIENT, DETR_ORANGE } from "@/app/detr/_components/theme";

/**
 * Premium abstract video panel for the login split-screen (left column).
 * Plays /login.mp4 if present in /public; otherwise a canvas renders a
 * flowing orange→rose abstract field so there's always premium motion.
 */
export function LoginVideoPanel() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, rect.width * dpr);
      canvas.height = Math.max(1, rect.height * dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Orange · rose · amber blobs drifting over black.
    const blobs = [
      { x: 0.3, y: 0.28, r: 0.6, hue: 28, sp: 0.6 },
      { x: 0.7, y: 0.4, r: 0.55, hue: 350, sp: 0.85 },
      { x: 0.5, y: 0.82, r: 0.65, hue: 14, sp: 0.7 }
    ];

    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#090706";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const b of blobs) {
        const cx = (b.x + Math.sin(t * b.sp * 0.4) * 0.1) * w;
        const cy = (b.y + Math.cos(t * b.sp * 0.35) * 0.1) * h;
        const rad = b.r * Math.max(w, h) * (0.85 + Math.sin(t * b.sp) * 0.12);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, `hsla(${b.hue}, 90%, 58%, 0.5)`);
        g.addColorStop(1, "hsla(0,0%,0%,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      t += 0.006;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="relative hidden overflow-hidden lg:block">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-1000 data-[loaded=true]:opacity-100"
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={(e) => e.currentTarget.setAttribute("data-loaded", "true")}
      >
        <source src="/login.mp4" type="video/mp4" />
      </video>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Grid + darkening + brand wash for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-[#090706]" />

      {/* Overlaid brand copy */}
      <div className="absolute inset-0 flex flex-col justify-between p-10">
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-white/20"
            style={{ backgroundImage: DETR_BRAND_GRADIENT }}
          >
            <span className="text-base font-extrabold tracking-tight text-black">
              S
            </span>
          </span>
          <span className="text-sm font-bold tracking-tight text-white">
            Sefaris
          </span>
        </div>
        <div>
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.34em]"
            style={{ color: DETR_ORANGE }}
          >
            Yönetim paneli
          </p>
          <h2 className="mt-3 max-w-xs text-[clamp(1.6rem,2.6vw,2.2rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
            Ekibe özel, güvenli çalışma alanı.
          </h2>
          <p className="mt-3 max-w-xs text-[13px] leading-6 text-white/55">
            Görevler, güncellemeler ve dosyalar tek yerde.
          </p>
        </div>
      </div>
    </div>
  );
}
