import { selectTasksByColumnId } from "../../features/task/tasksSlice";
import { useAppSelector } from "../../types/hooks";
import { Subtask } from "../Subtask/Subtask";
interface TaskProps {
  columnId: string;
}
export const Tasks = ({ columnId }: TaskProps) => {
  const tasks = useAppSelector(selectTasksByColumnId)(columnId);
  return (
    <>
      {tasks.map((task) => {
        return <div key={task.id}>
          {task.title}
          <Subtask taskId={task.id}/>
        </div>;
      })}
    </>
  );
};
