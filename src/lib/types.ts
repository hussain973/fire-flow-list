
export type TaskCategory = string;
export type TaskPriority = "Low" | "Medium" | "High";

export interface Task {
  id: string;
  text: string;
  description?: string;
  category: TaskCategory;
  priority: TaskPriority;
  completed: boolean;
  createdAt: Date;
  date?: Date;
  time?: string;
}
