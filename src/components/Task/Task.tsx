import React from 'react'
import { Subtask } from '../Subtask/Subtask'
import { useAppSelector } from '../../types/hooks'
import { selectSubtasks } from '../../features/subtask/subtaskSlice'

export const Task = ({task}) => {
  console.log('tasks',tasks)
  const subtasks = useAppSelector(selectSubtasks)
  return (
    <li >
      {tasks.map(task => (
        <div key={task.id} className='border-2 border-green-700 flex flex-col gap-2'>
        <p>{task.title}</p>
        
        {tasks && <Subtask subtasks={subtasks}/>}
        </div>))
      }

    </li>
  )
}
