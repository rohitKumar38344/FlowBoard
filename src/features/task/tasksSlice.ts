import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { Task } from "../../types";
import type { RootState } from "../../store/store";
import { selectActiveBoard, selectColumnsForActiveBoard } from "../board/boardSlice";

const initialState = {
  entities: {}
}
export const tasksSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {}
});

export default tasksSlice.reducer;
export const selectTasks = (state) => state.tasks.entities;
export const selectTasksByColumnId = createSelector(
  [selectColumnsForActiveBoard, selectTasks],
  function(columns, tasks){
    if(!columns) return []
    const map = new Map();
    console.log('columns',columns)
    for(let i=0; i<columns.length; i++){
      const col = columns[i];
      const taskIds = col.taskIds;
      map.set(col.title, [])
      taskIds.forEach(taskId => {
        map.get(col.title).push(tasks[taskId])
        
      })
    }
    // console.log('map',map)
    return map;
  }
)
/**
  
 
 */