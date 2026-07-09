import { AdminLogin } from "@/app/admin/_components/admin-login";
import { DetrBoard } from "@/app/admin/_components/detr-board";
import { getAdminEmail } from "@/app/admin/_actions";

export const metadata = {
  title: "Sefaris admin",
  robots: { index: false, follow: false }
};

export const dynamic = "force-dynamic";

interface AdminPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

/**
 * /admin — premium Supabase-auth gate + task board.
 *
 * - Not signed in (or email not allowlisted) → premium login.
 * - Signed-in allowed admin → renders the board (Güncellemeler first,
 *   then the task list) directly under /admin.
 */
export default async function AdminPage({ searchParams }: AdminPageProps) {
  const email = await getAdminEmail();

  if (!email) {
    return <AdminLogin />;
  }

  const params = searchParams ? await searchParams : {};
  return <DetrBoard sessionEmail={email} searchParams={params} />;
}
