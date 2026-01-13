export interface Board {
  id: string;
  name: string;
}

export interface Column {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  name: string;
  description: string;
}

export interface Subtask {
  id: string;
  text: string;
  status: boolean;
}
