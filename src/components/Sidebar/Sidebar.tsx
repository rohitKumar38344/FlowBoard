import { add, selectBoards } from "../../features/board/boardSlice.ts";
import { useAppDispatch, useAppSelector } from "../../types/hooks.ts";
import style from "./Sidebar.module.css";

export const Sidebar = () => {
  const boards = useAppSelector(selectBoards);
  const dispatch = useAppDispatch();
  return (
    <div className={style.sidebar}>
      <h2>🎅Kanban</h2>
      <p>ALL BOARDS {boards.length}</p>
      <div>
        {boards.map((board) => {
          return <button key={board.id}>⬅️ {board.title}</button>;
        })}
      </div>
      <div>
        <button onClick={() => dispatch(add("tesla"))}>
          🚩 +Create New Board
        </button>
      </div>
    </div>
  );
};
