import { ColumnItem } from "./ColumnItem";

export const ColumnList = ({ columnIds }) => {
  return (
    <div className="grid grid-flow-col auto-cols-[280px] gap-6 pb-4">
      {columnIds.map((colId) => (
        <ColumnItem key={colId} columId={colId} colLen={columnIds.length} />
      ))}
    </div>
  );
};
