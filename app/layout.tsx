import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const SITE_URL = "https://sefaris.site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Sefaris — Coming Soon",
  description:
    "Sefaris is coming soon. A new kind of intelligence for the way you build. Join the waitlist to get early access.",
  keywords: ["Sefaris", "AI", "SaaS", "coming soon", "waitlist"],
  authors: [{ name: "Sefaris" }],
  openGraph: {
    title: "Sefaris — Coming Soon",
    description:
      "A new kind of intelligence for the way you build. Join the waitlist.",
    url: SITE_URL,
    siteName: "Sefaris",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sefaris — Coming Soon",
    description:
      "A new kind of intelligence for the way you build. Join the waitlist.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
