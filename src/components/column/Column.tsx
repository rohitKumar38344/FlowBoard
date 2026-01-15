import styles from "./Column.module.css";
import { Task } from "../Task/Task";
// import { selectColumnsByActiveBoardId } from "../../features/column/columnsSlice";

export const Column = ({ columns }) => {;

  return (
    <div style={{ display: "flex", gap: '60px'}}>
      {columns.map((column) => {
        return (
          <div key={column.id}>
            <h3>
              {column.title} <span>{column.taskIds.length}</span>
            </h3>
   
              <Task taskIds={column.taskIds} />
            
          </div>
        );
      })}
    </div>
  );
};
