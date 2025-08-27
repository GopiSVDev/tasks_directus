import { getTaskById, updateTask } from "~/.server/tasks";
import { redirect } from "react-router";
import type { Task } from "~/types/task";
import TaskForm from "~/components/taskForm";
import type { Route } from "../+types/root";
import { formatDateForInput } from "~/utils/helper";
import dayjs from "dayjs";

export async function loader({ params }: Route.LoaderArgs) {
  if (!params.id) return null;

  const task = getTaskById(parseInt(params?.id));
  return task || null;
}

export async function action({ request, params }: Route.ActionArgs) {
  if (!params.id) return null;

  const task = await getTaskById(parseInt(params?.id));
  if (!task) return "Task not found";

  const formData = await request.formData();
  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const dueDate = formData.get("dueDate")?.toString() || "";
  const status = formData.get("status")?.toString();

  if ((title === undefined || dueDate === undefined) && !status) {
    return "Invalid form submission";
  }

  const updatedTask = { ...task };

  if (title) updatedTask.title = title;
  if (description !== undefined) updatedTask.description = description;
  if (dueDate)
    updatedTask.dueDate = dayjs(dueDate).format("YYYY-MM-DDTHH:mm:ss");

  if (status) updatedTask.status = status as Task["status"];

  updateTask(parseInt(params?.id), updatedTask);

  return redirect("/");
}

const Edit = ({ loaderData }: Route.ComponentProps) => {
  const task: Task | undefined = loaderData ?? undefined;

  return <TaskForm task={task} />;
};

export default Edit;
