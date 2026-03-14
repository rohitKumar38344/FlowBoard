import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeBoardId: null,
  ids: [],
  entities: {},
};
export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addBoard: (state, action) => {
      const boardId = crypto.randomUUID();
      const nextColumns = action.payload.columns.map(col => {
        return {
          title: col.colName,
          id: crypto.randomUUID(),
          taskIds:[],
          boardId,
        }
      });
      const nextBoard = {
        id: boardId,
        name: action.payload.title,
        columnIds: nextColumns.map(col => col.id)
      }
      state.activeBoardId = boardId;
      state.ids.push(boardId)
      state.entities[state.ids] = nextBoard;
      // raw data
      // const b = {
      //   id: '#22323',
      //   title: "react",
      //   columns: [
      //     {
      //       colName: "Todo",
      //     },
      //     {
      //       colName: "Doing",
      //     },
      //   ],
      // };
    },
  },
});

export default boardSlice.reducer;

export const selectActiveBoardId = (state) => {
  return state.boards.activeBoardId;
};
const selectBoards = (state) => state.boards.entities;

export const selectActiveBoard = createSelector(
  [selectActiveBoardId, selectBoards],
  (activeBoardId, boards) => {
    if (!activeBoardId) {
      return null;
    }

    return boards[activeBoardId];
  },
);

export const selectAllBoards = createSelector(
  [selectBoards],
  function (boards) {
    const b = [];
    if (!boards) return [];
    for (const prop in boards) {
      b.push(boards[prop]);
    }
    return b;
  },
);

export const { addBoard } = boardSlice.actions;
