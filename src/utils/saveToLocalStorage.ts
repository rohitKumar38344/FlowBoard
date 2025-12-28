import type { RootState } from "../store/store";

export const saveKanbanData = function (state: RootState) {
  const data = JSON.stringify(state);
  localStorage.setItem("kanban-data", data);
};

export const getKanbanData = function (){
  const data = localStorage.getItem("kanban-data");
  if (!data) return;
  return JSON.parse(data);
};
