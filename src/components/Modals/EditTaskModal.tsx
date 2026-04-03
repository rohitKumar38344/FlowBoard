import { useState } from 'react';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { Field, FieldContent, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '../ui/field';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { XIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { useParams } from 'react-router-dom';
import { selectTaskById } from '@/features/task/tasksSlice';
import { selectAllSubtasks } from '@/features/subtask/subtaskSlice';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { selectColumnsByActiveBoard, taskUpdated } from '@/features/column/columnsSlice';
import { useModal } from '@/hooks/useModal';

export const EditTaskModal = () => {
  const { closeModal } = useModal();
  const { taskId } = useParams();
  const dispatch = useAppDispatch();
  const task = useAppSelector(state => selectTaskById(state, taskId));
  const [taskName, setTaskName] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const subtasksMap = useAppSelector(state => selectAllSubtasks(state));
  const subtasks = task.subtaskIds.map(subtaskId => subtasksMap[subtaskId]).filter(Boolean);
  const [draftSubtasks, setDraftSubtasks] = useState(subtasks);
  const columns = useAppSelector(selectColumnsByActiveBoard);
  // column
  const currentColumnStatus = columns.find(column => column.id === task.columnId);
  const [subtasksRemoved, setSubtaskRemoved] = useState<string[]>([]);
  // refers to board column eg Todo, Doing
  const [taskStatus, setTaskStatus] = useState(currentColumnStatus.title);

  function remove(subtaskId: string) {
    setDraftSubtasks(prevDraftSubtasks =>
      prevDraftSubtasks.filter(draftSubtask => draftSubtask.id !== subtaskId)
    );

    setSubtaskRemoved(prevRemovedSubtasks => [...prevRemovedSubtasks, subtaskId]);
  }
  function append() {
    const nextSubtask = {
      id: crypto.randomUUID(),
      taskId: taskId,
      title: '',
      done: false,
    };
    setDraftSubtasks(prevStasks => [...prevStasks, nextSubtask]);
  }
  function handleSubtaskChange(subtaskId: string, value: string) {
    setDraftSubtasks(
      draftSubtasks.map(stask => {
        if (stask.id === subtaskId) {
          return {
            ...stask,
            title: value,
          };
        } else {
          return stask;
        }
      })
    );
  }

  function handleTaskStatusChange(value: string) {
    setTaskStatus(value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const taskToUpdate = {
      existingTaskId: task.id,
      title: taskName,
      description,
      draftSubtasks,
      subtasksRemoved,
      existingColId: task.columnId,
      nextColId: columns.find(column => column.title === taskStatus).id,
    };
    dispatch(taskUpdated(taskToUpdate));
    closeModal();
  }
  return (
    <Card onClick={e => e.stopPropagation()} className="w-full sm:max-w-md p-8">
      <CardHeader className="border-b">
        <CardTitle>Edit Task</CardTitle>
      </CardHeader>
      <form onSubmit={handleFormSubmit}>
        <Field>
          <FieldLabel htmlFor="name">Task Name</FieldLabel>
          <Input
            type="text"
            minLength={5}
            maxLength={40}
            id="name"
            onChange={e => setTaskName(e.target.value)}
            value={taskName}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            id="description"
            placeholder="I'm a software engineer..."
            className="min-h-[120px]"
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
        </Field>
        <FieldSet className="gap-4">
          <FieldLegend variant="label">Subtasks</FieldLegend>
          <FieldGroup className="gap-4">
            {draftSubtasks.map(subtask => (
              <Field orientation="horizontal" key={subtask.id}>
                <FieldContent>
                  <Input
                    type="text"
                    name=""
                    id=""
                    value={subtask.title}
                    onChange={e => handleSubtaskChange(subtask.id, e.target.value)}
                  />
                  <XIcon onClick={() => remove(subtask.id)} />
                </FieldContent>
              </Field>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => append()}>
              Add Subtask
            </Button>
          </FieldGroup>
        </FieldSet>
        <FieldSet>
          <FieldLegend>Current Status</FieldLegend>
          <Field>
            <Select onValueChange={handleTaskStatusChange} defaultValue={taskStatus}>
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
        </FieldSet>
        <Button type="submit">Save Edit</Button>
      </form>
    </Card>
  );
};
