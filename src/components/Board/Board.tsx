import React from "react";
import { useAppSelector } from "../../types/hooks";
import { selectColumnsByActiveBoardId } from "../../features/column/columnsSlice";
import { Column } from "../column/Column";

export const Board = () => {
  const activeBoardCols = useAppSelector(selectColumnsByActiveBoardId);
console.log(activeBoardCols)
  return (
    <section >
      {activeBoardCols && (
        <Column boardColumns={activeBoardCols} />
      )}
    </section>
  );
};
