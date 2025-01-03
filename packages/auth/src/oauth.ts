import { Google } from "arctic";

interface Env {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
}

export const createGoogleProvider = (env: Env, urlOrigin: string) => {
  const GOOGLE_CLIENT_ID = env.GOOGLE_CLIENT_ID;
  if (!GOOGLE_CLIENT_ID) {
    throw new Error("Missing Google client ID");
  }
  const GOOGLE_CLIENT_SECRET = env.GOOGLE_CLIENT_SECRET;
  if (!GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing Google client secret");
  }
  return new Google(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    new URL("/login/google/callback", urlOrigin).toString(),
  );
};
