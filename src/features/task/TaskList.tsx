import { useAppSelector } from '@/app/store/hooks';
import { selectTaskEntities } from './tasksSlice';
import { TaskItem } from './TaskItem';

export const TaskList = ({ taskId }: { taskId: string }) => {
  const taskEntites = useAppSelector(selectTaskEntities);
  const task = taskEntites[taskId];

  return (
    <div>
      <TaskItem task={task} />
    </div>
  );
};
