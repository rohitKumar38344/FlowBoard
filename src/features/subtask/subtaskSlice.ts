import {
  createSlice,
  createEntityAdapter,
  type PayloadAction,
  createSelector,
} from '@reduxjs/toolkit';
import type { Subtask } from '@/types';
import { selectTaskById, taskDeleted } from '../task/tasksSlice';
import type { RootState } from '@/app/store/store';
import { taskUpdated } from '../column/columnsSlice';
import { boardDeleted, boardUpdated } from '../board/boardSlice';

const subtasksAdapter = createEntityAdapter<Subtask, string>({
  selectId: subtask => subtask.subtaskId,
});

export const subtaskSlice = createSlice({
  name: 'subtasks',
  initialState: subtasksAdapter.getInitialState({
    ids: ['s1', 's2', 's3'],
    entities: {
      s1: { subtaskId: 's1', taskId: 't1', title: 'Read Redux Docs', done: true },
      s2: {
        subtaskId: 's2',
        taskId: 't1',
        title: 'Watch Senior Review Video',
        done: false,
      },
      s3: { subtaskId: 's3', taskId: 't3', title: 'Write Unit Tests', done: false },
    },
  }),
  reducers: {
    subtasksAdded: (state, action: PayloadAction<Subtask[]>) => {
      subtasksAdapter.addMany(state, action.payload);
    },
    subtaskStatusUpdated: subtasksAdapter.updateOne,
    subtaskMoved: (state, action) => {
      const { subtaskRemoved, draftSubtasks } = action.payload;
      subtasksAdapter.removeMany(state, subtaskRemoved);
      subtasksAdapter.upsertMany(state, draftSubtasks);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(taskUpdated, (state, action) => {
        const { subtasksRemoved, draftSubtasks } = action.payload;
        console.log('subtasksRemoved', subtasksRemoved);
        subtasksAdapter.removeMany(state, subtasksRemoved);
        subtasksAdapter.upsertMany(state, draftSubtasks);
      })
      .addCase(boardUpdated, (state, action) => {
        const { removedColumns } = action.payload;
        const removedSubtaskIds = removedColumns.flatMap(rCol => rCol.subtaskIds) as string[];
        subtasksAdapter.removeMany(state, removedSubtaskIds);
      })
      .addCase(boardDeleted, (state, action) => {
        const { subtaskIds } = action.payload;
        subtasksAdapter.removeMany(state, subtaskIds);
      })
      .addCase(taskDeleted, (state, action) => {
        const { subtaskIds } = action.payload;

        subtasksAdapter.removeMany(state, subtaskIds);
      });
  },
});
export const { subtasksAdded, subtaskMoved } = subtaskSlice.actions;

export const selectSubtasksByTaskId = createSelector(
  [(state, taskId) => selectTaskById(state, taskId), state => state.subtasks.entities],
  function (task, subtaskEntities) {
    if (!task) return [];
    const nextSubtasks = task?.subtaskIds.map(subtaskId => subtaskEntities[subtaskId]) ?? [];
    return nextSubtasks;
  }
);

export const { subtaskStatusUpdated } = subtaskSlice.actions;
export const { selectEntities: selectAllSubtasks } = subtasksAdapter.getSelectors(
  (state: RootState) => state.subtasks
);
export default subtaskSlice.reducer;
