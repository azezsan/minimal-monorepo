import { dev } from "$app/environment";
import type { RequestEvent } from "@sveltejs/kit";

export const sessionCookieName = 'auth-session';

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
    event.cookies.set(sessionCookieName, token, {
        httpOnly: true,
        sameSite: "lax",
        expires: expiresAt,
        path: "/",
        secure: !dev
    });
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
    event.cookies.delete(sessionCookieName, { path: '/' });
}