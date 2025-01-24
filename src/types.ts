export interface Task {
    id: number;
    text: string;
    completed: boolean;
    important: boolean;
    dueDate?: string;
    assignedTo?: string;
    steps?: { id: number; text: string; completed: boolean; }[];
    reminder?: string;
    repeat?: string;
    createdAt: string;
  }