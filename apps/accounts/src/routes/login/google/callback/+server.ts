import type { OAuth2Tokens } from "arctic";
import { redirect } from "@sveltejs/kit";
import { decodeIdToken } from "arctic";
import { customAlphabet } from "nanoid";

import type { LibSQLDatabase, schema } from "@acme/db";
import {
  createGoogleProvider,
  initializeSessionStore,
  setSessionTokenCookie,
} from "@acme/auth";
import {
  eq,
  initializeDB,
  oauthAccountsTable,
  sql,
  usersTable,
} from "@acme/db";

import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async (event) => {
  if (!event.platform) {
    return new Response(null, {
      status: 400,
    });
  }

  const code = event.url.searchParams.get("code");
  const state = event.url.searchParams.get("state");
  const storedState = event.cookies.get("google_oauth_state") ?? null;
  const codeVerifier = event.cookies.get("google_code_verifier") ?? null;
  if (
    !code ||
    !state ||
    !storedState ||
    !codeVerifier ||
    state !== storedState
  ) {
    return new Response(null, {
      status: 400,
    });
  }

  event.cookies.delete("google_oauth_state", { path: "/" });
  event.cookies.delete("google_code_verifier", { path: "/" });

  let tokens: OAuth2Tokens;
  const google = createGoogleProvider(event.platform.env, event.url.origin);

  try {
    tokens = await google.validateAuthorizationCode(code, codeVerifier);
  } catch {
    // Invalid code or client credentials
    return new Response(null, {
      status: 400,
    });
  }

  const claims = decodeIdToken(tokens.idToken()) as GoogleUserClaims;

  // TODO: Replace this with your own DB query.
  const insertedUser = await upsertUser(
    claims,
    initializeDB(event.platform.env),
  );

  const sessionStore = initializeSessionStore(event.platform.env.SESSIONS);

  const { sessionToken, session } = await sessionStore.createSession(
    insertedUser[0][0].id,
  );

  setSessionTokenCookie(event, sessionToken, new Date(session.expiresAt));

  redirect(302, "/");
};

const upsertUser = async (
  claims: GoogleUserClaims,
  db: LibSQLDatabase<typeof schema>,
) => {
  const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 12);

  const usersQuery = db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.email, claims.email));

  return await db.batch([
    db
      .insert(usersTable)
      .values({
        publicId: nanoid(),
        name: claims.name,
        email: claims.email,
      })
      .onConflictDoUpdate({
        target: usersTable.email,
        set: { id: sql`id` },
      })
      .returning({ id: usersTable.id }),
    db
      .insert(oauthAccountsTable)
      .values({
        providerId: "google",
        providerUserId: claims.sub,
        userId: sql`${usersQuery}`,
      })
      .onConflictDoNothing(),
  ]);
};

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
