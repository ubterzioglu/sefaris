import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-side Supabase client using the service-role key.
// NEVER import this into a client component — the service-role key
// bypasses RLS and must stay on the server.

let cached: SupabaseClient | null = null;

/**
 * Returns a configured admin client, or null when Supabase env vars are
 * absent (so the app can fall back to file-based storage in local/dev).
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) return null;

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
