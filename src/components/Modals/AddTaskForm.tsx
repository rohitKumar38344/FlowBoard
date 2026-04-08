import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { selectColumnsByActiveBoard } from '@/features/column/columnsSlice';
import { taskCreated } from '@/features/task/tasksSlice';
import type { Subtask } from '@/types';
import { subtasksAdded } from '@/features/subtask/subtaskSlice';
import { useModal } from '@/hooks/useModal';
import * as z from 'zod';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { nanoid } from '@reduxjs/toolkit';
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
import {
  InputGroup,
  InputGroupTextarea,
  InputGroupAddon,
  InputGroupText,
  InputGroupButton,
  InputGroupInput,
} from '../ui/input-group';
import { XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from 'sonner';

const addTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(100, 'Title must be under 20 characters'),
  description: z.string().trim().max(400, 'Description is too long'),
  status: z.string().trim().min(1, 'Status is required'),
  subtasks: z.array(
    z.object({
      subtaskId: z.string(),
      title: z.string().trim().min(1, 'Title is required').max(100, 'Title is too long'),
      done: z.boolean(),
    })
  ),
});
export const AddTaskForm = () => {
  const { closeModal } = useModal();
  const form = useForm<z.infer<typeof addTaskSchema>>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      status: '',
      subtasks: [
        {
          subtaskId: nanoid(),
          title: '',
          done: false,
        },
        {
          subtaskId: nanoid(),
          title: '',
          done: false,
        },
      ],
    },
  });

  const columns = useAppSelector(selectColumnsByActiveBoard);
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'subtasks',
  });

  const status = columns.map(column => column.title);

  const dispatch = useAppDispatch();

  function handleAddSubtask() {
    const subtaskId = nanoid();
    const nextSubtask: Subtask = {
      subtaskId,
      title: '',
      done: false,
      taskId: '',
    };
    append(nextSubtask);
  }

  function onSubmit(data: z.infer<typeof addTaskSchema>) {
    const subtaskIds = data.subtasks.map(subtask => subtask.subtaskId);

    const column = columns.find(column => column.title === data.status);
    if (!column) {
      throw new Error('Selected status column not found in store');
    }

    const taskId = nanoid();

    const nextSubtasksToAdd = data.subtasks.map(subtask => {
      return {
        ...subtask,
        taskId,
      };
    });

    const nextTask = {
      taskId,
      title: data.title,
      description: data.description,
      columnId: column.columnId,
      subtaskIds,
    };

    dispatch(taskCreated(nextTask));
    dispatch(subtasksAdded(nextSubtasksToAdd));
    closeModal();
    toast('You submitted the following values:', {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: 'bottom-right',
      classNames: {
        content: 'flex flex-col gap-2',
      },
      style: {
        '--border-radius': 'calc(var(--radius)  + 4px)',
      } as React.CSSProperties,
    });
  }
  return (
    <Card className="px-4 py-4">
      <CardHeader>
        <CardTitle>Add New Task</CardTitle>
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
                              id={`subtask-${index}`}
                              aria-invalid={fieldState.invalid}
                              placeholder="e.g. Take a coffee break"
                            />
                            {fields.length > 1 && (
                              <InputGroupAddon align="inline-end">
                                <InputGroupButton
                                  type="button"
                                  variant="ghost"
                                  size="icon-xs"
                                  onClick={() => remove(index)}
                                  aria-label={`Remove column ${index + 1}`}
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
                name="status"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {status.map((statusName, i) => (
                            <SelectItem value={statusName} key={i}>
                              {statusName}
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
