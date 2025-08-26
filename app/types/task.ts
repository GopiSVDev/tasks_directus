export type Task = {
  id: string;
  title: string;
  description?: string;
  date_created: Date;
  status: TaskStatus;
  dueAt: Date;
};

type TaskStatus = "completed" | "pending";
