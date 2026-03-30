import { ColumnItem } from './ColumnItem';

interface ColumnListProps {
  columnIds: string[];
}
export const ColumnList = ({ columnIds }: ColumnListProps) => {
  // console.log('colIds',columnIds)
  return (
    <div className="grid grid-flow-col auto-cols-[280px] gap-6 pb-4">
      {columnIds.map(colId => (
        <ColumnItem key={colId} columnId={colId} colLen={columnIds.length} />
      ))}
    </div>
  );
};
