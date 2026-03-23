import type { RootState } from "@/app/store/store";
import type { Board } from "@/types";
import {
  createEntityAdapter,
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

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
  reducers: {
    boardSelected: (state, action: PayloadAction<string>) =>{
      state.activeBoardId = action.payload
    }
  },
});

export const selectActiveBoardId = (state: RootState) =>
  state.boards.activeBoardId ?? "";

export const selectBoardEntities = (state: RootState) => state.boards.entities;

export const selectActiveBoard = createSelector(
  [selectActiveBoardId, selectBoardEntities],
  (activeBoardId, entities) => {
    if (!activeBoardId) return null;
    return entities[activeBoardId] ?? null;
  },
);

export const selectActiveBoardColumnIds = createSelector([selectActiveBoard], (board) => {
  return board?.columnIds
})

export const selectAllBoards = createSelector(
  [selectBoardEntities],
  (entities) => Object.values(entities),
);

export default boardSlice.reducer;
