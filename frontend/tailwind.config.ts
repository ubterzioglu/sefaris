import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        ink: "#05060a",
        accent: "#6366f1",
        accent2: "#22d3ee",
      },
      animation: {
        aurora: "aurora 18s ease-in-out infinite",
        "aurora-slow": "aurora 26s ease-in-out infinite reverse",
        float: "float 7s ease-in-out infinite",
        drift: "drift 9s ease-in-out infinite",
        reveal: "reveal 0.6s ease-out both",
        "fade-up": "fadeUp 0.8s ease-out both",
        shimmer: "shimmer 3s linear infinite",
      },
      keyframes: {
        aurora: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg) scale(1)" },
          "33%": { transform: "translate(6%, -8%) rotate(120deg) scale(1.15)" },
          "66%": { transform: "translate(-6%, 6%) rotate(240deg) scale(0.95)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-14px, 12px)" },
        },
        reveal: {
          from: { opacity: "0", transform: "translateY(18px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
