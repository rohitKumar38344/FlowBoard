import styles from "./Column.module.css";
import { useAppSelector } from "../../types/hooks";
import { selectActiveBoardColumns } from "../../features/board/boardSlice";


export const Columns = () => {
  const columns = useAppSelector(selectActiveBoardColumns);
  return (
    <main>
      <div className={`${styles.grid} ${styles["grid-cols-3"]}`}>
        {columns?.map((col) => (
          <div key={col.id}>
            <h3>
              {col.title} <span>({"not known"})</span>
            </h3>
            {/* <Tasks columnId={col.id} /> */}
          </div>
        ))}
      </div>
    </main>
  );
};
