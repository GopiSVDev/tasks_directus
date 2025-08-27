import { createCookieSessionStorage } from "react-router";
import { authClient } from "./directus";

type SessionData = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      httpOnly: true,
      maxAge: 900000,
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"], // only for learning purpose
      secure: false,
    },
  });

async function getUserSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  const accessToken = session.get("accessToken");
  const expiresAt = session.get("expiresAt");

  const tokenExpired = !accessToken || !expiresAt || Date.now() > expiresAt;

  if (tokenExpired) {
    await destroySession(session);
    return {
      session: null,
      loggedIn: false,
      headers: { "Set-Cookie": await commitSession(session) },
    };
  }

  return {
    session,
    loggedIn: true,
    headers: { "Set-Cookie": await commitSession(session) },
  };
}

export { getSession, commitSession, destroySession, getUserSession };
