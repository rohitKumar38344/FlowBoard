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
export const selectColumnTasksByActiveBoard = createSelector(
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
// All tasks of a board
/*
[
    {
        "id": "t1",
        "title": "Introduction to store",
        "description": "In the previous section, we created a root reducer using combineReducers",
        "columnId": "c1",
        "subtaskIds": [
            "s1"
        ]
    },
    {
        "id": "t2",
        "title": "Creating store",
        "description": "Every Redux store has a single root reducer function.",
        "columnId": "c2",
        "subtaskIds": [
            "s2"
        ]
    },
]
*/
// All Columns of a active board
/*
[
    {
        "id": "c1",
        "title": "Todo",
        "boardId": "b1",
        "taskIds": [
            "t1"
        ]
    },
    {
        "id": "c2",
        "title": "Doing",
        "boardId": "b1",
        "taskIds": [
            "t2"
        ]
    },
]
*/