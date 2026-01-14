import styles from "./Column.module.css";
import { useAppSelector } from "../../types/hooks";
import { Tasks } from "../Task/Task";
import { selectTasksByColumnId } from "../../features/task/tasksSlice";

export const Columns = () => {
  const tasks = useAppSelector(selectTasksByColumnId);
  const nextTasks = Array.from(tasks);
  // console.log('nexttasks',nextTasks)
  return (
    <main>
      <div className={`${styles.grid} ${styles["grid-cols-3"]}`}>
        {nextTasks?.map(([col, tasks]) => (
          <div key={col}>
            <h3>
              {col} <span>{tasks.length}</span>
            </h3>
            <Tasks tasks={tasks} />
          </div>
        ))}
      </div>
    </main>
  );
};
