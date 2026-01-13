import { createSlice } from "@reduxjs/toolkit";
import type { Task } from "../../types";
import type { RootState } from "../../store/store";

export interface TaskState {
  tasks: Task[],
  columnId: string | null
}

const initialState: TaskState = {
  tasks: [],
  columnId: null
}

export const tasksSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {}
});
// export default function taskReducer(state = tasks, action) {
//   switch (action.type) {
//     case "task/taskAdded":
//       return [
//         ...state,
//         {
//           id: nextId(state),
//           status: "doing",
//           title: action.payload.title,
//           description: action.payload.description,
//           subtasks: [],
//         },
//       ];
//     case "task/taskUpdated": {
//       // console.log("payload", action.payload);
//       return state.map((s) => {
//         if (s.id === action.payload.id && s.status === action.payload.status) {
//           console.log("found");
//           return {
//             ...s,
//             status: action.payload.status || s.status,
//             title: action.payload.title || s.title,
//             description: action.payload.description || s.description,
//           };
//         }
//         return s;
//       });
//     }
//     case "task/taskDeleted":
//       return state.filter(
//         (task) =>
//           task.id !== action.payload.id && task.status === action.payload.status
//       );

//     default:
//       break;
//   }
// }

// const actions = [
//   {
//     type: "task/taskAdded",
//     payload: {
//       title: "Build UI",
//       description: "Build react UI before the deadline",
//     },
//   },
//   {
//     type: "task/taskAdded",
//     payload: {
//       title: "Read expense report",
//       description:
//         "Collate all receipts from the business trip and submit the report via the portal.",
//       status: "doing",
//     },
//   },
//   {
//     type: "task/taskAdded",
//     payload: {
//       title: "Schedule team meeting",
//       description:
//         "Find a common time slot for the project kick-off meeting and send out invitations.",
//       status: "doing",
//     },
//   },
//   {
//     type: "task/taskDeleted",
//     payload: {
//       id: 2,
//       status: "doing",
//     },
//   },
//   {
//     type: "task/taskUpdated",
//     payload: {
//       id: 3,
//       title: "Review PR #45",
//       status: "doing",
//     },
//   },
// ];

// const result = actions.reduce(taskReducer, tasks);
// console.log(result);
export default tasksSlice.reducer;
export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectTasksByColumnId = (state: RootState) => {
  return function (columnId: string){
    return state.tasks.tasks.filter(task => task.columndId === columnId)

  }
}