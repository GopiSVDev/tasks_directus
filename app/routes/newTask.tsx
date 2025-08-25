import { redirect } from "react-router";
import type { Route } from "../+types/root";
import TaskForm from "~/components/taskForm";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const dueAtRaw = formData.get("dueAt")?.toString();

  if (!title) return "Title is required";
  if (!dueAtRaw) return "Due date is required";

  const dueAt = new Date(dueAtRaw);
  if (isNaN(dueAt.getTime())) {
    return "Invalid Due Date";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueAt);
  due.setHours(0, 0, 0, 0);

  if (due < today) {
    return "Due date must be today or later";
  }

  const newTask = {
    title,
    description,
    status: "pending",
    dueAt,
  };

  //   createTask(newTask);

  return redirect("/");
}

const newTask = ({ actionData }: Route.ComponentProps) => {
  return <TaskForm error={actionData as string | undefined} />;
};

export default newTask;
