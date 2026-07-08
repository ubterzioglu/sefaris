import { redirect } from "next/navigation";

import { AdminLogin } from "@/app/admin/_components/admin-login";
import { getAdminEmail, bridgeToDetrSession } from "@/app/admin/_actions";

export const metadata = {
  title: "Sefaris admin",
  robots: { index: false, follow: false }
};

export const dynamic = "force-dynamic";

/**
 * /admin — premium Supabase-auth gate.
 *
 * - Not signed in (or email not allowlisted) → premium login.
 * - Signed-in allowed admin → mint the DETR board session and hand off to
 *   /detr, which renders the full task board + updates.
 */
export default async function AdminPage() {
  const email = await getAdminEmail();

  if (!email) {
    return <AdminLogin />;
  }

  await bridgeToDetrSession();
  redirect("/detr");
}
