import  { useRef, useState } from "react";
import type { useParams } from "react-router-dom";
import "./AddTaskForm.module.css"

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
  const [taskDetails, setTaskDetails] = useState({
    title: {
      value: "",
      errorMessage: "Title must contain atleast 5 chars",
    },
    description: {
      value: "",
      errorMessage: "Description must be between 5 to 100 chars",
    },
    subtasks: {
      entities: [
        {
          id: crypto.randomUUID(),
          title: "",
        },
        {
          id: crypto.randomUUID(),
          title: "",
        },
      ],
      errorMessage: "subtasks must contain at least 10 chars",
    },

    statuses: ["Todo", "Doing", "Done"],
  });
  const subtasksIdRef = useRef(3);

  function handleFormSubmit(e: any) {
    e.preventDefault();
    // nextTask = {}
    const data = Object.fromEntries(e.target);
    console.log(data);
    // setTaskDetails()
  }
  return (
    <form onSubmit={handleFormSubmit} className="max-w-80 rounded-md p-6 flex flex-col gap-4 bg-[#213C51]" >
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
        {taskDetails.subtasks.entities.map((subtask) => {
          return (
            <div key={subtask.id}>
              <input type="text" name={`subtask-${subtask.id}`} />
              <span>❌</span>
            </div>
          );
        })}
        <button type="button">+ Add New Subtask</button>
      </div>

      <div>
        <label htmlFor="status">Status</label>
        <select name="status" id="status" data-options>
          {taskDetails.statuses.map((status, index) => (
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
