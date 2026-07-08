"use server";

import { redirect } from "next/navigation";

import { signInDetr, signOutDetr } from "@/lib/detr-auth";

/**
 * DETR gate sign-in. Validates the e-mail against the allowlist and the
 * password against ADMIN_QASS_DETR, then stores both in an HttpOnly cookie,
 * so the todo board can be shared independently of the other admin keys.
 * Credentials never appear in the URL.
 */
export async function detrSignInAction(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "");
  const candidate = String(formData.get("access") ?? "");
  await signInDetr(email, candidate);
  redirect("/detr");
}

/**
 * Sign out of the DETR board and return to its gate.
 */
export async function detrSignOutAction(): Promise<void> {
  await signOutDetr();
  redirect("/detr");
}
