import { selectBoards } from "../../features/board/boardSlice.ts";
import { useAppSelector } from "../../types/hooks.ts";
import style from "./Sidebar.module.css";

export const Sidebar = () => {
  const boards = useAppSelector(selectBoards);
  return (
    <div className={style.sidebar}>
      <h2>🎅Kanban</h2>
      <p>ALL BOARDS {boards.length}</p>
      <div>
        {boards.map((board) => {
          return <button key={board.id}>⬅️ {board.title}</button>;
        })}
      </div>
    </div>
  );
};
