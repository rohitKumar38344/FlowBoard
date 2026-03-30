import type { RootState } from "@/app/store/store";
import {
  createEntityAdapter,
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { selectActiveBoardId } from "../board/boardSlice";
import type { Column, Task } from "@/types";
import { taskCreated } from "../task/tasksSlice";

const columnsAdapter = createEntityAdapter<Column>();

export const columnsSlice = createSlice({
  name: "columns",
  initialState: columnsAdapter.getInitialState({
    ids: ["c1", "c2", "c3", "c4"],
    entities: {
      c1: { id: "c1", boardId: "b1", title: "Todo", taskIds: ["t1", "t2"] },
      c2: { id: "c2", boardId: "b1", title: "Doing", taskIds: ["t3"] },
      c3: { id: "c3", boardId: "b1", title: "Done", taskIds: ["t4"] },
      c4: { id: "c4", boardId: "b2", title: "Urgent", taskIds: ["t5"] },
    },
  }),
  reducers: {
    columnsAdded: columnsAdapter.addMany,
    taskMoved: (state, action: PayloadAction<{taskId: string, sourceColId: string, targetColId: string}>) => {
      const {taskId, sourceColId, targetColId} = action.payload
      const sourceCol = state.entities[sourceColId]
      sourceCol?.taskIds.splice(sourceCol.taskIds.indexOf(taskId), 1)
      const targetCol = state.entities[targetColId]
      targetCol?.taskIds.push(taskId)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(taskCreated, (state, action: PayloadAction<Task>) => {
      const column = state.entities[action.payload.columnId];

      if (column) {
        column.taskIds.push(action.payload.id);
      }
    });
  },
});

export const selectColumnsEntities = (state: RootState) =>
  state.columns.entities;

export const selectColumnsByActiveBoard = createSelector(
  [selectActiveBoardId, selectColumnsEntities],
  (activeBoardId, entites) => {
    console.log("activeboardid", activeBoardId);
    if (!activeBoardId) {
      return [];
    }
    const cols = Object.values(entites).filter(
      (entity) => entity.boardId === activeBoardId,
    );

    return cols;
  },
);
export const {selectById: selectColumnById} = columnsAdapter.getSelectors((state: RootState) => state.columns);
export const { columnsAdded, taskMoved } = columnsSlice.actions;
export default columnsSlice.reducer;
