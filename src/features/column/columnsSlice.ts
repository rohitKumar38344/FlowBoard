import { createSlice } from "@reduxjs/toolkit";
import type { Column } from "../../types";
import type { RootState } from "../../store/store";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface columnState {
  columns: Column[];
}

const initialState: columnState = {
  columns: [],
}

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    addColumn: (state, action: PayloadAction<Column>) => {
      state.columns.push({
        ...action.payload
      })
    },
    // remove: (state, action: PayloadAction<Partial<Column>>) =>{
    //   state.filter(
    //     (c) =>
    //       c.id !== action.payload.id && c.boardId === action.payload.boardId
    //   )
    // }
  },
});
// export default function columnsReducer(state = columns, action) {
//   switch (action.type) {
//     case "column/columnAdded":
//       return [
//         ...state,
//         {
//           id: nextId(state),
//           title: action.payload.title,
//           tasks: [],
//           boardId: action.payload.boardId,
//         },
//       ];
//     case "column/columnDeleted":
//       return state.filter(
//         (c) =>
//           c.id !== action.payload.id && c.boardId === action.payload.boardId
//       );
//     case "column/columnUpdated":
//       return state.map((c) => {
//         if (
//           c.id === action.payload.id &&
//           c.boardId === action.payload.boardId
//         ) {
//           return {
//             ...c,
//             title: action.payload.title,
//           };
//         }
//         return c;
//       });
//   }
// }

// const actions = [
//   {
//     type: "column/columnAdded",
//     payload: {
//       title: "test",
//       boardId: 0,
//     },
//   },
//   {
//     type: "column/columnDeleted",
//     payload: {
//       id: 0,
//       boardId: 0,
//     },
//   },
//   {
//     type: "column/columnUpdated",
//     payload: {
//       title: "rtl",
//       boardId: 0,
//       id: 1,
//     },
//   },
// ];
export const {addColumn} = columnsSlice.actions;
export default columnsSlice.reducer;
export const selectColumns = (state: RootState) => state.columns.columns;

export const selectColumnsByActiveBoard = function (state: RootState) {
  return (activeBoard: string | null) => {
    if(!activeBoard) return 
    return state.columns.columns.filter(col => col.boardId === activeBoard)
  };
};
