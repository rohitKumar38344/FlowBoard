import { createSlice } from "@reduxjs/toolkit";
import type { Board, Column } from "../../types";
import type { RootState } from "../../store/store";

const columns: Column[] = [
  {
    id: "column1",
    title: "todo",
    taskIds: ["task1"],
    boardId: "board1",
  },
  {
    id: "column2",
    title: "doing",
    taskIds: ["task1"],
    boardId: "board1",
  },
  {
    id: "column3",
    title: "done",
    taskIds: ["task1"],
    boardId: "board1",
  },
];

export const columnsSlice = createSlice({
  name: "columns",
  initialState: columns,
  reducers: {
    // add: (state, action: PayloadAction<Partial<Column>>) => {
    //   state.push({
    //     id: crypto.randomUUID(),
    //     title: action.payload.title!,
    //     tasks: [],
    //     boardId: 'alpha',
    //   })
    // },
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

export default columnsSlice.reducer;
export const selectColumns = (state: RootState) => state.columns;

export const selectColumnsByActiveBoard = function (state: RootState) {
  return (activeBoard: Board) => {
    return state.columns.filter(col => col.boardId === activeBoard.id)
  };
};
