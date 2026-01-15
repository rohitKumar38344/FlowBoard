import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { Task } from "../../types";
import type { RootState } from "../../store/store";
import { selectColumnsByActiveBoardId } from "../column/columnsSlice";

const initialState = {
  entities: {},
};
export const tasksSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
});

export default tasksSlice.reducer;
export const selectTasks = (state) => state.tasks.entities;
export const selectTasksByColumnId = createSelector(
  [selectColumnsByActiveBoardId, selectTasks],
  function(columns, tasks){
    if(!columns) return [];
    const t = [];
    for(const col of columns){
      const tId = col.taskIds;
      for(const id of tId){
        t.push(tasks[id]);
      }
    }
return t;
  }
)