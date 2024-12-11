import type { Handle } from '@sveltejs/kit';
import { i18n } from '$lib/i18n';
import { deleteSessionTokenCookie, initializeSessionStore, sessionCookieName, setSessionTokenCookie } from '@acme/auth';
import { sequence } from '@sveltejs/kit/hooks';
import { createEden } from '@acme/rpc';

const handleParaglide: Handle = i18n.handle();

const handleAuth: Handle = async ({ event, resolve }) => {
    if (!event.platform) {
        return resolve(event);
    }

    const sessionToken = event.cookies.get(sessionCookieName) ?? null;
    if (!sessionToken) {
        event.locals.session = null;
        return resolve(event);
    }

    const sessionStore = initializeSessionStore(event.platform?.env.SESSIONS!)

    const { session } = await sessionStore.validateSessionToken(sessionToken);

    if (session !== null) {
        setSessionTokenCookie(event, sessionToken, new Date(session.expiresAt));
    } else {
        deleteSessionTokenCookie(event);
    }

    event.locals.session = session;
    event.locals.api = createEden(event.platform.env.API_WORKER)
    return resolve(event);
};

export const handle: Handle = sequence(handleAuth, handleParaglide)