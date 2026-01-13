import { createSelector, createSlice } from "@reduxjs/toolkit";
import { selectColumns } from "../column/columnsSlice";

const initialState = {
  activeBoardId: "b1",
  boards: {
    entities: {},
  },
};
export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
});

export default boardSlice.reducer;
export const selectActiveBoardId = (state) => state.boards.activeBoardId;
const selectBoards = (state) => state.boards.entities;

export const selectActiveBoard = createSelector(
  [selectActiveBoardId, selectBoards],
  (activeBoardId, boards) => {
    if (!activeBoardId) {
      return null;
    }

    return boards[activeBoardId];
  }
);

export const selectAllBoards = createSelector(
  [selectBoards],function(boards){
    const b = [];
    if(!boards) return [];
    for(const prop in boards){
      b.push(boards[prop])
    }
    return b;
  }
)

export const selectActiveBoardColumns = createSelector(
  [selectActiveBoard, selectColumns],function(board, columns){
    if(!board) return []
    const colIds = board.columnIds;
    return colIds.map(colId => columns[colId])
  }
)