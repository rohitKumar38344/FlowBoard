import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const subtasksAdapter = createEntityAdapter();

export const subtaskSlice = createSlice({
  name: "subtasks",
  initialState: subtasksAdapter.getInitialState({
    ids: ["s1", "s2", "s3"],
    entities: {
      s1: { id: "s1", taskId: "t1", title: "Read Redux Docs", done: true },
      s2: {
        id: "s2",
        taskId: "t1",
        title: "Watch Senior Review Video",
        done: false,
      },
      s3: { id: "s3", taskId: "t3", title: "Write Unit Tests", done: false },
    },
  }),
  reducers: {},
});

export default subtaskSlice.reducer;