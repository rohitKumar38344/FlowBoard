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
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '../ui/field';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { XIcon } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '../ui/input-group';
import * as z from 'zod';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { nanoid } from '@reduxjs/toolkit';

const editBoardSchema = z.object({
  name: z
    .string()
    .min(1, 'Board name is required')
    .max(32, 'Board name must be at most 32 characters.'),
  columns: z
    .array(
      z.object({
        id: z.string(),
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

  const [removedColumnIds, setRemovedColumnIds] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof editBoardSchema>>({
    resolver: zodResolver(editBoardSchema),
    defaultValues: {
      name: board?.name,
      columns: [...columns],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'columns',
  });
  if (!board) return null;

  function handleAddColumn() {
    if (!board) return;
    const colId = nanoid();
    append({
      id: colId,
      title: '',
      boardId: board.id,
      taskIds: [],
    });
  }

  function handleRemoveColumn(colId: string, index: number) {
    remove(index);
    setRemovedColumnIds(prevRemovedColIds => [...prevRemovedColIds, colId]);
  }

  function onSubmit(data: z.infer<typeof editBoardSchema>) {
    if (!board) return;
    const nextBoard = {
      boardId: board.id,
      name: data.name,
      newCols: data.columns,
      removedColumnIds,
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
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Board Name</FieldLabel>

                  <Input
                    {...field}
                    value={field.value}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldSet>
            <FieldLegend variant="label">Board Columns</FieldLegend>
            <FieldDescription>Add up to 5 Columns.</FieldDescription>

            <FieldGroup className="gap-4">
              {fields.map((field, index) => (
                <Controller
                  key={field.id}
                  name={`columns.${index}.title`}
                  control={form.control}
                  render={({ field: controllerField, fieldState }) => (
                    <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                      <FieldContent>
                        <InputGroup>
                          <InputGroupInput
                            {...controllerField}
                            id={`form-edit-column-${index}`}
                            aria-invalid={fieldState.invalid}
                          />
                          {fields.length > 1 && (
                            <InputGroupAddon align="inline-end">
                              <InputGroupButton
                                type="button"
                                variant="ghost"
                                size="icon-xs"
                                onClick={() => handleRemoveColumn(index, field.id)}
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
