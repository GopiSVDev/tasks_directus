import { authClient } from "./directus";
import {
  createItem,
  deleteItem,
  readItem,
  readItems,
  readMe,
  updateItem,
} from "@directus/sdk";
import { getUserSession } from "./session";
import type { Task } from "~/types/task";

export async function fetchTasks(request: Request) {
  const { session } = await getUserSession(request);
  const accessToken = session.get("accessToken");

  if (!accessToken) throw new Error("Not logged in");

  authClient.setToken(accessToken);

  const currentUser = await authClient.request(readMe());

  return authClient.request(
    readItems("tasks", {
      filter: { userId: { _eq: currentUser.id } },
    })
  );
}

export async function getTaskById(id: number) {
  try {
    const res = await authClient.request(readItem("tasks", id));
    return res;
  } catch (error) {
    console.error(`Failed to fetch task with ID ${id}:`, error);

    throw new Error("An error occurred while fetching the task.");
  }
}

export async function createTask(task: Task) {
  try {
    const currentUser = await authClient.request(readMe());

    const taskWithUser = { ...task, userId: currentUser.id };

    await authClient.request(createItem("tasks", taskWithUser));
  } catch (error) {
    console.error(`Failed to create task`, error);

    throw new Error("An error occurred while creating the task.");
  }
}

type TaskUpdate = Partial<Task>;

export async function updateTask(id: number, updatedTask: TaskUpdate) {
  try {
    await authClient.request(updateItem("tasks", id, updatedTask));
  } catch (error) {
    console.error(`Failed to create task`, error);

    throw new Error("An error occurred while updating the task.");
  }
}

export async function deleteTodo(id: number) {
  try {
    await authClient.request(deleteItem("tasks", id));
  } catch (error) {
    console.error(`Failed to delete task`, error);

    throw new Error("An error occurred while deleting the task.");
  }
}
