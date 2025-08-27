import { deleteTask } from "~/.server/tasks";
import type { Route } from "../+types/root";
import { redirect } from "react-router";

export async function action({ params }: Route.ActionArgs) {
  if (!params.id) return null;

  await deleteTask(parseInt(params?.id));
  return redirect("/");
}
