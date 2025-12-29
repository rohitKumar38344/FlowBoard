import { useAppSelector } from "../../types/hooks";
import style from "./Header.module.css";
import { selectActiveBoard, selectBoards } from "../../features/board/boardSlice";

export const Header = () => {
  const activeBoardId = useAppSelector(selectActiveBoard);
  const boards = useAppSelector(selectBoards)
  const activeBoard = boards.find((board) => board.id === activeBoardId);

  return (
    <header className={style.header}>
      <h2>{activeBoard?.title}</h2>
      <div>
        <button>+AddNew Task</button>
      </div>
      <div>⬅️</div>
    </header>
  );
};
