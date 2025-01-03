import { redirect } from "@sveltejs/kit";
import { dev } from "$app/environment";
import { generateCodeVerifier, generateState } from "arctic";

import { createGoogleProvider } from "@acme/auth";

import type { RequestHandler } from "./$types";

export const GET: RequestHandler = (event) => {
  if (!event.platform) {
    return new Response(null, {
      status: 400,
    });
  }

  const google = createGoogleProvider(event.platform.env, event.url.origin);

  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = google.createAuthorizationURL(state, codeVerifier, [
    "openid",
    "profile",
    "email",
  ]);

  event.cookies.set("google_oauth_state", state, {
    path: "/",
    secure: !dev,
    httpOnly: true,
    maxAge: 60 * 10, // 10 minutes
    sameSite: "lax",
  });

  event.cookies.set("google_code_verifier", codeVerifier, {
    path: "/",
    secure: !dev,
    httpOnly: true,
    maxAge: 60 * 10, // 10 minutes
    sameSite: "lax",
  });

  redirect(302, url.toString());
};
