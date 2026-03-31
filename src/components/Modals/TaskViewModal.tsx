import { useNavigate, useParams } from 'react-router-dom';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldContent, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '../ui/field';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { selectSubtasksByTaskId, subtaskStatusUpdated } from '@/features/subtask/subtaskSlice';
import { selectTaskById } from '@/features/task/tasksSlice';
import { useMemo } from 'react';
import { selectColumnsByActiveBoard, taskMoved } from '@/features/column/columnsSlice';

export const TaskViewModal = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { boardId } = useParams();

  const task = useAppSelector(state => selectTaskById(state, taskId));
  const subtasks = useAppSelector(state => selectSubtasksByTaskId(state, taskId));
  const completed = useMemo(() => subtasks.filter(subtask => subtask.done), [subtasks]).length;
  const columns = useAppSelector(selectColumnsByActiveBoard);
  const dispatch = useAppDispatch();
  const sourceColId = task.columnId;
  const existingColName = columns.find(column => column.id === task.columnId)?.title;
  function handleChange(targetColumnName: string) {
    const targetColId = columns.find(col => col.title === targetColumnName)?.id;
    dispatch(taskMoved({ taskId, sourceColId, targetColId }));
  }

  function handleSubtaskStatusChange(nextSubtask) {
    console.log('nextsubtask', nextSubtask);
    dispatch(subtaskStatusUpdated(nextSubtask));
  }

  function handleClose() {
    navigate(`/board/${boardId}`);
  }
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <Card>
          <CardHeader>
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>{task.description}</CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
            <FieldSet>
              <FieldLegend variant="label">
                Subtasks ({`${completed} of ${subtasks.length}`})
              </FieldLegend>

              <FieldGroup className="gap-3">
                {subtasks.map(subtask => (
                  <Field orientation="horizontal" key={subtask.id}>
                    <Checkbox
                      id={`${subtask.title}-${subtask.id}`}
                      name={subtask.title}
                      defaultChecked={subtask.done}
                      onCheckedChange={checked =>
                        handleSubtaskStatusChange({
                          id: subtask.id,
                          changes: {
                            done: checked,
                          },
                        })
                      }
                    />
                    <FieldLabel
                      htmlFor={`${subtask.title}-${subtask.id}`}
                      className={`font-normal ${subtask.done ? 'line-through' : ''}`}
                    >
                      {subtask.title}
                    </FieldLabel>
                  </Field>
                ))}
              </FieldGroup>
            </FieldSet>

            <FieldGroup className="w-full max-w-xs">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldLabel htmlFor="align-item">Status</FieldLabel>
                </FieldContent>
              </Field>
              <Field>
                <Select defaultValue={existingColName} onValueChange={handleChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {columns.map((column, i) => (
                      <SelectItem key={i} value={column.title}>
                        {column.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

/*
[
    {
        "id": "s1",
        "taskId": "t1",
        "title": "Read Redux Docs",
        "done": true
    },
    {
        "id": "s2",
        "taskId": "t1",
        "title": "Watch Senior Review Video",
        "done": false
    }
]
*/
