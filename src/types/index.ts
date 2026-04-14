export interface Board {
  boardId: string;
  name: string;
  columnIds: string[];
}

export interface Column {
  columnId: string;
  title: string;
  boardId: string;
  taskIds: string[];
}

export interface Task {
  taskId: string;
  title: string;
  description: string;
  columnId: string;
  subtaskIds: string[];
}

export interface Subtask {
  subtaskId: string;
  title: string;
  done: boolean;
  taskId: string;
}

export interface DeletedColumnInfo {
  columnId: string;
  taskIds?: string[];
  subtaskIds?: string[];
}

export interface DeletedSubtaskInfo {
  subtaskIds: string[];
}

export interface BoardCreatePayload {
  board: {
    boardId: string; // being added
    name: string;
    columnIds: string[]; // being added
  };
  columns: Array<{
    columnId: string;
    title: string;
    boardId: string; // being added
    taskIds: string[];
  }>;
}
