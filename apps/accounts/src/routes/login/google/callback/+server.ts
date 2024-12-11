import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";
import { createGoogleProvider, initializeSessionStore, setSessionTokenCookie } from "@acme/auth";
import { usersTable, oauthAccountsTable, eq, sql, initializeD1 } from "@acme/db"
import { decodeIdToken } from "arctic"

import type { RequestEvent } from "@sveltejs/kit";
import type { OAuth2Tokens } from "arctic";
import type { DrizzleD1Database, schema } from "@acme/db";
import { customAlphabet } from "nanoid";
import { redirect } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {
    const code = event.url.searchParams.get("code");
    const state = event.url.searchParams.get("state");
    const storedState = event.cookies.get("google_oauth_state") ?? null;
    const codeVerifier = event.cookies.get("google_code_verifier") ?? null;
    if (!code || !state || !storedState || !codeVerifier || state !== storedState) {
        return new Response(null, {
            status: 400
        });
    }

    event.cookies.delete("google_oauth_state", { path: "/" });
    event.cookies.delete("google_code_verifier", { path: "/" });

    let tokens: OAuth2Tokens;
    const google = createGoogleProvider(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        event.url.origin
    )
    try {
        tokens = await google.validateAuthorizationCode(code, codeVerifier);
    } catch (e) {
        // Invalid code or client credentials
        return new Response(null, {
            status: 400
        });
    }

    const claims = decodeIdToken(tokens.idToken()) as GoogleUserClaims;

    // TODO: Replace this with your own DB query.
    const insertedUser = await upsertUser(claims, initializeD1(event.platform?.env.DB!));

    const sessionStore = initializeSessionStore(event.platform?.env.SESSIONS!)

    const { sessionToken, session } = await sessionStore.createSession(insertedUser[0][0].id);

    setSessionTokenCookie(event, sessionToken, new Date(session.expiresAt))

    redirect(302, "/");
}

const upsertUser = async (claims: GoogleUserClaims, db: DrizzleD1Database<typeof schema>) => {

    const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 12);

    const usersQuery = db.select({ id: usersTable.id }).from(usersTable).where(eq(usersTable.email, claims.email))

    return await db.batch([
        db.insert(usersTable).values({
            publicId: nanoid(),
            name: claims.name,
            email: claims.email
        }).onConflictDoUpdate({
            target: usersTable.email,
            set: { id: sql`id` }
        })
            .returning({ id: usersTable.id }),
        db.insert(oauthAccountsTable).values({
            providerId: "google",
            providerUserId: claims.sub,
            userId: sql`${usersQuery}`
        }).onConflictDoNothing()
    ])
}

interface GoogleUserClaims {
    iss: string;
    azp: string;
    aud: string;
    sub: string;
    email: string;
    email_verified: boolean;
    at_hash: string;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    iat: number;
    exp: number;
}