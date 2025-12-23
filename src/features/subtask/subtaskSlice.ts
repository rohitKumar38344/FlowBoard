import { createSlice } from "@reduxjs/toolkit";
import type { Subtask } from "../../types/index.js";
import type { RootState } from "../../store/store.js";

const subtasks: Subtask[] = [
  {
    id: "subtask1",
    text: "Learn useEffect hook",
    completed: true,
    taskId: "task1",
  },
  {
    id: "subtask2",
    text: "Learn profiler tool",
    completed: false,
    taskId: "task1",
  },
];

export const subtaskSlice = createSlice({
  name: "subtask",
  initialState: subtasks,
  reducers: {},
});
// export default function subtaskReducer(state = initalState, action) {
//   switch (action.type) {
//     case "subtasks/subtaskAdded":
//       return {
//         ...state,
//         subtasks: [
//           ...state.subtasks,
//           {
//             id: nextId(state.subtasks),
//             text: action.payload.text,
//             completed: false,
//           },
//         ],
//       };
//     case "subtasks/subtaskDeleted":
//       return {
//         ...state,
//         subtasks: state.subtasks.filter(
//           (subtask) => subtask.id !== action.payload.id && action.payload.taskId
//         ),
//       };
//     case "subtasks/subtaskUpdated":
//       return {
//         ...state,
//         subtasks: state.subtasks.map(function (subtask) {
//           if (subtask.id === action.payload.id && action.payload.taskId) {
//             return {
//               ...subtask,
//               text: action.payload.text,
//             };
//           } else {
//             return subtask;
//           }
//         }),
//       };
//     case "subtasks/subtaskToggled":
//       return {
//         ...state,
//         subtasks: state.subtasks.map(function (subtask) {
//           if (subtask.id === action.payload.id && action.payload.taskId) {
//             return {
//               ...subtask,
//               completed: !subtask.completed,
//             };
//           } else {
//             return subtask;
//           }
//         }),
//       };
//     default:
//       return subtasks;
//   }
// }

// const actions = [
//   {
//     type: "subtasks/subtaskAdded",
//     payload: {
//       text: "read official docs only",
//       taskId: 1,
//     },
//   },
//   {
//     type: "subtasks/subtaskAdded",
//     payload: {
//       text: "run test cases",
//       taskId: 1,
//     },
//   },
//   {
//     type: "subtasks/subtaskDeleted",
//     payload: {
//       taskId: 1,
//       id: 2,
//     },
//   },
//   {
//     type: "subtasks/subtaskToggled",
//     payload: {
//       id: 1,
//       taskId: 1,
//     },
//   },
//   {
//     type: "subtasks/subtaskUpdated",
//     payload: {
//       id: 0,
//       text: "go to school",
//       taskId: 1,
//     },
//   },
// ];

// const finalState = actions.reduce(subtaskReducer, initalState);

// console.log(finalState);

export default subtaskSlice.reducer;

export const selectSubtasks = (state: RootState) => state.subtasks;
export const selectSubtasksByTaskId = (state: RootState) => {
  return function (taskId: string){
    console.log('taskid',taskId)
    return state.subtasks.filter(s => s.taskId === taskId)
  }
}