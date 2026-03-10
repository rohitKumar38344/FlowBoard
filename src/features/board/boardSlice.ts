import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeBoardId: "b1",
    entities: {},
};
export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
});

export default boardSlice.reducer;
export const selectActiveBoardId = (state) => {
  return state.boards.activeBoardId
};
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

// export const selectColumnsForActiveBoard = createSelector(
//   [selectActiveBoard, selectColumns],function(board, columns){
//     if(!board) return []
//     const colIds = board.columnIds;
//     return colIds.map(colId => columns[colId]).filter(Boolean)// to hadnle partially updated state
//   }
// )