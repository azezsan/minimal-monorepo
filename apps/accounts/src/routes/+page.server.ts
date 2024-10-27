import { eq, usersTable } from '@acme/db';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
    if (!event.locals.session) {
        redirect(302, "/login");
    }

    return {
        user: await event.locals.db.select().from(usersTable).where(eq(usersTable.id, event.locals.session?.userId)).get()
    }
};