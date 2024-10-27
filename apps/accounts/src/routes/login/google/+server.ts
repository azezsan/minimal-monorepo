import { redirect } from "@sveltejs/kit";
import { generateState, generateCodeVerifier } from "arctic";
import { createGoogleProvider } from "@acme/auth";
import { dev } from "$app/environment";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";

export const GET = async (event) => {

    const google = createGoogleProvider(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        event.url.origin
    )

    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const url = google.createAuthorizationURL(state, codeVerifier, ["openid", "profile", "email"]);

    event.cookies.set("google_oauth_state", state, {
        path: "/",
        secure: !dev,
        httpOnly: true,
        maxAge: 60 * 10, // 10 minutes
        sameSite: "lax"
    })

    event.cookies.set("google_code_verifier", codeVerifier, {
        path: "/",
        secure: !dev,
        httpOnly: true,
        maxAge: 60 * 10, // 10 minutes
        sameSite: "lax"
    });

    redirect(302, url.toString());
};