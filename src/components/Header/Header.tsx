import { useAppSelector } from "../../types/hooks";
import style from "./Header.module.css";
import { selectBoards } from "../../features/board/boardSlice";

export const Header = () => {
  const boards = useAppSelector(selectBoards);
  const activeBoard = boards.find((board) => board.isActive);

  return (
    <header className={style.header}>
      <h2>{activeBoard?.title}</h2>
      <div>
        <button>+AddNew Task</button>
      </div>
    </header>
  );
};
