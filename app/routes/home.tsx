import Navbar from "~/components/navbar";
import type { Route } from "../+types/root";
import TaskList from "~/components/taskList";
import type { Task } from "~/types/task";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tasks App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const tasks: Task[] = [];

  return <TaskList tasks={tasks} />;
}
