import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: true },
  outputFileTracingExcludes: {
    "*": ["node_modules/@swc/core-linux-x64-gnu", "node_modules/@swc/core-linux-x64-musl"],
  },
};

export default withNextIntl(nextConfig);
