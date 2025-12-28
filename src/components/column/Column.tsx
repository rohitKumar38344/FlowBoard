import type { Column } from "../../types";
import { Tasks } from "../Task/Task";
import styles from "./Column.module.css";
import { useAppSelector } from "../../types/hooks";
import { selectActiveBoard } from "../../features/board/boardSlice";
import { selectColumnsByActiveBoard } from "../../features/column/columnsSlice";

export const Columns = () => {
  const activeBoardId: string | null = useAppSelector(selectActiveBoard);
  const columns: Column[] | undefined = useAppSelector(
      selectColumnsByActiveBoard
    )(activeBoardId);
  return (
    <main>
      <div className={`${styles.grid} ${styles["grid-cols-3"]}`}>
        {columns?.map((col) => (
          <div key={col.id}>
            <h3>
              {col.title} <span>({"not known"})</span>
            </h3>
            <Tasks columnId={col.id} />
          </div>
        ))}
      </div>
    </main>
  );
};
