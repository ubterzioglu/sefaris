// Pure, dependency-free email validation shared by the client form and API route.
// Intentionally pragmatic (not full RFC 5322) — good enough for a waitlist.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeEmail(input: string): string {
  return input.trim().toLowerCase();
}

export function isValidEmail(input: string): boolean {
  const email = normalizeEmail(input);
  if (email.length < 6 || email.length > 254) return false;
  return EMAIL_RE.test(email);
}
