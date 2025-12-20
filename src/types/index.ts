export interface Board {
  id: string;
  title: string;
  columns: BoardColumn[];
}

export interface BoardColumn {
  id: string;
  title: string;
  tasks: Task[];
  boardId: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  subTasks: SubTasks[];
}

export interface SubTasks {
  id: string;
  text: string;
  completed: boolean;
  taskId: string;
}
