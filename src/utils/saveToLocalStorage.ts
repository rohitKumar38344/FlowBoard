import type { Board, Column, Task, Subtask } from "../types";

export type KanbanStateShape = {
  boards: Board[];
  columns: Column[];
  tasks: Task[];
  subtasks: Subtask[];
};

export const saveKanbanData = function (state: KanbanStateShape) {
  const data = JSON.stringify(state);
  localStorage.setItem("kanban-data", data);
};

export const getKanbanData = function (): KanbanStateShape {
  try {
    const data = localStorage.getItem("kanban-data");
    if (!data) {
      return { boards: [], columns: [], tasks: [], subtasks: [] };
    }
    return JSON.parse(data) as KanbanStateShape;
  } catch (error) {
    console.error("Error loading data:", error);
    return { boards: [], columns: [], tasks: [], subtasks: [] };
  }
};
