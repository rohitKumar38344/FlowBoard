export interface Board {
  id: string;
  name: string;
  columnIds: string[]
}

export interface Column {
  id: string;
  title: string;
  boardId: string;
  taskIds: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  columnId: string;
  subtaskIds: string[];
}

export interface Subtask {
  id: string;
  title: string;
  done: boolean;
  taskId: string;
}
