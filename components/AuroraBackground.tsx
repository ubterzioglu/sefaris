export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Deep base */}
      <div className="absolute inset-0 bg-ink" />

      {/* Aurora blobs */}
      <div className="absolute -top-1/3 left-1/4 h-[60vmax] w-[60vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.55),transparent_60%)] blur-3xl animate-aurora" />
      <div className="absolute top-1/4 right-0 h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.42),transparent_60%)] blur-3xl animate-aurora-slow" />
      <div className="absolute bottom-0 left-1/3 h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.4),transparent_60%)] blur-3xl animate-aurora" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,6,10,0.85)_100%)]" />
    </div>
  );
}
