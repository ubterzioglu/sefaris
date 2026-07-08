import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { isValidEmail, normalizeEmail } from "@/lib/validateEmail";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// File fallback used only when Supabase env vars are absent (local/dev).
const SUBSCRIBERS_PATH =
  process.env.SUBSCRIBERS_PATH ||
  path.join(process.cwd(), "data", "subscribers.json");

type Subscriber = { email: string; ts: string };

async function persistToFile(email: string): Promise<void> {
  let list: Subscriber[] = [];
  try {
    const raw = await fs.readFile(SUBSCRIBERS_PATH, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) list = parsed;
  } catch {
    // missing/invalid -> start fresh
  }
  if (list.some((s) => s.email === email)) return;
  list.push({ email, ts: new Date().toISOString() });
  await fs.mkdir(path.dirname(SUBSCRIBERS_PATH), { recursive: true });
  await fs.writeFile(SUBSCRIBERS_PATH, JSON.stringify(list, null, 2), "utf8");
}

export async function POST(request: Request) {
  let email: unknown;
  try {
    const body = await request.json();
    email = body?.email;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (typeof email !== "string" || !isValidEmail(email)) {
    return NextResponse.json(
      { success: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const normalized = normalizeEmail(email);
  const supabase = getSupabaseAdmin();

  // Primary path: Supabase.
  if (supabase) {
    const { error } = await supabase
      .from("subscribers")
      .insert({ email: normalized, source: "coming-soon" });

    if (!error) {
      return NextResponse.json({ success: true });
    }

    // 23505 = unique_violation -> already subscribed, treat as success.
    if (error.code === "23505") {
      return NextResponse.json({ success: true, already: true });
    }

    // Unexpected DB error: log and fall through to file fallback so we
    // never lose a signup.
    console.error("[subscribe] supabase insert failed:", error.message);
  }

  // Fallback path: file store.
  try {
    await persistToFile(normalized);
    return NextResponse.json({ success: true, degraded: !supabase });
  } catch (err) {
    console.error("[subscribe] file persistence failed:", err);
    console.info("[subscribe] captured (unpersisted):", normalized);
    return NextResponse.json({ success: true, degraded: true });
  }
}
