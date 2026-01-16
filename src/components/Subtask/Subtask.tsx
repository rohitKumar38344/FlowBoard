import { selectSubtasks } from "../../features/subtask/subtaskSlice";
import { useAppSelector } from "../../types/hooks";
import { useState,useEffect } from "react";
import { SubtaskModal } from "../Modals/SubtaskModal";
import { selectTasks } from "../../features/task/tasksSlice";
// interface SubtaskProps {
//   taskId: string;
// }

export const Subtask = ({ subtaskIds }) => {
  const subtasks = useAppSelector(selectSubtasks);
  const [nextSubtasks, setNextSubtasks] = useState([])
  useEffect(function(){
    const data = [];
    for(const sid of subtaskIds){// array
 // object
        data.push(subtasks[sid])
    }
    setNextSubtasks(data)
  },[subtaskIds, subtasks])
  // console.log('subtaskIds', subtaskIds)

  // const subtasks = useAppSelector(selectSubtasks);
  // const [t,setT] = useState([]);
  // const [open, setOpen] = useState(true)
  //   // console.log('tids',taskIds)
  //   useEffect(function (){
  //     const nextSubtasks = [];
  //     for(let tid of subtaskIds){
  //       for(let prop in subtasks){
  //         if(prop === tid){
  //           nextSubtasks.push(subtasks[tid])
  //         }
  //       }
  //     }
  //     setT(nextSubtasks);
  //     // console.log('nextsids', nextSubtasks)
  //   },[subtaskIds, subtasks])
  //   const taskCompletedCount  = t.filter(task => task.completed).length;
  return (
    <div>
      {/* <p>{taskCompletedCount} of {t.length} completed tasks</p> */}
      {open && <SubtaskModal next={nextSubtasks}/>}
    </div>
  );
};
