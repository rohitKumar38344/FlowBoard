import { ColumnList } from "../column/ColumnList";
import { useAppSelector } from "@/app/store/hooks";
import { useParams } from "react-router-dom";
import type { RootState } from "@/app/store/store";

export const Board = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const activeBoard = useAppSelector(
    (state: RootState) => state.boards.entities[boardId ?? ""],
  );

  if (!activeBoard) return <div>Select a Board</div>;

  const columnIds = activeBoard.columnIds;
  return (
    <>
      <div className="flex overflow-x-auto p-4 gap-4">
        <ColumnList columnIds={columnIds} />
      </div>
    </>
  );
};
