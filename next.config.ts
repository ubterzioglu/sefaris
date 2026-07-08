import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  // Keep production builds fast: don't run ESLint during the container build
  // (lint is a separate CI/dev step). Types are still checked by tsc below.
  eslint: { ignoreDuringBuilds: true },
  // Trim what gets traced into the standalone bundle.
  outputFileTracingExcludes: {
    "*": ["node_modules/@swc/core-linux-x64-gnu", "node_modules/@swc/core-linux-x64-musl"]
  }
};

export default nextConfig;
