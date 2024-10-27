import { Google } from "arctic";

export const createGoogleProvider = (GOOGLE_CLIENT_ID: string, GOOGLE_CLIENT_SECRET: string, urlOrigin: string) => {
    return new Google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, new URL("/login/google/callback", urlOrigin).toString());
}