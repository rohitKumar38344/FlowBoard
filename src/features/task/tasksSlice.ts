import { createSlice } from "@reduxjs/toolkit";
import type { Task } from "../../types";
import type { RootState } from "../../store/store";

const tasks: Task[] = [
  {
    id: "task1",
    status: "doing",
    title: "read docs",
    description: "react is a js library to build reusable interfaces",
    subtaskIds: ['subtask1','subtask2'],
    columndId: 'column1'
  },
  {
    id: "task2",
    status: "doing",
    title: "use of mind",
    description: "react is a js library to build reusable interfaces",
    subtaskIds: [],
    columndId: 'column2'
  },
  {
    id: "task3",
    status: "doing",
    title: "creating projects",
    description: "react is a js library to build reusable interfaces",
    subtaskIds: [],
    columndId: 'column3'
  },
];

export const tasksSlice = createSlice({
  name: 'task',
  initialState: tasks,
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
export const selectTasks = (state: RootState) => state.tasks;
export const selectTasksByColumnId = (state: RootState) => {
  return function (columnId: string){
    return state.tasks.filter(task => task.columndId === columnId)

  }
}