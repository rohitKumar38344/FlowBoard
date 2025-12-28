import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { boardSlice } from "../features/board/boardSlice";
import { columnsSlice } from "../features/column/columnsSlice";
import { subtaskSlice } from "../features/subtask/subtaskSlice";
import { tasksSlice } from "../features/task/tasksSlice";
import { localStorageMiddleware } from "../middlewares/localStorageMiddleware";
import { getKanbanData } from "../utils/saveToLocalStorage";

const rootReducer = combineReducers({
  boards: boardSlice.reducer,
  columns: columnsSlice.reducer,
  tasks: tasksSlice.reducer,
  subtasks: subtaskSlice.reducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function getStore(incomingPreloadState?: AppState) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: incomingPreloadState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(localStorageMiddleware),
  });

  return store;
}
export const store = getStore(getKanbanData());

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
