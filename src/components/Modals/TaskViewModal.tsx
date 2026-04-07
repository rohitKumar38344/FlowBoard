import { useNavigate, useParams } from 'react-router-dom';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '../ui/field';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { selectSubtasksByTaskId, subtaskStatusUpdated } from '@/features/subtask/subtaskSlice';
import { selectTaskById, taskDeleted } from '@/features/task/tasksSlice';
import { useMemo } from 'react';
import { selectColumnsByActiveBoard, taskMoved } from '@/features/column/columnsSlice';
import { EllipsisVertical, Trash2Icon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '../ui/button';
import { useModal } from '@/hooks/useModal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

export const TaskViewModal = () => {
  const navigate = useNavigate();
  const { boardId, taskId } = useParams<{ boardId: string; taskId: string }>();
  const effectiveTaskId = taskId ?? '';

  const task = useAppSelector(state => selectTaskById(state, effectiveTaskId));
  const subtasks = useAppSelector(state => selectSubtasksByTaskId(state, effectiveTaskId));
  const completed = useMemo(() => subtasks.filter(subtask => subtask.done), [subtasks]).length;
  const columns = useAppSelector(selectColumnsByActiveBoard);
  const dispatch = useAppDispatch();
  const { openModal, closeModal } = useModal();

  if (!task) return null;

  const sourceColId = task.columnId;
  const existingColName = columns.find(column => column.columnId === task.columnId)?.title;

  function handleChange(targetColumnName: string) {
    const targetColId = columns.find(col => col.title === targetColumnName)?.columnId;
    if (!targetColId) return;

    dispatch(taskMoved({ taskId: effectiveTaskId, sourceColId, targetColId }));
  }

  function handleSubtaskStatusChange(nextSubtask: { id: string; changes: { done: boolean } }) {
    console.log('nextsubtask', nextSubtask);
    dispatch(subtaskStatusUpdated(nextSubtask));
  }

  function handleClose() {
    navigate(`/board/${boardId}`);
  }

  function handleTaskDelete() {
    navigate(`/board/${boardId}`);
    dispatch(
      taskDeleted({
        taskId,
        subtaskIds: task.subtaskIds,
      })
    );
    closeModal();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <Card className="w-1/2 relative" onClick={e => e.stopPropagation()}>
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>

          <CardDescription>{task.description}</CardDescription>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="absolute right-5">
                <EllipsisVertical />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-40">
              <Button onClick={() => openModal('EDIT_TASK')}>Edit Task</Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete Task</Button>
                </AlertDialogTrigger>
                <AlertDialogContent size="sm">
                  <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                      <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete this task?</AlertDialogTitle>
                    <AlertDialogDescription>
                      {` Are you sure you want to delete the "${task.title}" task and its subtasks? This action cannot be reversed.`}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={handleTaskDelete}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </PopoverContent>
          </Popover>
        </CardHeader>
        <CardContent>
          <FieldSet>
            <FieldLegend variant="label">
              Subtasks ({`${completed} of ${subtasks.length}`})
            </FieldLegend>

            <FieldGroup className="gap-3">
              {subtasks.map(subtask => (
                <Field orientation="horizontal" key={subtask.subtaskId}>
                  <Checkbox
                    id={`${subtask.title}-${subtask.subtaskId}`}
                    name={subtask.title}
                    defaultChecked={subtask.done}
                    onCheckedChange={checked => {
                      const done = checked === true;
                      handleSubtaskStatusChange({
                        id: subtask.subtaskId,
                        changes: {
                          done,
                        },
                      });
                    }}
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

          <FieldGroup className="w-full max-w-xs mt-4">
            <Field orientation="vertical">
              <FieldLabel htmlFor="status">Status</FieldLabel>

              <Select defaultValue={existingColName} onValueChange={handleChange}>
                <SelectTrigger id="status">
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
  );
};
