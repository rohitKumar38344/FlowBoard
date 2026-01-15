import { selectSubtasks } from "../../features/subtask/subtaskSlice";
import { useAppSelector } from "../../types/hooks";
import { useState,useEffect } from "react";
// interface SubtaskProps {
//   taskId: string;
// }

export const Subtask = ({ subtaskIds }) => {
  const subtasks = useAppSelector(selectSubtasks);
  const [t,setT] = useState([]);
    // console.log('tids',taskIds)
    useEffect(function (){
      const nextSubtasks = [];
      for(let tid of subtaskIds){
        for(let prop in subtasks){
          if(prop === tid){
            nextSubtasks.push(subtasks[tid])
          }
        }
      }
      setT(nextSubtasks)
    },[])
    const taskCompletedCount  = t.filter(task => task.completed).length;
  return (
    <div>
      <p>{taskCompletedCount} of {t.length} completed tasks</p>
    </div>
  );
};
