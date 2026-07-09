"use client";

import { useEffect, useRef } from "react";

/**
 * Premium abstract hero. If /hero.mp4 exists in /public it plays it as a
 * full-bleed muted loop; otherwise a canvas renders a rich flowing abstract
 * field (drifting gradient orbs + flowing wave bands + drifting particles)
 * so the page always has a premium, video-like motion — works offline / in
 * the container.
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

    // Deep-space palette: indigo → cyan → violet.
    const orbs = [
      { x: 0.22, y: 0.28, r: 0.62, hue: 245, sp: 0.55 },
      { x: 0.78, y: 0.32, r: 0.55, hue: 190, sp: 0.85 },
      { x: 0.5, y: 0.82, r: 0.68, hue: 268, sp: 0.68 },
      { x: 0.62, y: 0.14, r: 0.4, hue: 210, sp: 1.05 }
    ];

    // Drifting particles for depth.
    const particles = Array.from({ length: 46 }, (_, i) => ({
      bx: (i * 97.13) % 100 / 100,
      by: (i * 53.71) % 100 / 100,
      sp: 0.3 + ((i * 31) % 70) / 100,
      size: 0.6 + ((i * 17) % 18) / 10,
      ph: (i * 41) % 628 / 100
    }));

    const draw = () => {
      const { width: w, height: h } = canvas;
      const min = Math.min(w, h);

      // Base gradient
      const base = ctx.createLinearGradient(0, 0, 0, h);
      base.addColorStop(0, "#070812");
      base.addColorStop(0.55, "#05060a");
      base.addColorStop(1, "#04040a");
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);

      // Flowing wave bands (video-like motion)
      ctx.globalCompositeOperation = "lighter";
      for (let b = 0; b < 3; b++) {
        ctx.beginPath();
        const yBase = h * (0.4 + b * 0.18);
        const amp = h * (0.05 + b * 0.02);
        for (let x = 0; x <= w; x += 12) {
          const y =
            yBase +
            Math.sin(x * 0.0016 + t * (0.5 + b * 0.25) + b) * amp +
            Math.sin(x * 0.004 - t * 0.7) * amp * 0.35;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        const wave = ctx.createLinearGradient(0, yBase - amp, 0, h);
        const hue = 210 + b * 24;
        wave.addColorStop(0, `hsla(${hue}, 80%, 55%, 0.10)`);
        wave.addColorStop(1, "hsla(0,0%,0%,0)");
        ctx.fillStyle = wave;
        ctx.fill();
      }

      // Drifting gradient orbs
      for (const o of orbs) {
        const cx = (o.x + Math.sin(t * o.sp * 0.4) * 0.08) * w;
        const cy = (o.y + Math.cos(t * o.sp * 0.32) * 0.08) * h;
        const rad = o.r * min * (0.9 + Math.sin(t * o.sp) * 0.12);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, `hsla(${o.hue}, 85%, 62%, 0.4)`);
        g.addColorStop(0.5, `hsla(${o.hue}, 85%, 55%, 0.12)`);
        g.addColorStop(1, "hsla(0,0%,0%,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fill();
      }

      // Particles
      for (const p of particles) {
        const px = ((p.bx + t * 0.008 * p.sp) % 1) * w;
        const py =
          (p.by * h + Math.sin(t * p.sp + p.ph) * 18 * dpr) % h;
        const twinkle = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t * 1.6 + p.ph));
        ctx.fillStyle = `hsla(200, 90%, 80%, ${0.5 * twinkle})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size * dpr, 0, Math.PI * 2);
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
          silently to the premium canvas below if the file is missing. */}
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

      {/* Fine grid for depth */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 70%)"
        }}
      />
      {/* Legibility veil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,6,10,0.72)_100%)]" />
    </div>
  );
}
