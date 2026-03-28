import { ColumnList } from "../column/ColumnList";
import { useAppSelector } from "@/app/store/hooks";
import { Outlet, useParams } from "react-router-dom";
import type { RootState } from "@/app/store/store";
import { useContext } from "react";
import { AddBoardModalContext } from "@/context/AddBoardModalContext";
import { AddBoardModal } from "@/components/Modals/AddBoardModal";

export const Board = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const activeBoard = useAppSelector(
    (state: RootState) => state.boards.entities[boardId ?? ""],
  );
  const { isOpen, toggleModal } = useContext(AddBoardModalContext);
  if (!activeBoard) return <div>Select a Board</div>;

  const columnIds = activeBoard.columnIds;
  return (
    <>
      <div className="flex overflow-x-auto p-4 gap-4">
        <ColumnList columnIds={columnIds} />
      </div>
      {isOpen && (
        <div
          id="overlay"
          className="fixed inset-0  z-10 cursor-pointer bg-[#00000080]"
          onClick={toggleModal}
        >
          <AddBoardModal />
        </div>
      )}
    </>
  );
};
