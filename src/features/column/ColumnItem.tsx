import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { memo, useRef } from 'react';
import { selectColumnById, taskMoved } from './columnsSlice';
import { TaskList } from '../task/TaskList';
import style from './Column.module.css';
import type { DragEvent } from 'react';
interface ColumnItemProps {
  columnId: string;
}

export const ColumnItem = memo(({ columnId }: ColumnItemProps) => {
  const column = useAppSelector(state => selectColumnById(state, columnId));
  const dispatch = useAppDispatch();
  const taskIds = column.taskIds;
  const columnRef = useRef<HTMLInputElement>(null);

  function handleDrop(e: DragEvent) {
    // stops the browser from redirecting.
    e.stopPropagation();

    const data = e.dataTransfer?.getData('application/json');
    if (!data) {
      return;
    }
    const { taskId, columnId: sourceColId } = JSON.parse(data);
    // drop allowed only for diff col tasks
    if (column.columnId !== sourceColId) {
      handleChange(taskId, sourceColId, column.columnId);
    }
    if (columnRef.current) {
      columnRef.current.classList.remove(style.over);
    }
    return false;
  }

  function handleDragEnter() {
    if (columnRef.current) {
      columnRef.current.classList.add(style.over);
    }
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    // Cancel dragover so that drop can fire
    e.preventDefault();

    return false;
  }

  function handleDragLeave() {
    if (columnRef.current) {
      columnRef.current.classList.remove(style.over);
    }
  }

  function handleChange(taskId: string, sourceColId: string, targetColId: string) {
    dispatch(taskMoved({ taskId, sourceColId, targetColId }));
  }
  return (
    <div
      className="flex flex-col gap-4"
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      ref={columnRef}
    >
      <p>
        {column.title} ({taskIds.length})
      </p>
      {taskIds.length > 0 && taskIds.map(taskId => <TaskList key={taskId} taskId={taskId} />)}
    </div>
  );
});
