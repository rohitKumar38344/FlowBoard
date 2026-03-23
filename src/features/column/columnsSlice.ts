import type { RootState } from "@/app/store/store";
import {
  createEntityAdapter,

  createSelector,

  createSlice,
} from "@reduxjs/toolkit";
import { selectActiveBoard, selectActiveBoardColumnIds, selectBoardEntities } from "../board/boardSlice";


const columnsAdapter = createEntityAdapter();

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
  reducers: {},
});

export const selectColumnsEntities = (state: RootState) => state.columns.entities;

// export const selectAllColumnsFromActiveBoard = createSelector([selectActiveBoardColumnIds, selectBoardEntities], (columnIds, entites)=>{
//   return columnIds?.map(colId => entites[colId]).filter(Boolean);
// })


export default columnsSlice.reducer;
