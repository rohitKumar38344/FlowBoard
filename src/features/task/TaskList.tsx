import { useAppSelector } from "@/app/store/hooks";
import { selectTaskEntites } from "./tasksSlice";
import { TaskItem } from "./TaskItem";

export const TaskList = ({ taskId }) => {
  const taskEntites = useAppSelector(selectTaskEntites);
  const task = taskEntites[taskId];

  return (
    <div>
      <TaskItem task={task} />
    </div>
  );
};
