export interface Board {
  id: string;
  title: string;
  isActive: boolean;
}

export interface Column {
  id: string;
  title: string;
  boardId: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  columndId: string;
}

export interface Subtask {
  id: string;
  text: string;
  completed: boolean;
  taskId: string;
}
