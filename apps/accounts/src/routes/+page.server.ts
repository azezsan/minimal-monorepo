import { redirect } from '@sveltejs/kit';
import { api } from '@acme/rpc';

export const load = async (event) => {
    if (!event.locals.session) {
        redirect(302, "/login");
    }

    return {
        user: await api.users[':id'].$get({ param: { id: event.locals.session.userId.toString() } }).then((r) => r.json()),
    }
};