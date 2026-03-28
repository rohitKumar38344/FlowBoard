import  { useState } from "react";
import "./AddTaskForm.module.css"
import { useAppSelector } from "@/app/store/hooks";
import { selectColumnNamesByActiveBoard } from "@/features/column/columnsSlice";
// FIX ACTIVE BOARD ID NOT CHANGING PROBLEM
/*
t1: {
        id: "t1",
        columnId: "c1",
        title: "Learn Redux Normalization",
        description: "Understand why flat state is better than nested state.",
        subtaskIds: ["s1", "s2"],
      }
s2: {
        id: "s2",
        taskId: "t1",
        title: "Watch Senior Review Video",
        done: false,
      }
*/
export const AddTaskForm = () => {
  // const { boardId } = useParams();
  const [subtasks, setSubtasks] = useState([
    {
      id: crypto.randomUUID(),
      title: "",
      
    },
    {
      id: crypto.randomUUID(),
      title: "",
      
    },
  ]);
  const colNames = useAppSelector(selectColumnNamesByActiveBoard)
  const status = [...colNames]
  console.log('status',status)
  function handleAddSubtask(e) {
    const subtaskId = crypto.randomUUID();
    const nextSubtask = {
      id: subtaskId,
      title: "",
    };
    setSubtasks([...subtasks, nextSubtask]);
  }

  function handleRemoveSubtask(subtaskId) {
    if (!subtaskId) return;
    setSubtasks(subtasks.filter((subtask) => subtask.id !== subtaskId));
  }

  function handleFormSubmit(e: any) {
    e.preventDefault();
    // nextTask = {}
    const data = Object.fromEntries(e.target);
    console.log(data);
    // setTaskDetails()
  }
  return (
    <form onSubmit={handleFormSubmit} className=" p-6 flex flex-col gap-4 bg-[#213C51] absolute top-1/2 left-1/2 -translate-1/2 cursor-default rounded-md z-20"
    onClick={(e) => e.stopPropagation()}
    >
      <h1 className="text-[#EEEEEE]">Add New Task</h1>
      <div className="flex flex-col mb-1">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="e.g. Take coffee break"
          minLength={5}
          maxLength={20}
          className="p-2 rounded-md"
          defaultValue={''}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          rows={10}
          cols={30}
          placeholder="e.g. It's alwasy good to take a break
        This 15 minutes break will recharege the batteries a little.
        "
          minLength={20}
          maxLength={100}
        ></textarea>
      </div>

      <div>
        <label htmlFor="subtasks">Subtasks</label>
        {subtasks.map((subtask) => {
          return (
            <div key={subtask.id}>
              <input type="text" name={`subtask-${subtask.id}`} defaultValue={''}/>
              <span onClick={() => handleRemoveSubtask(subtask.id)}>❌</span>
            </div>
          );
        })}
        <button type="button">+ Add New Subtask</button>
      </div>

      <div>
        <label htmlFor="status">Status</label>
        <select name="status" id="status" data-options defaultValue={status[0] ?? ''}>
          {status.map((status, index) => (
            <option key={index} value={status} selected={index == 0}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Create Task</button>
    </form>
  );
};
