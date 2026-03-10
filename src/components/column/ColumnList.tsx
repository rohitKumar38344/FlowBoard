import { transform } from "../../utils/transform";
import { useAppSelector } from "../../types/hooks";
import { selectColumnTasksByActiveBoard } from "../../features/task/tasksSlice";

export const ColumnList = ({ column }) => {
  const tasks = useAppSelector(selectColumnTasksByActiveBoard);
  const taskList = transform(column.taskIds, tasks);
  
  return (
    <>
      {taskList.map((task) => (
        <div key={task.id} className="border-2 border-green-800">
          <p>{task.title}</p>
          <p>dummy of {taskList.length} completed tasks</p>
        </div>
      ))}
    </>
  );
};
