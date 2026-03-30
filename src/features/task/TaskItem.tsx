import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { memo } from "react";
import { Link } from "react-router-dom";
import { selectSubtasksByTaskId } from "../subtask/subtaskSlice";
import { useAppSelector } from "@/app/store/hooks";

export const TaskItem = memo(({ task }) => {
  const subtasks = useAppSelector(state => selectSubtasksByTaskId(state, task.id))
  const completed = subtasks.reduce((count,subtask) => subtask.done ? count+ 1: count, 0)
  return (
    <Link to={`task/${task.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
          {subtasks.length > 0 ? <CardDescription>({`${completed} of ${subtasks.length}`}) subtasks </CardDescription>:''}
        </CardHeader>
      </Card>
    </Link>
  );
});
