export type Task = {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  status: TaskStatus;
  dueAt: Date;
};

type TaskStatus = "completed" | "pending";
