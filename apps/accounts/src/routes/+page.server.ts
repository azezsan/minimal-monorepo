import { redirect, error as err } from '@sveltejs/kit';

export const load = async (event) => {
    if (!event.locals.session) {
        redirect(302, "/login");
    }

    return {
        user: await event.locals.api.users[event.locals.session.userId].get().then(
            ({ data, error }) => error ? err(error.status, error.message) : data
        )
    }
};