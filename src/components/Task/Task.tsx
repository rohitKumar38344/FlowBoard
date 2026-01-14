import { Subtask } from "../Subtask/Subtask";

export const Tasks = ({ tasks }) => {
  const tasksl = '';
  return (
    <>
      {tasks.map((task) => {
        return <div key={task.id}>
          {task.title}
          {/* <Subtask taskId={task.id}/> */}
        </div>;
      })}
    </>
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