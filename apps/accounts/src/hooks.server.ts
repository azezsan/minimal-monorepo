import type { Handle } from '@sveltejs/kit';
import { i18n } from '$lib/i18n';
import { initializeD1 } from '@acme/db';
import { deleteSessionTokenCookie, initializeSessionStore, sessionCookieName, setSessionTokenCookie } from '@acme/auth';
import { sequence } from '@sveltejs/kit/hooks';

const handleParaglide: Handle = i18n.handle();

const handleAuth: Handle = async ({ event, resolve }) => {
    if (!event.platform) {
        return resolve(event);
    }

    event.locals.db = initializeD1(event.platform.env.DB)

    const sessionToken = event.cookies.get(sessionCookieName) ?? null;
    if (!sessionToken) {
        event.locals.session = null;
        return resolve(event);
    }

    const sessionStore = initializeSessionStore(event.platform?.env.sessions!)

    const { session } = await sessionStore.validateSessionToken(sessionToken);

    if (session !== null) {
        setSessionTokenCookie(event, sessionToken, new Date(session.expiresAt));
    } else {
        deleteSessionTokenCookie(event);
    }

    event.locals.session = session;
    return resolve(event);
};

export const handle: Handle = sequence(handleAuth, handleParaglide)