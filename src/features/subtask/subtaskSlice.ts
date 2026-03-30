import {
  createSlice,
  createEntityAdapter,
  type PayloadAction,
  createSelector,
} from '@reduxjs/toolkit';
import type { Subtask } from '@/types';
import { selectTaskById } from '../task/tasksSlice';

const subtasksAdapter = createEntityAdapter<Subtask>();

export const subtaskSlice = createSlice({
  name: 'subtasks',
  initialState: subtasksAdapter.getInitialState({
    ids: ['s1', 's2', 's3'],
    entities: {
      s1: { id: 's1', taskId: 't1', title: 'Read Redux Docs', done: true },
      s2: {
        id: 's2',
        taskId: 't1',
        title: 'Watch Senior Review Video',
        done: false,
      },
      s3: { id: 's3', taskId: 't3', title: 'Write Unit Tests', done: false },
    },
  }),
  reducers: {
    subtasksAdded: (state, action: PayloadAction<Subtask[]>) => {
      subtasksAdapter.addMany(state, action.payload);
    },
    subtaskStatusUpdated: subtasksAdapter.updateOne,
  },
});
export const { subtasksAdded } = subtaskSlice.actions;

export const selectSubtasksByTaskId = createSelector(
  [(state, taskId) => selectTaskById(state, taskId), state => state.subtasks.entities],
  function (task, subtaskEntities) {
    const nextSubtasks = task?.subtaskIds.map(subtaskId => subtaskEntities[subtaskId]) ?? [];
    return nextSubtasks;
  }
);

export const { subtaskStatusUpdated } = subtaskSlice.actions;
export default subtaskSlice.reducer;
