import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { Action, ThunkAction } from "@reduxjs/toolkit";
import boardsReducer from "@/features/board/boardSlice";
import columnsReducer from "@/features/column/columnsSlice"
import tasksReducer from "@/features/task/tasksSlice"
import subtasksReducer from "@/features/subtask/subtaskSlice"
import type { EntityState } from '@reduxjs/toolkit';
import type { Board, Column, Task, Subtask } from "@/types";

export interface BoardsState extends EntityState<Board, string> {
  activeBoardId: string | null;
}

export interface RootState {
  boards: BoardsState;
  columns: EntityState<Column, string>;
  tasks: EntityState<Task, string>;
  subtasks: EntityState<Subtask, string>;
}

// import { localStorageMiddleware } from "../middlewares/localStorageMiddleware";
// import { getKanbanData } from "../utils/saveToLocalStorage";

const rootReducer = combineReducers({
  boards: boardsReducer,
  columns: columnsReducer,
  tasks: tasksReducer,
  subtasks: subtasksReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function getStore() {
  const store = configureStore({
    reducer: rootReducer,
    // preloadedState: incomingPreloadState,
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware().concat(localStorageMiddleware),
  });

  return store;
}

// export const store = getStore(getKanbanData());
export const store = getStore();
// console.log('loaded state', store.getState())
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
