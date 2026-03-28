import type { RootState } from "@/app/store/store";
import type { Task } from "@/types";
import { createEntityAdapter, createSlice, type PayloadAction } from "@reduxjs/toolkit";

const tasksAdapter = createEntityAdapter<Task>();

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksAdapter.getInitialState({
    ids: ["t1", "t2", "t3", "t4", "t5"],
    entities: {
      t1: {
        id: "t1",
        columnId: "c1",
        title: "Learn Redux Normalization",
        description: "Understand why flat state is better than nested state.",
        subtaskIds: ["s1", "s2"],
      },
      t2: {
        id: "t2",
        columnId: "c1",
        title: "Master CSS Grid",
        description: "Build a responsive dashboard layout.",
        subtaskIds: [],
      },
      t3: {
        id: "t3",
        columnId: "c2",
        title: "Refactor Kanban Store",
        description: "Implement createEntityAdapter for all slices.",
        subtaskIds: ["s3"],
      },
      t4: {
        id: "t4",
        columnId: "c3",
        title: "Update Resume",
        description: "Add the new Meta-level Redux skills.",
        subtaskIds: [],
      },
      t5: {
        id: "t5",
        columnId: "c4",
        title: "Buy Groceries",
        description: "Milk, eggs, and bread.",
        subtaskIds: [],
      },
    },
  }),
  reducers: {
    taskCreated: (state, action: PayloadAction<Task>) => {
      tasksAdapter.addOne(state, action.payload)
    },
  },
});

export default tasksSlice.reducer;

export const selectTaskEntites = (state: RootState) => state.tasks.entities;

export const {taskCreated} = tasksSlice.actions;