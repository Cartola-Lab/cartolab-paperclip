import { randomUUID } from "node:crypto";

const TOKEN_TTL_MS = 5 * 60 * 1_000; // 5 minutes
const CLEANUP_INTERVAL_MS = 10 * 60 * 1_000; // 10 minutes

interface TokenEntry {
  userId: string;
  companyId: string;
  createdAt: Date;
  expiresAt: Date;
}

const tokens = new Map<string, TokenEntry>();

const cleanupTimer = setInterval(() => {
  cleanup();
}, CLEANUP_INTERVAL_MS);
cleanupTimer.unref?.();

export function generate(userId: string, companyId: string): { token: string; expiresAt: Date } {
  const token = randomUUID();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + TOKEN_TTL_MS);
  tokens.set(token, { userId, companyId, createdAt: now, expiresAt });
  return { token, expiresAt };
}

export function validate(
  token: string,
): { valid: true; userId: string; companyId: string } | { valid: false } {
  const entry = tokens.get(token);
  if (!entry) {
    return { valid: false };
  }
  if (entry.expiresAt < new Date()) {
    tokens.delete(token);
    return { valid: false };
  }
  tokens.delete(token); // one-time use
  return { valid: true, userId: entry.userId, companyId: entry.companyId };
}

export function cleanup(): void {
  const now = new Date();
  for (const [token, entry] of tokens) {
    if (entry.expiresAt < now) {
      tokens.delete(token);
    }
  }
}

export const studioTokenService = { generate, validate, cleanup };
