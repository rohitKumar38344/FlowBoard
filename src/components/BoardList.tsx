import React from 'react'
import { useAppSelector } from '../types/hooks'
import { selectActiveBoardId } from '../features/board/boardSlice'

export const BoardList = ({boards}) => {
  const activeBoardId = useAppSelector(selectActiveBoardId);
  return (
    <ul>
      {
        boards.map(board => <li key={board.id} className={board.id == activeBoardId ? 'bg-purple-600': ''}>{board.name}</li>)
      }
    </ul>
  )
}
