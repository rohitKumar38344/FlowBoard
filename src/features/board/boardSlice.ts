import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Board } from "../../types/index.ts";

const initialState: Board[] = [
  {
    id: crypto.randomUUID(),
    title: "use of mind",
    columns: [],
  },
];

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    add: (state, action) => {
      state.push({
        id: crypto.randomUUID(),
        title: action.payload.title,
        columns: [],
      });
    },
    remove: (state, action) => {
      state.filter((c) => c.id !== action.payload.boardId);
    },
    update: (state, action: PayloadAction<Partial<Board>>) => {
      state.map((c) => {
        if (c.id === action.payload.id) {
          return {
            ...c,
            title: action.payload.title,
          };
        }
        return c;
      });
    },
  },
});

export const { add, remove, update } = boardSlice.actions;
export default boardSlice.reducer;
