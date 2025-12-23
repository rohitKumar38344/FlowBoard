import { useAppSelector } from "../../types/hooks";
import { selectActiveBoard } from "../../features/board/boardSlice";
import { selectColumnsByActiveBoard } from "../../features/column/columnsSlice";
import type { Column } from "../../types";
import { Columns } from "../column/Column";
import style from "./Board.module.css";

export const Board = () => {
  const activeBoard = useAppSelector(selectActiveBoard);
  const columns: Column[] | undefined = useAppSelector(
    selectColumnsByActiveBoard
  )(activeBoard);

  return (
    <main>
      <div className={`${style.grid} ${style["grid-cols-3"]}`}>
        <Columns columns={columns} />
      </div>
    </main>
  );
};
