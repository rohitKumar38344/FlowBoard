import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { selectSubtasksByTaskId } from '../subtask/subtaskSlice';
import { useAppSelector } from '@/app/store/hooks';
import type { Task } from '@/types';

interface TaskItemProps {
  task?: Task | null;
}

export const TaskItem = memo(({ task }: TaskItemProps) => {
  const taskId = task?.taskId;
  const subtasks = useAppSelector(state => selectSubtasksByTaskId(state, taskId));
  const completed = subtasks.reduce((count, subtask) => (subtask.done ? count + 1 : count), 0);
  if (!task) return null;
  return (
    <Link to={`task/${task.taskId}`}>
      <Card>
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
          {subtasks.length > 0 ? (
            <CardDescription>({`${completed} of ${subtasks.length}`}) subtasks </CardDescription>
          ) : (
            ''
          )}
        </CardHeader>
      </Card>
    </Link>
  );
});
