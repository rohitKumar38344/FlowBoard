import type { RootState } from '@/app/store/store';
import type { Board } from '@/types';
import {
  createEntityAdapter,
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { Column } from '@/types';

const boardsAdapter = createEntityAdapter<Board>();
export const boardSlice = createSlice({
  name: 'boards',
  initialState: boardsAdapter.getInitialState({
    ids: ['b1', 'b2'],
    activeBoardId: 'b1',
    entities: {
      b1: {
        id: 'b1',
        name: 'Frontend Roadmap',
        columnIds: ['c1', 'c2', 'c3'],
      },
      b2: {
        id: 'b2',
        name: 'Personal Errands',
        columnIds: ['c4'],
      },
    },
  }),
  reducers: {
    boardSelected: (state, action: PayloadAction<string>) => {
      state.activeBoardId = action.payload;
    },
    boardAdded: boardsAdapter.addOne,
    boardUpdated: (
      state,
      action: PayloadAction<{
        boardId: string;
        name: string;
        newCols: Column[];
      }>
    ) => {
      const { boardId, name, newCols } = action.payload;
      boardsAdapter.updateOne(state, {
        id: boardId,
        changes: {
          name,
          columnIds: newCols.map(column => column.id),
        },
      });
    },
    boardDeleted: (
      state,
      action: PayloadAction<{
        boardId: string;
        colIds: string[];
        taskIds: string[];
        subtaskIds: string[];
      }>
    ) => {
      const { boardId } = action.payload;
      boardsAdapter.removeOne(state, boardId);
      const nextActiveBoard = state.ids.pop();
      if (nextActiveBoard) state.activeBoardId = nextActiveBoard;
      else state.activeBoardId = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(boardAdded, (state, action) => {
      state.activeBoardId = action.payload.id;
    });
  },
});

export const selectActiveBoardId = (state: RootState) => state.boards.activeBoardId ?? '';

export const selectBoardEntities = (state: RootState) => state.boards.entities;

export const selectActiveBoard = createSelector(
  [selectActiveBoardId, selectBoardEntities],
  (activeBoardId, entities) => {
    if (!activeBoardId) return null;
    return entities[activeBoardId] ?? null;
  }
);

export const selectActiveBoardColumnIds = createSelector([selectActiveBoard], board => {
  return board?.columnIds;
});

export const selectAllBoards = createSelector([selectBoardEntities], entities =>
  Object.values(entities)
);

export const { boardAdded, boardSelected, boardUpdated, boardDeleted } = boardSlice.actions;
export default boardSlice.reducer;
