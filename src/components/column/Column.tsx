import { useAppSelector } from "../../types/hooks";
import { ColumnList } from "./ColumnList.tsx";

export const Column = ({ boardColumns: columns }) => {

  const gridConfig = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  };
  const colClass = gridConfig[columns.length] || "grid-cols-1";
  return (
    <div className={`grid p-4 ${colClass} gap-4`}>
      {columns.map((column) => (
        <div key={column.id} className=" p-4">
          <p>{column.title} ({column.taskIds.length})</p>
          <ColumnList column={column} />
        </div>
      ))}
    </div>
  );
};
