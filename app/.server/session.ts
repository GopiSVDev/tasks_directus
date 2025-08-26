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

  if (!accessToken) {
    return { session, loggedIn: false };
  }

  const refreshToken = session.get("refreshToken");
  const expiresAt = session.get("expiresAt");

  let headers: Record<string, string> | undefined;

  if (refreshToken && (!expiresAt || Date.now() > expiresAt)) {
    try {
      const refreshed = await authClient.refresh({
        refresh_token: refreshToken,
      });

      session.set("accessToken", refreshed.access_token ?? "");
      session.set("refreshToken", refreshed.refresh_token ?? "");
      session.set("expiresAt", refreshed.expires_at ?? 0);
    } catch {
      await destroySession(session);
      return {
        session,
        loggedIn: false,
        headers: { "Set-Cookie": await commitSession(session) },
      };
    }
  }

  headers = { "Set-Cookie": await commitSession(session) };
  return { session, loggedIn: true, headers };
}

export { getSession, commitSession, destroySession, getUserSession };
