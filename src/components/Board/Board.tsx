import { selectColumnsByActiveBoardId } from "../../features/column/columnsSlice";
import { Column } from "../column/Column";
import styles from "./Board.module.css";
import { Fragment } from "react/jsx-runtime";
import { useAppSelector } from "../../types/hooks";
// interface BoardsProp {
//   boards: string[];
// }
export const Board = () => {
  const columns = useAppSelector(selectColumnsByActiveBoardId);
  console.log("columns", columns);
  return (
    <div>
      <div >
          <Column columns={columns} />
      </div>
    </div>
  );
};
