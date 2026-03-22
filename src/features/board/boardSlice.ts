import type { RootState } from "@/app/store/store";
import type { Board } from "@/types";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const boardsAdapter = createEntityAdapter<Board>();
export const boardSlice = createSlice({
  name: "boards",
  initialState: boardsAdapter.getInitialState({
    ids: ["b1", "b2"],
    activeBoardId: "b1",
    entities: {
      b1: {
        id: "b1",
        name: "Frontend Roadmap",
        columnIds: ["c1", "c2", "c3"],
      },
      b2: {
        id: "b2",
        name: "Personal Errands",
        columnIds: ["c4"],
      },
    },
  }),
  reducers: {},
});

export const selectAllBoards = (state: RootState) => state.boards;
export default boardSlice.reducer;
