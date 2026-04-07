import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '../ui/field';
import { Input } from '../ui/input';
import { XIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { useParams } from 'react-router-dom';
import { selectTaskById } from '@/features/task/tasksSlice';
import { selectAllSubtasks } from '@/features/subtask/subtaskSlice';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { selectColumnsByActiveBoard, taskUpdated } from '@/features/column/columnsSlice';
import { useModal } from '@/hooks/useModal';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import {
  InputGroup,
  InputGroupTextarea,
  InputGroupAddon,
  InputGroupText,
  InputGroupInput,
  InputGroupButton,
} from '../ui/input-group';
import { nanoid } from '@reduxjs/toolkit';

const editTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(100, 'Title must be under 20 characters'),
  description: z.string().trim().max(400, 'Description is too long'),
  subtasks: z.array(
    z.object({
      subtaskId: z.string(),
      title: z.string().trim().min(1, 'Title is required').max(100, 'Title is too long'),
      done: z.boolean(),
    })
  ),
  selectedColumn: z.string(),
});
export const EditTaskModal = () => {
  const { closeModal } = useModal();
  const { taskId } = useParams();
  const dispatch = useAppDispatch();
  const task = useAppSelector(state => selectTaskById(state, taskId!));

  const subtasksMap = useAppSelector(state => selectAllSubtasks(state));
  const subtasks = task.subtaskIds.map(subtaskId => subtasksMap[subtaskId]).filter(Boolean);

  const columns = useAppSelector(selectColumnsByActiveBoard);
  // column
  const currentColumnStatus = columns.find(column => column.columnId === task.columnId);

  const [subtasksRemoved, setSubtasksRemoved] = useState<string[]>([]);

  const form = useForm<z.infer<typeof editTaskSchema>>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      subtasks,
      selectedColumn: currentColumnStatus?.title,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'subtasks',
  });
  function handleRemoveSubtask(index: number, subtaskId: string) {
    console.log('subtaskid', subtaskId);
    remove(index);
    setSubtasksRemoved(prevRemovedSubtasks => [...prevRemovedSubtasks, subtaskId]);
  }
  function handleAddSubtask() {
    const nextSubtask = {
      subtaskId: nanoid(),
      taskId: taskId,
      title: '',
      done: false,
    };
    append(nextSubtask);
  }

  function onSubmit(data: z.infer<typeof editTaskSchema>) {
    console.log('data', data);
    const nextColumn = columns.find(column => column.title === data.selectedColumn);
    if (!nextColumn) {
      console.error('Selected column not found');
      return;
    }
    const taskToUpdate = {
      existingTaskId: task.taskId,
      title: data.title,
      description: data.description,
      draftSubtasks: data.subtasks,
      subtasksRemoved,
      existingColId: task.columnId,
      nextColId: nextColumn.columnId,
    };
    dispatch(taskUpdated(taskToUpdate));
    closeModal();
  }
  return (
    <Card onClick={e => e.stopPropagation()} className="w-full sm:max-w-md p-8">
      <CardHeader className="border-b">
        <CardTitle>Edit Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} id="addtask-form">
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input
                    id="title"
                    {...field}
                    placeholder="e.g. Take coffee break"
                    aria-invalid={fieldState.invalid}
                    value={field.value}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel data-invalid={fieldState.invalid} htmlFor="description">
                    Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="description"
                      placeholder="e.g. It's always good to take a break"
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                      value={field.value}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/400 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <FieldSet>
              <FieldLegend variant="label">Subtasks</FieldLegend>
              <FieldDescription>Add upto 5 Subtasks</FieldDescription>
              <FieldGroup>
                {fields.map((field, index) => (
                  <Controller
                    key={field.id}
                    name={`subtasks.${index}.title`}
                    control={form.control}
                    render={({ field: controllerField, fieldState }) => (
                      <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                        <FieldContent>
                          <InputGroup>
                            <InputGroupInput
                              {...controllerField}
                              id={`subtask-${field.id}`}
                              aria-invalid={fieldState.invalid}
                              value={controllerField.value}
                            />
                            {fields.length > 1 && (
                              <InputGroupAddon align="inline-end">
                                <InputGroupButton
                                  type="button"
                                  variant="ghost"
                                  size="icon-xs"
                                  onClick={() => handleRemoveSubtask(index, field.subtaskId)}
                                  aria-label={`Remove subtask ${index + 1}`}
                                >
                                  <XIcon />
                                </InputGroupButton>
                              </InputGroupAddon>
                            )}
                          </InputGroup>
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </FieldContent>
                      </Field>
                    )}
                  />
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddSubtask}
                  disabled={fields.length >= 5}
                  className="w-full"
                >
                  + Add New Subtask
                </Button>
              </FieldGroup>
            </FieldSet>
            <FieldSet>
              <FieldLegend>Status</FieldLegend>
              <Controller
                name="selectedColumn"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full max-w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {columns.map((column, i) => (
                            <SelectItem value={column.title} key={i}>
                              {column.title}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Field>
                <Button type="submit">Create Task</Button>
              </Field>
            </FieldSet>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};
