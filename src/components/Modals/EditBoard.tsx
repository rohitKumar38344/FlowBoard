import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { boardUpdated, selectActiveBoard } from '@/features/board/boardSlice';
import { selectColumnsByActiveBoard } from '@/features/column/columnsSlice';
import { useModal } from '@/hooks/useModal';
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from '../ui/field';
import { Button } from '../ui/button';
import { XIcon } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '../ui/input-group';
import * as z from 'zod';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { nanoid } from '@reduxjs/toolkit';
import type { DeletedColumnInfo } from '@/types';
import { selectTaskEntities } from '@/features/task/tasksSlice';

const editBoardSchema = z.object({
  name: z
    .string()
    .min(1, 'Board name is required')
    .max(32, 'Board name must be at most 32 characters.'),
  columns: z
    .array(
      z.object({
        columnId: z.string(),
        boardId: z.string(),
        title: z
          .string()
          .min(1, 'Column name is required')
          .max(50, 'Column title must be at most 50 characters'),
        taskIds: z.array(z.string()),
      })
    )
    .max(5, 'Board at most contain 5 columns'),
});
export const EditBoard = () => {
  const { closeModal } = useModal();
  const board = useAppSelector(selectActiveBoard);
  const columns = useAppSelector(selectColumnsByActiveBoard);

  const taskEntities = useAppSelector(selectTaskEntities);
  const [removedColumns, setRemovedColumns] = useState<DeletedColumnInfo[]>([]);
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof editBoardSchema>>({
    resolver: zodResolver(editBoardSchema),
    defaultValues: {
      name: board?.name,
      columns: [...columns],
    },
  });
  console.log('form defaults', form.getValues());
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'columns',
  });

  if (!board) return null;

  function handleAddColumn() {
    if (!board) return;
    const columnId = nanoid();
    append({
      columnId,
      title: '',
      boardId: board.boardId,
      taskIds: [],
    });
  }

  function handleRemoveColumn(index: number, colId: string) {
    remove(index);
    const taskIds = columns.find(col => col.columnId === colId)?.taskIds || [];
    const removedCol: DeletedColumnInfo = {
      columnId: colId,
      taskIds,
      subtaskIds: taskIds
        .map(taskId => taskEntities[taskId])
        .map(task => task.subtaskIds)
        .flat(1)
        .filter(Boolean),
    };

    setRemovedColumns(prev => [...prev, removedCol]);
  }

  function onSubmit(data: z.infer<typeof editBoardSchema>) {
    if (!board) return;
    const nextBoard = {
      boardId: board.boardId,
      name: data.name,
      newCols: data.columns,
      removedColumns,
    };

    dispatch(boardUpdated(nextBoard));
    closeModal();
  }
  return (
    <Card className="w-90">
      {' '}
      <CardHeader>
        <CardTitle>Edit Board</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="form-edit-input" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldSet>
            <FieldLegend>Board Name</FieldLegend>
            <FieldDescription>Add upto 5 Columns</FieldDescription>

            <FieldGroup>
              {fields.map((field, index) => (
                <Controller
                  name={`columns.${index}.title`}
                  key={field.id}
                  control={form.control}
                  render={({ field: controllerField, fieldState }) => (
                    <Field orientation={'horizontal'} data-invalid={fieldState.invalid}>
                      <FieldContent>
                        <InputGroup>
                          <InputGroupInput
                            {...controllerField}
                            id={`form-rhf-array-email-${index}`}
                            aria-invalid={fieldState.invalid}
                          />
                          {fields.length > 1 && (
                            <InputGroupAddon align="inline-end">
                              <InputGroupButton
                                type="button"
                                variant="ghost"
                                size="icon-xs"
                                onClick={() => handleRemoveColumn(index, field.columnId)}
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
                onClick={handleAddColumn}
                disabled={fields.length >= 5}
              >
                + Add New Column
              </Button>
            </FieldGroup>
            {form.formState.errors.columns?.root && (
              <FieldError errors={[form.formState.errors.columns.root]} />
            )}
          </FieldSet>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="submit" form="form-edit-input">
            Save Changes
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
