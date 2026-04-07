import type { RootState } from '@/app/store/store';
import type { Subtask, Task } from '@/types';
import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { taskMoved, taskUpdated } from '../column/columnsSlice';
import { boardDeleted, boardUpdated } from '../board/boardSlice';

const tasksAdapter = createEntityAdapter<Task, string>({
  selectId: task => task.taskId,
});

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: tasksAdapter.getInitialState({
    ids: ['t1', 't2', 't3', 't4', 't5'],
    entities: {
      t1: {
        taskId: 't1',
        columnId: 'c1',
        title: 'Learn Redux Normalization',
        description: 'Understand why flat state is better than nested state.',
        subtaskIds: ['s1', 's2'],
      },
      t2: {
        taskId: 't2',
        columnId: 'c1',
        title: 'Master CSS Grid',
        description: 'Build a responsive dashboard layout.',
        subtaskIds: [],
      },
      t3: {
        taskId: 't3',
        columnId: 'c2',
        title: 'Refactor Kanban Store',
        description: 'Implement createEntityAdapter for all slices.',
        subtaskIds: ['s3'],
      },
      t4: {
        taskId: 't4',
        columnId: 'c3',
        title: 'Update Resume',
        description: 'Add the new Meta-level Redux skills.',
        subtaskIds: [],
      },
      t5: {
        taskId: 't5',
        columnId: 'c4',
        title: 'Buy Groceries',
        description: 'Milk, eggs, and bread.',
        subtaskIds: [],
      },
    },
  }),
  reducers: {
    taskCreated: (state, action: PayloadAction<Task>) => {
      tasksAdapter.addOne(state, action.payload);
    },
    taskDeleted: (state, action) => {
      const { taskId } = action.payload;
      tasksAdapter.removeOne(state, taskId);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(taskMoved, (state, action) => {
        const { taskId, targetColId } = action.payload;
        const task = state.entities[taskId];
        if (task) {
          task.columnId = targetColId;
        }
      })
      .addCase(taskUpdated, (state, action) => {
        const { existingTaskId, title, description, nextColId } = action.payload;
        const draftSubtasks: Subtask[] = action.payload.draftSubtasks;
        const task = state.entities[existingTaskId];
        task.title = title;
        task.description = description;
        task.subtaskIds = draftSubtasks.map(dStask => dStask.subtaskId);
        task.columnId = nextColId;
      })
      .addCase(boardDeleted, (state, action) => {
        const { taskIds } = action.payload;
        tasksAdapter.removeMany(state, taskIds);
      })
      .addCase(boardUpdated, (state, action) => {
        const { removedColumns } = action.payload;
        const removedTaskds = removedColumns.map(rCol => rCol.taskIds).flat(1) as string[];
        console.log('remTaskids', removedTaskds);
        if (removedTaskds.length > 1) tasksAdapter.removeMany(state, removedTaskds);
      });
  },
});

export default tasksSlice.reducer;
// use selectAll from entityAdapter API
// export const selectTaskEntites = (state: RootState) => state.tasks.entities;
// use selectAll from entityAdapter API
export const {
  selectAll: selectAllTasks,
  selectById: selectTaskById,
  selectEntities: selectTaskEntities,
} = tasksAdapter.getSelectors((state: RootState) => state.tasks);

// export const selectAllSubtaskIdsByTask = createSelector([selectColumnsByActiveBoard, selectAllTasks],(columns, tasks) => {

// })
export const { taskCreated, taskDeleted } = tasksSlice.actions;
