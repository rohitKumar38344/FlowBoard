import { ColumnList } from "../column/ColumnList";
import { useAppSelector } from "@/app/store/hooks";
import { selectActiveBoard } from "./boardSlice";

export const Board = () => {
  const activeBoard = useAppSelector(selectActiveBoard);

  if (!activeBoard) return <div>Select a Board</div>;
  const columnIds = activeBoard.columnIds;
  return (
    <div className="flex overflow-x-auto p-4 gap-4">
      <ColumnList columnIds={columnIds} />
    </div>
  );
};
