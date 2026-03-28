import { selectActiveBoard } from "../../features/board/boardSlice";
import { useAppSelector } from "../../app/store/hooks";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AddBoardModalContext } from "@/context/AddBoardModalContext";

export const Header = () => {
  const activeBoard = useAppSelector(selectActiveBoard);
  const {toggleModal}= useContext(AddBoardModalContext)
  if (!activeBoard) {
    return;
  }
  return (
    <header className="col-span-2 flex items-center justify-between p-3">
      <h1 className="font-bold text-xl">{activeBoard.name}</h1>
      <div>
        <Button variant="outline" size={"lg"} onClick={toggleModal}>
          + Add New Task
        </Button>
      </div>
    </header>
  );
};
