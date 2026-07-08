import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { isValidEmail, normalizeEmail } from "@/lib/validateEmail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Where subscribers are persisted. In Coolify, mount a persistent volume at /data.
const SUBSCRIBERS_PATH =
  process.env.SUBSCRIBERS_PATH || path.join(process.cwd(), "data", "subscribers.json");

type Subscriber = { email: string; ts: string };

async function readSubscribers(): Promise<Subscriber[]> {
  try {
    const raw = await fs.readFile(SUBSCRIBERS_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Missing file or invalid JSON -> start fresh.
    return [];
  }
}

async function writeSubscribers(list: Subscriber[]): Promise<void> {
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

  try {
    const list = await readSubscribers();
    if (list.some((s) => s.email === normalized)) {
      // Idempotent success — don't leak that the email already exists as an error.
      return NextResponse.json({ success: true, already: true });
    }
    list.push({ email: normalized, ts: new Date().toISOString() });
    await writeSubscribers(list);
    return NextResponse.json({ success: true });
  } catch (err) {
    // Fail-soft: never lose the signup silently — log it, still confirm to the user.
    console.error("[subscribe] persistence failed:", err);
    console.info("[subscribe] captured (unpersisted):", normalized);
    return NextResponse.json({ success: true, degraded: true });
  }
}
