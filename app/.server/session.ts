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

async function refreshTokenIfNeeded(session: any) {
  const accessToken = session.get("accessToken");
  const refreshToken = session.get("refreshToken");
  const expiresAt = session.get("expiresAt");

  const tokenExpired = !expiresAt || Date.now() > expiresAt - 5000;

  if (accessToken && refreshToken && tokenExpired) {
    console.log("Token expired. Refreshing...");

    try {
      const refreshed = await authClient.refresh({
        refresh_token: refreshToken,
      });

      const newAccessToken = refreshed.access_token ?? "";
      const newRefreshToken = refreshed.refresh_token ?? refreshToken;
      const newExpiresAt = Date.now() + (refreshed.expires ?? 0);

      session.set("accessToken", newAccessToken);
      session.set("refreshToken", newRefreshToken);
      session.set("expiresAt", newExpiresAt);

      console.log("Token refreshed:", newAccessToken);

      return { session, loggedIn: true };
    } catch (error) {
      console.log("Refresh failed. Logging out.");

      await destroySession(session);
      return { session: null, loggedIn: false };
    }
  }

  return { session, loggedIn: !!accessToken };
}

async function getUserSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  const { session: updatedSession, loggedIn } =
    await refreshTokenIfNeeded(session);

  const headers: HeadersInit = {};
  if (updatedSession) {
    headers["Set-Cookie"] = await commitSession(updatedSession);
  }

  return {
    session: updatedSession,
    loggedIn,
    headers,
  };
}

export { getSession, commitSession, destroySession, getUserSession };
