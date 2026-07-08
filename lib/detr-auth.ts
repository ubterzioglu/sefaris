import "server-only";

import { cookies } from "next/headers";

/**
 * DETR admin gate — self-contained (ported from ubt2026).
 *
 * The board is gated by an e-mail allowlist plus a shared password
 * (ADMIN_QASS_DETR). The access key is NEVER carried in the URL/query string
 * (which leaks into browser history, server access logs and the Referer
 * header). Instead the gate form posts the credentials to a server action that
 * validates them and stores `email|password` in an HttpOnly cookie scoped to
 * /detr. Both halves are re-validated on every request.
 */
export const DETR_ACCESS_COOKIE = "sefaris_detr_access";

const DETR_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

/**
 * Default allowlist; override/extend without a deploy via the
 * DETR_ALLOWED_EMAILS env var (comma-separated, replaces this list).
 */
const DETR_DEFAULT_ALLOWED_EMAILS = [
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

/**
 * Reads the DETR board password (empty string if not configured).
 * No fallback: the board is gated solely by ADMIN_QASS_DETR.
 */
function getDetrPassword(): string {
  return process.env.ADMIN_QASS_DETR?.trim() ?? "";
}

/** Normalized (lowercase) e-mail allowlist for the DETR board. */
function getDetrAllowedEmails(): string[] {
  const raw = process.env.DETR_ALLOWED_EMAILS?.trim();
  const list = raw ? raw.split(",") : DETR_DEFAULT_ALLOWED_EMAILS;
  return list.map((email) => email.trim().toLowerCase()).filter(Boolean);
}

/**
 * Returns the signed-in DETR e-mail, or null when the session is invalid.
 * The cookie stores `email|password`; both halves are re-validated on every
 * request, so a password change or allowlist removal revokes the session.
 * Fails CLOSED: without a configured password nobody gets in.
 */
export async function getDetrSessionEmail(): Promise<string | null> {
  const password = getDetrPassword();
  if (!password) return null;
  const cookieStore = await cookies();
  const value = cookieStore.get(DETR_ACCESS_COOKIE)?.value ?? "";
  const separator = value.lastIndexOf("|");
  if (separator < 0) return null;
  const email = value.slice(0, separator).trim().toLowerCase();
  const candidate = value.slice(separator + 1);
  if (candidate !== password) return null;
  if (!getDetrAllowedEmails().includes(email)) return null;
  return email;
}

/** True when the current request carries a valid `/detr` session cookie. */
export async function isDetrAuthenticated(): Promise<boolean> {
  return (await getDetrSessionEmail()) !== null;
}

/**
 * Validates the supplied e-mail (against the allowlist) and password and,
 * when both are correct, persists them in an HttpOnly cookie scoped to
 * /detr. Returns whether sign-in succeeded.
 */
export async function signInDetr(
  email: string,
  candidate: string
): Promise<boolean> {
  const password = getDetrPassword();
  // Fail closed: without a configured password no sign-in is possible.
  if (!password) return false;
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail) return false;
  if (!getDetrAllowedEmails().includes(normalizedEmail)) return false;
  if (candidate.trim() !== password) return false;

  const cookieStore = await cookies();
  cookieStore.set(DETR_ACCESS_COOKIE, `${normalizedEmail}|${password}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/detr",
    maxAge: DETR_COOKIE_MAX_AGE_SECONDS
  });

  return true;
}

/**
 * Clears the `/detr` session cookie (sign out). Expires it with the exact
 * attributes used at sign-in: a plain deletion Set-Cookie carries no
 * Secure/HttpOnly/SameSite flags, and browsers can refuse to drop a Secure
 * cookie (set in production over HTTPS) without attribute parity.
 */
export async function signOutDetr(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(DETR_ACCESS_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/detr",
    maxAge: 0
  });
}
