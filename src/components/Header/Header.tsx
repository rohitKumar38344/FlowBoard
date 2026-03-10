import { selectActiveBoard } from "../../features/board/boardSlice"
import { useAppSelector } from "../../types/hooks"
import { Button } from "../Button"

export const Header = () => {
  const activeBoard = useAppSelector(selectActiveBoard);
  if(!activeBoard){
    return;
  }
  return (
    <header className="col-span-2 flex items-center justify-between p-3">
      <h1 className="font-bold text-xl">{activeBoard.name}</h1>
      <div>
        <Button>+ Add New Task</Button>
        <span >←</span>
      </div>
    </header>
  )
}
