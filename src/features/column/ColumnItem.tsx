import { useAppSelector } from '@/app/store/hooks';
import { memo } from 'react';
import { selectColumnById } from './columnsSlice';
import { TaskList } from '../task/TaskList';

interface ColumnItemProps {
  columnId: string;
}

export const ColumnItem = memo(({ columnId }: ColumnItemProps) => {
  const column = useAppSelector(state => selectColumnById(state, columnId));

  const taskIds = column.taskIds;
  return (
    <div className="flex flex-col gap-4">
      <p>
        {column.title} ({taskIds.length})
      </p>
      {taskIds.length > 0 && taskIds.map(taskId => <TaskList key={taskId} taskId={taskId} />)}
    </div>
  );
});
