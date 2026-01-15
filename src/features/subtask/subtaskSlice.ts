import { createSlice } from "@reduxjs/toolkit";
import type { Subtask } from "../../types/index.js";
import type { RootState } from "../../store/store.js";

// export interface SubtaskState {
//   subtasks: Subtask[],
//   taskId: string | null,
// }

// const initialState: SubtaskState = {
//   subtasks: [],
//   taskId: null,
// }
const initialState = {
  entities: {}
}

export const subtaskSlice = createSlice({
  name: "subtask",
  initialState,
  reducers: {},
});

export default subtaskSlice.reducer;

export const selectSubtasks = (state: RootState) => state.subtasks.entities;

/*
[
    "Todo",
    [
        {
            "id": "t1",
            "title": "Introduction to store",
            "description": "In the previous section, we created a root reducer using combineReducers",
            "columnId": "c1",
            "subtaskIds": [
                "s1"
            ]
        }
    ]
]
*/