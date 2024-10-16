import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

export function generateSessionToken(): string {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    const token = encodeBase32LowerCaseNoPadding(bytes);
    return token;
}

export async function createSession(token: string, userId: number, kv: KVNamespace) {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    await kv.put(sessionId, userId.toString())
    return sessionId;
}

export async function validateSessionToken(token: string, kv: KVNamespace) {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const userId = await kv.get(sessionId)
    if (!userId) {
        return { session: null, user: null };
    }
    return { sessionId, userId: parseInt(userId) };
}

export async function invalidateSession(sessionId: string, kv: KVNamespace) {
    await kv.delete(sessionId)
}