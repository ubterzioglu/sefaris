"use server";

import { redirect } from "next/navigation";

import { getAuthedEmail, createSupabaseServer } from "@/lib/supabaseServer";

/**
 * Admin allowlist. Only these Supabase-authenticated emails may see the board.
 * Override without a deploy via DETR_ALLOWED_EMAILS (comma-separated).
 */
function getAllowedEmails(): string[] {
  const raw = process.env.DETR_ALLOWED_EMAILS?.trim();
  const fallback = [
    "eyersefa@gmail.com",
    "sumeyyanacar08@gmail.com",
    "fatihmclskn@gmail.com",
    "corteqssocial@gmail.com",
    "ubterzioglu@gmail.com",
    "ozbakirsahincande@gmail.com",
    "fatmacinaryalcin@hotmail.com",
    "muratberatbasari@gmail.com",
    "admin@admin.com"
  ];
  const list = raw ? raw.split(",") : fallback;
  return list.map((e) => e.trim().toLowerCase()).filter(Boolean);
}

/**
 * Returns the signed-in admin email if the Supabase session is valid AND the
 * email is allowlisted; otherwise null. getUser() re-validates the token, so
 * this is safe for gating.
 */
export async function getAdminEmail(): Promise<string | null> {
  const email = await getAuthedEmail();
  if (!email) return null;
  return getAllowedEmails().includes(email) ? email : null;
}

/** Signs out of Supabase and returns to the login. */
export async function adminSignOutAction(): Promise<void> {
  const supabase = await createSupabaseServer();
  await supabase.auth.signOut();
  redirect("/admin");
}
