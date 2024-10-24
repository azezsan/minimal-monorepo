import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import type { KVNamespace } from "@cloudflare/workers-types";

export function generateSessionToken(): string {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    const token = encodeBase32LowerCaseNoPadding(bytes);
    return token;
}

export async function createSession(token: string, userId: number, kv: KVNamespace): Promise<{ sessionId: string, session: Session }> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const session: Session = {
        userId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    }
    await kv.put(sessionId, JSON.stringify(session), { expirationTtl: 1000 * 60 * 60 * 24 * 30 })
    return { sessionId, session };
}

export async function validateSessionToken(token: string, kv: KVNamespace): Promise<SessionValidationResult> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const value = await kv.get(sessionId)
    if (!value) {
        return { sessionId: null, session: null };
    }

    const result = JSON.parse(value) as Session
    const session = {
        userId: result.userId,
        expiresAt: result.expiresAt
    }

    if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
        session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
        await kv.put(sessionId, JSON.stringify(session), { expirationTtl: 1000 * 60 * 60 * 24 * 30 })
    }

    return { sessionId, session };
}

export async function invalidateSession(sessionId: string, kv: KVNamespace): Promise<void> {
    await kv.delete(sessionId)
}

export type SessionValidationResult =
    | { sessionId: string; session: Session }
    | { sessionId: null; session: null };

type Session = {
    userId: number,
    expiresAt: Date
}