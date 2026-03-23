import { useAppSelector } from "@/app/store/hooks";
import { memo } from "react";
import { selectColumnsEntities } from "./columnsSlice";
import { TaskList } from "../task/TaskList";

export const ColumnItem = memo(({ columId, colLen }) => {
  const columns = useAppSelector(selectColumnsEntities);
  const column = columns[columId];
  const taskIds = column?.taskIds;
  return (
    <div className="flex flex-col gap-4">
      <p>
        {column.title} ({colLen})
      </p>
      {taskIds.map((taskId) => (
        <TaskList key={taskId} taskId={taskId} />
      ))}
    </div>
  );
});
