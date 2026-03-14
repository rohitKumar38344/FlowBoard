import { transform } from "../../utils/transform";
import { useAppSelector } from "../../types/hooks";
import { selectColumnTasksByActiveBoard } from "../../features/task/tasksSlice";
import { Card, CardContent, CardTitle } from "../ui/card";

export const ColumnList = ({ column }) => {
  const tasks = useAppSelector(selectColumnTasksByActiveBoard);
  const taskList = transform(column.taskIds, tasks);

  return (
    <>
      {taskList.map((task) => (
        <Card key={task.id}>
          <CardTitle>{task.title}</CardTitle>
          <CardContent>
            <p>dummy of {taskList.length} completed tasks</p>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
