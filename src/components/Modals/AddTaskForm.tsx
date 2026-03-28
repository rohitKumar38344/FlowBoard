import { useState } from "react";
import "./AddTaskForm.module.css";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectColumnsByActiveBoard } from "@/features/column/columnsSlice";
import { taskCreated } from "@/features/task/tasksSlice";

export const AddTaskForm = () => {
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
  const columns = useAppSelector(selectColumnsByActiveBoard);
  console.log("columns", columns);
  const status = columns.map((column) => column.title);

  const dispatch = useAppDispatch();

  function handleAddSubtask(e) {
    const subtaskId = crypto.randomUUID();
    const nextSubtask = {
      id: subtaskId,
      title: "",
    };
    setSubtasks([...subtasks, nextSubtask]);
  }

  function handleRemoveSubtask(subtaskId: string) {
    if (!subtaskId) return;
    setSubtasks(subtasks.filter((subtask) => subtask.id !== subtaskId));
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const subtaskIds = Object.keys(data)
      .filter((prop) => prop.startsWith("subtask"))
      .map((subtask) => subtask.slice(8));

    const column = columns.find((column) => column.title === data.status);

    const taskId = crypto.randomUUID();

    const nextTask = {
      id: taskId,
      title: data.title,
      description: data.description,
      columnId: column?.id,
      subtaskIds,
    };
    dispatch(taskCreated(nextTask));
  }
  return (
    <div
      className="w-80 absolute top-1/2 left-1/2 -translate-1/2 cursor-default rounded-md bg-green-500 z-20"
      onClick={(e) => e.stopPropagation()}
    >
      <form onSubmit={handleFormSubmit} className=" p-6 flex flex-col gap-4">
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
            defaultValue={""}
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
            defaultValue={""}
          ></textarea>
        </div>

        <div>
          <label htmlFor="subtasks">Subtasks</label>
          {subtasks.map((subtask) => {
            return (
              <div key={subtask.id}>
                <input
                  type="text"
                  name={`subtask-${subtask.id}`}
                  defaultValue={""}
                />
                <span onClick={() => handleRemoveSubtask(subtask.id)}>❌</span>
              </div>
            );
          })}
          <button type="button" onClick={handleAddSubtask}>
            + Add New Subtask
          </button>
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            data-options
            defaultValue={status[0] ?? ""}
          >
            {status.map((status, index) => (
              <option key={index} value={status} selected={index == 0}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};
