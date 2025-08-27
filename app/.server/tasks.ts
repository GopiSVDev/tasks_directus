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

async function getAccessToken(request: Request) {
  const { session } = await getUserSession(request);
  if (!session) throw new Error("Not logged in");

  const accessToken = session.get("accessToken");
  if (!accessToken) throw new Error("Not logged in");

  authClient.setToken(accessToken);
  return accessToken;
}

async function getCurrentUser() {
  try {
    return await authClient.request(readMe());
  } catch (err) {
    throw new Error("Failed to fetch current user.");
  }
}

export async function fetchTasks(request: Request) {
  await getAccessToken(request);

  const currentUser = await getCurrentUser();
  try {
    return await authClient.request(
      readItems("tasks", { filter: { userId: { _eq: currentUser.id } } })
    );
  } catch (err) {
    console.error("Failed to fetch tasks", err);
    throw new Error("An error occurred while fetching tasks.");
  }
}

export async function getTaskById(id: number) {
  try {
    return await authClient.request(readItem("tasks", id));
  } catch (err) {
    console.error(`Failed to fetch task with ID ${id}`, err);
    throw new Error("An error occurred while fetching the task.");
  }
}

export async function createTask(task: Task) {
  const currentUser = await getCurrentUser();

  try {
    await authClient.request(
      createItem("tasks", { ...task, userId: currentUser.id })
    );
  } catch (err) {
    console.error("Failed to create task", err);
    throw new Error("An error occurred while creating the task.");
  }
}

export async function updateTask(id: number, updatedTask: Partial<Task>) {
  try {
    await authClient.request(updateItem("tasks", id, updatedTask));
  } catch (err) {
    console.error("Failed to update task", err);
    throw new Error("An error occurred while updating the task.");
  }
}

export async function deleteTask(id: number) {
  try {
    await authClient.request(deleteItem("tasks", id));
  } catch (err) {
    console.error("Failed to delete task", err);
    throw new Error("An error occurred while deleting the task.");
  }
}
