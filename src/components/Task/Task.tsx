import { useEffect, useState } from "react";
import { useAppSelector } from "../../types/hooks";
import { selectTasks } from "../../features/task/tasksSlice";
import { Subtask } from "../Subtask/Subtask";

export const Task = ({ taskIds }) => {
  const [t,setT] = useState([]);
  const tasks = useAppSelector(selectTasks);
  // console.log('tids',taskIds)
  useEffect(function (){
    const nextTasks = [];
    for(let tid of taskIds){
      for(let prop in tasks){
        if(prop === tid){
          nextTasks.push(tasks[tid])
        }
      }
    }
    setT(nextTasks)
  },[])
  return (
    <div>
      {t.map((t) => (
        <div key={t.id}>
        <p >{t.title}</p>
        <Subtask subtaskIds={t.subtaskIds}/>
</div>
      ))}
    </div>
  );
};
// new Map([
//     [
//         0,
//         [
//             {
//                 "id": "t1",
//                 "title": "Introduction to store",
//                 "description": "In the previous section, we created a root reducer using combineReducers",
//                 "columnId": "c1",
//                 "subtaskIds": [
//                     "s1"
//                 ]
//             }
//         ]
//     ],
//     [
//         1,
//         [
//             {
//                 "id": "t2",
//                 "title": "Creating store",
//                 "description": "Every Redux store has a single root reducer function.",
//                 "columnId": "c2",
//                 "subtaskIds": [
//                     "s2"
//                 ]
//             }
//         ]
//     ],
//     [
//         2,
//         [
//             {
//                 "id": "t3",
//                 "title": "Dispatch actions",
//                 "description": "Redux store dispatches actions to update state.",
//                 "columnId": "c3",
//                 "subtaskIds": [
//                     "s3"
//                 ]
//             }
//         ]
//     ]
// ])
