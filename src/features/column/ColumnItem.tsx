import { useAppSelector } from '@/app/store/hooks';
import { memo } from 'react';
import { selectColumnsEntities } from './columnsSlice';
import { TaskList } from '../task/TaskList';

interface ColumnItemProps {
  columnId: string;
}

export const ColumnItem = memo(({ columnId }: ColumnItemProps) => {
  const columns = useAppSelector(selectColumnsEntities);
  const column = columns[columnId];
  // console.log('column for columnId', column, columnId)
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
