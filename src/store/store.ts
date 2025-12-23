import { configureStore } from "@reduxjs/toolkit";
import type { Action, ThunkAction } from "@reduxjs/toolkit";
import boardReducer from "../features/board/boardSlice";
import columnReducer from "../features/column/columnsSlice";
import subtasksReducer from "../features/subtask/subtaskSlice";
import tasksReducer from "../features/task/tasksSlice";
import { getKanbanData } from "../utils/saveToLocalStorage";
import {localStorageMiddleware} from "../middlewares/localStorageMiddleware";

const preloadedState = getKanbanData();
export const store = configureStore({
  reducer: {
    boards: boardReducer,
    columns: columnReducer,
    tasks: tasksReducer,
    subtasks: subtasksReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware)
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
