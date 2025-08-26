import { client } from "./directus";
import { readItems, withToken } from "@directus/sdk";
import { getUserSession } from "./session";

export async function fetchTasks(request: Request) {
  const { session, loggedIn } = await getUserSession(request);
  const accessToken = session.get("accessToken");

  if (!loggedIn || !accessToken) throw new Error("Not logged in");

  return client.request(withToken(accessToken, readItems("tasks")));
}
