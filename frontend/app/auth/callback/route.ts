import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

/**
 * OAuth / email-confirmation callback. Exchanges the `code` for a session
 * cookie, then redirects to `next` (defaults to /admin).
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  let next = searchParams.get("next") ?? "/admin";
  if (!next.startsWith("/")) next = "/admin";

  if (code) {
    const supabase = await createSupabaseServer();
    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/admin?error=auth`);
}
