import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { selectSubtasksByTaskId } from '../subtask/subtaskSlice';
import { useAppSelector } from '@/app/store/hooks';
import type { Task } from '@/types';
import { useRef } from 'react';
import type { DragEvent } from 'react';
interface TaskItemProps {
  task?: Task | null;
}

export const TaskItem = memo(({ task }: TaskItemProps) => {
  const taskId = task?.taskId;
  const subtasks = useAppSelector(state => selectSubtasksByTaskId(state, taskId));
  const completed = subtasks.reduce((count, subtask) => (subtask.done ? count + 1 : count), 0);
  const cardRef = useRef<HTMLAnchorElement>(null);
  if (!task) return null;

  function handleDragStart(e: DragEvent) {
    if (cardRef.current) cardRef.current.style.opacity = '0.4';
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData(
        'application/json',
        JSON.stringify({
          taskId,
          columnId: task?.columnId,
        })
      );
    }
  }
  function handleDragEnd() {
    if (cardRef.current) {
      cardRef.current.style.opacity = '1';
      cardRef.current.classList.remove('over');
    }
  }

  return (
    <Link
      to={`task/${task.taskId}`}
      ref={cardRef}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="cursor-grab"
    >
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
