import { deleteTodo } from "~/.server/tasks";
import type { Route } from "../+types/root";
import { redirect } from "react-router";

export async function action({ params }: Route.ActionArgs) {
  if (!params.id) return null;

  await deleteTodo(parseInt(params?.id));
  return redirect("/");
}
