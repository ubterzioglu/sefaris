"use client";

import { useEffect, useRef } from "react";

/**
 * Abstract animated hero. If /hero.mp4 exists in /public it plays it as a
 * full-bleed muted loop; otherwise a canvas renders a flowing abstract field
 * so the page always has motion (works offline / in the container).
 */
export function VideoHero() {
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
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    // Slow-drifting abstract blobs — indigo → cyan → violet.
    const blobs = [
      { x: 0.25, y: 0.3, r: 0.55, hue: 245, sp: 0.6 },
      { x: 0.75, y: 0.35, r: 0.5, hue: 190, sp: 0.9 },
      { x: 0.5, y: 0.8, r: 0.6, hue: 265, sp: 0.7 }
    ];

    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#05060a";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (const b of blobs) {
        const cx = (b.x + Math.sin(t * b.sp * 0.4) * 0.08) * w;
        const cy = (b.y + Math.cos(t * b.sp * 0.35) * 0.08) * h;
        const rad = b.r * Math.min(w, h) * (0.9 + Math.sin(t * b.sp) * 0.1);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, `hsla(${b.hue}, 85%, 60%, 0.42)`);
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
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* Optional real video — drop /public/hero.mp4 to use it. Falls back
          silently to the canvas below if the file is missing. */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-1000 data-[loaded=true]:opacity-100"
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={(e) => e.currentTarget.setAttribute("data-loaded", "true")}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* Legibility veil + grain */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,6,10,0.7)_100%)]" />
    </div>
  );
}
