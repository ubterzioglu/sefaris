"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { getAuthedEmail } from "@/lib/supabaseServer";
import { createSupabaseServer } from "@/lib/supabaseServer";
import { DETR_ACCESS_COOKIE } from "@/lib/detr-auth";

/**
 * Bridges a Supabase-authenticated admin into the existing DETR board session.
 *
 * The DETR board reads an HttpOnly `email|password` cookie. Once a user is
 * authenticated via Supabase (and their email is allowlisted), we mint that
 * cookie here so the board renders without a second password prompt.
 */
function getDetrPassword(): string {
  return process.env.ADMIN_QASS_DETR?.trim() ?? "";
}

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
 * email is allowlisted; otherwise null.
 */
export async function getAdminEmail(): Promise<string | null> {
  const email = await getAuthedEmail();
  if (!email) return null;
  return getAllowedEmails().includes(email) ? email : null;
}

/**
 * Grants the DETR board session cookie for an already-authenticated admin.
 * Safe to call on every /admin load; it's a no-op-ish refresh.
 */
export async function bridgeToDetrSession(): Promise<boolean> {
  const email = await getAdminEmail();
  const password = getDetrPassword();
  if (!email || !password) return false;

  const cookieStore = await cookies();
  cookieStore.set(DETR_ACCESS_COOKIE, `${email}|${password}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
  return true;
}

/** Signs out of both Supabase and the DETR board, then back to /admin. */
export async function adminSignOutAction(): Promise<void> {
  const supabase = await createSupabaseServer();
  await supabase.auth.signOut();

  const cookieStore = await cookies();
  cookieStore.set(DETR_ACCESS_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0
  });
  redirect("/admin");
}
