import { useAppSelector } from "../../types/hooks";
import style from "./Header.module.css";
import { selectActiveBoard } from "../../features/board/boardSlice";

export const Header = () => {
  const activeBoard = useAppSelector(selectActiveBoard);

  return (
    <header className={style.header}>
      <h2>{activeBoard?.name}</h2>
      <div>
        <button>+AddNew Task</button>
      </div>
      <div>⬅️</div>
    </header>
  );
};
