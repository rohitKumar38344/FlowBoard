import { createSlice } from "@reduxjs/toolkit";
import type { Board } from "../../types/index.ts";
import type { RootState } from "../../store/store.ts";
import type{ PayloadAction } from "@reduxjs/toolkit";

const initialState: Board[] = [
  {
    id: "board1",
    title: "Prepare for Interviews",
    isActive: true,
    // columnIds: ["column1"],
  },
];

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
      add: (state, action: PayloadAction<string>) => {
        state.push({
          id: crypto.randomUUID(),
          title: action.payload,
          isActive: false,
        });
      },
    //   remove: (state, action) => {
    //     state.filter((c) => c.id !== action.payload.boardId);
    //   },
    //   update: (state, action: PayloadAction<Partial<Board>>) => {
    //     state.map((c) => {
    //       if (c.id === action.payload.id) {
    //         return {
    //           ...c,
    //           title: action.payload.title,
    //         };
    //       }
    //       return c;
    //     });
    //   },
  },
});

export const { add } = boardSlice.actions;
export default boardSlice.reducer;

export const selectBoards = (state: RootState) => state.boards;
export const selectActiveBoard = (state: RootState) => state.boards.find((b) => b.isActive)!
