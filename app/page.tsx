import { VideoHero } from "@/components/VideoHero";

export default function Home() {
  return (
    <main className="grain relative flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <VideoHero />

      <div className="relative z-10 flex flex-col items-center">
        <span
          className="animate-fade-up mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent2" />
          Coming soon
        </span>

        <h1
          className="animate-fade-up text-6xl font-bold tracking-tight sm:text-8xl"
          style={{ animationDelay: "60ms" }}
        >
          <span className="gradient-text">Sefaris</span>
        </h1>

        <p
          className="animate-fade-up mt-6 max-w-md text-balance text-base text-white/60 sm:text-lg"
          style={{ animationDelay: "140ms" }}
        >
          A new kind of intelligence for the way you build.
        </p>
      </div>
    </main>
  );
}
