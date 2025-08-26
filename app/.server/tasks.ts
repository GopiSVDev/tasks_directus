import { authClient } from "./directus";
import { readItems, readMe, withToken } from "@directus/sdk";
import { getUserSession } from "./session";

export async function fetchTasks(request: Request) {
  const { session, loggedIn } = await getUserSession(request);
  const accessToken = session.get("accessToken");

  if (!loggedIn || !accessToken) throw new Error("Not logged in");

  authClient.setToken(accessToken);

  const currentUser = await authClient.request(readMe());

  return authClient.request(
    readItems("tasks", {
      filter: { userId: { _eq: currentUser.id } },
    })
  );
}
