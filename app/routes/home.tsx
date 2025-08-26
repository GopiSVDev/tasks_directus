import { fetchTasks } from "~/.server/tasks";
import type { Route } from "../+types/root";
import TaskList from "~/components/taskList";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tasks App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const tasks = await fetchTasks(request);

    return tasks;
  } catch (error) {
    console.log(error);
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const tasks = loaderData ?? [];

  return <TaskList tasks={tasks} />;
}
