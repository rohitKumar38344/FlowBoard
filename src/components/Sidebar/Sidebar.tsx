import { selectAllBoards } from "../../features/board/boardSlice"
import { useAppSelector } from "../../types/hooks"
import { BoardList } from "../BoardList";


export const Sidebar = () => {
  const boards = useAppSelector(selectAllBoards);
  
  return (
    <div className="row-span-2 border-green-900 p-4 w-52">
      <h2 className="text-3xl font-bold">🚩 Kanban</h2>
      <p className="text-lg">All Boards ({boards.length})</p>
      {boards && <BoardList boards={boards}/>}
    </div>
  )
}
