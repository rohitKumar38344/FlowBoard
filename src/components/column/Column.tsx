import type { Column } from "../../types"
import { Tasks } from "../Task/Task"

interface ColumnProps {
  columns: Column[]
}
export const Columns = ({columns}: ColumnProps) => {
  return (
    <>
      {columns?.map((col) => (
        <div key={col.id}>
          <h3>
            {col.title} <span>({col.taskIds.length})</span>
          </h3>
          <Tasks columnId= {col.id}/>
        </div>
      ))}
    </>
  )
}
