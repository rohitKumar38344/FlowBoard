import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { Action, ThunkAction } from "@reduxjs/toolkit";
import boardReducer from "../features/board/boardSlice";
import columnReducer from "../features/column/columnsSlice";
import subtaskReducer from "../features/subtask/subtaskSlice";
import taskReducer from "../features/task/tasksSlice";
import { localStorageMiddleware } from "../middlewares/localStorageMiddleware";
import { getKanbanData } from "../utils/saveToLocalStorage";

const rootReducer = combineReducers({
  boards: boardReducer,
  columns: columnReducer,
  tasks: taskReducer,
  subtasks: subtaskReducer,
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
// console.log('loaded state', store.getState())
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
