import { redirect } from "react-router";
import type { Route } from "../+types/root";
import TaskForm from "~/components/taskForm";
import type { Task } from "~/types/task";
import { createTask } from "~/.server/tasks";
import dayjs from "dayjs";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const dueDateRaw = formData.get("dueDate")?.toString();

  if (!title) return "Title is required";

  const dueDate = dayjs(dueDateRaw).format("YYYY-MM-DDTHH:mm:ss");

  const newTask: Task = {
    title,
    description,
    status: "pending",
    dueDate,
  };

  await createTask(newTask);

  return redirect("/");
}

const Create = ({ actionData }: Route.ComponentProps) => {
  return <TaskForm error={actionData as string | undefined} />;
};

export default Create;
