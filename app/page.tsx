import AuroraBackground from "@/components/AuroraBackground";
import Countdown from "@/components/Countdown";
import SubscribeForm from "@/components/SubscribeForm";
import Footer from "@/components/Footer";

// Launch target: NEXT_PUBLIC_LAUNCH_DATE (ISO string) or 30 days from build.
const LAUNCH_TARGET =
  process.env.NEXT_PUBLIC_LAUNCH_DATE ||
  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

export default function Home() {
  return (
    <main className="grain relative flex min-h-dvh flex-col items-center justify-center px-6 py-16">
      <AuroraBackground />

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        {/* Eyebrow */}
        <span className="animate-fade-up mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 backdrop-blur-md">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent2" />
          Building something new
        </span>

        {/* Wordmark */}
        <h1
          className="animate-fade-up text-5xl font-bold tracking-tight sm:text-7xl"
          style={{ animationDelay: "60ms" }}
        >
          <span className="gradient-text">Sefaris</span>
        </h1>

        {/* Tagline */}
        <p
          className="animate-fade-up mt-5 max-w-xl text-balance text-base text-white/60 sm:text-lg"
          style={{ animationDelay: "120ms" }}
        >
          A new kind of intelligence for the way you build. We&apos;re putting
          the finishing touches on something worth the wait.
        </p>

        {/* Countdown */}
        <div
          className="animate-fade-up mt-12"
          style={{ animationDelay: "180ms" }}
        >
          <Countdown target={LAUNCH_TARGET} />
        </div>

        {/* Subscribe */}
        <div
          className="animate-fade-up mt-12 w-full"
          style={{ animationDelay: "240ms" }}
        >
          <SubscribeForm />
        </div>

        <Footer />
      </div>
    </main>
  );
}
