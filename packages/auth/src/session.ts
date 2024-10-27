import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

export type SessionValidationResult =
    | { sessionId: string; session: Session }
    | { sessionId: null; session: null };

export type Session = {
    userId: number,
    expiresAt: Date | string
}

export class SessionStore {
    constructor(private kv: KVNamespace) { }

    async createSession(userId: number): Promise<{ sessionId: string; session: Session, sessionToken: string }> {
        const sessionToken = this.generateSessionToken();
        const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(sessionToken)));
        const session: Session = {
            userId,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 days
        };

        await this.kv.put(
            sessionId,
            JSON.stringify(session),
            { expirationTtl: 30 * 24 * 60 * 60 } // 30 days in seconds
        );

        return { sessionId, session, sessionToken };
    }

    async validateSessionToken(sessionToken: string): Promise<SessionValidationResult> {
        const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(sessionToken)));
        const value = await this.kv.get(sessionId)
        if (!value) {
            return { sessionId: null, session: null };
        }

        const result = JSON.parse(value) as Session
        const session = {
            userId: result.userId,
            expiresAt: result.expiresAt
        }

        if (Date.now() >= new Date(session.expiresAt).getTime() - 1000 * 60 * 60 * 24 * 15) {
            session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
            await this.kv.put(sessionId, JSON.stringify(session), { expirationTtl: 1000 * 60 * 60 * 24 * 30 })
        }

        return { sessionId, session };
    }

    async deleteSession(sessionId: string): Promise<void> {
        await this.kv.delete(sessionId);
    }

    private generateSessionToken(): string {
        const bytes = new Uint8Array(20);
        crypto.getRandomValues(bytes);
        const token = encodeBase32LowerCaseNoPadding(bytes);
        return token;
    }
}

export function initializeSessionStore(kv: KVNamespace): SessionStore {
    return new SessionStore(kv);
}