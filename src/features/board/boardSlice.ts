import { createSlice } from "@reduxjs/toolkit";
import type { Board } from "../../types/index.ts";
import type { RootState } from "../../store/store.ts";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BoardState {
  boards: Board[],
  activeBoardId: null | string,
}

const initialState: BoardState = {
  boards: [],
  activeBoardId: null,
}

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<Board>) => {
      console.log('state', state)
      state.boards.push({
        ...action.payload,
      });
      // state.activeBoardId = action.payload.id
    },
    activeBoard: (state, action: PayloadAction<string>) => {
      state.activeBoardId = action.payload;
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

export const { addBoard, activeBoard } = boardSlice.actions;
export default boardSlice.reducer;

export const selectBoards = (state: RootState) => state.boards.boards;
export const selectActiveBoard = (state: RootState) => state.boards.activeBoardId;