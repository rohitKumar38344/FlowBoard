import { useEffect, useState } from "react";
import { selectSubtasks } from "../../features/subtask/subtaskSlice";
import { useAppSelector } from "../../types/hooks";
export const SubtaskModal = ({ next }) => {
  // const subtasks = useAppSelector(selectSubtasks);
  const [subtasks, setNextSubtasks] = useState(next);
  const completedTaskCount = next.reduce(
    (acc, stask) => (stask.completed ? acc + 1 : acc),
    0
  );
  useEffect(
    function () {
      setNextSubtasks(next);
    },
    [next]
  );
  return (
    <div>
      <form>
        <legend>
          Subtasks {`Subtasks ${completedTaskCount} of ${next.length}`}
        </legend>
        {subtasks.map((subtask) => (
          <div key={subtask.id}>
            <input
              type="checkbox"
              id="scales"
              name="scales"
              checked={subtask.completed}
            />
            <label for="scales">{subtask.title}</label>
          </div>
        ))}
      </form>
    </div>
  );
};
