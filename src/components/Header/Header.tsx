import { useAppDispatch, useAppSelector } from "../../types/hooks";
import style from "./Header.module.css";
import { add, selectBoards } from "../../features/board/boardSlice";

export const Header = () => {
  const boards = useAppSelector(selectBoards);
  const activeBoard = boards.find((board) => board.isActive);
  const dispatch = useAppDispatch();
  return (
    <header className={style.header}>
      <h2>{activeBoard?.title}</h2>
      <div>
        <button>+AddNew Task</button>
        <button onClick={()=>dispatch(add('tesla'))}>🚩</button>
      </div>
    </header>
  );
};
