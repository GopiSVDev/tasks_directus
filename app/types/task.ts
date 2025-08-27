export type Task = {
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate: string;
};

export interface FullTask extends Task {
  id: number;
  date_created: string;
}

type TaskStatus = "completed" | "pending";
