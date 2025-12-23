import { selectSubtasksByTaskId } from "../../features/subtask/subtaskSlice";
import { useAppSelector } from "../../types/hooks";

interface SubtaskProps {
  taskId: string;
}

export const Subtask = ({ taskId }: SubtaskProps) => {
  const subtasks = useAppSelector(selectSubtasksByTaskId)(taskId);
  console.log(subtasks)
  const subtasksCompleted = subtasks.reduce(
    (count, s) => (s.completed ? count + 1 : count),
    0
  );
  return (
    <div>
      {subtasksCompleted} out of {subtasks.length} subtasks
    </div>
  );
};
