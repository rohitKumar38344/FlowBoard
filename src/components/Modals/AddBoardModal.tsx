import { useAppDispatch } from '@/app/store/hooks';
import { boardCreated } from '@/features/board/boardSlice';
import * as z from 'zod';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { nanoid } from '@reduxjs/toolkit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useModal } from '@/hooks/useModal';
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
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '../ui/input-group';
import { Button } from '../ui/button';
import { XIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { BoardCreatePayload } from '@/types';
const addBoardSchema = z.object({
  name: z
    .string()
    .min(5, 'Board name must be at least 5 characters.')
    .max(32, 'Board name must be at most 32 characters.'),
  columns: z
    .array(
      z.object({
        columnId: z.string(),
        title: z
          .string()
          .trim()
          .min(1, 'Column title is required')
          .max(50, 'Column title must be at most 50 characters'),
        taskIds: z.array(z.string()),
      })
    )
    .min(1, 'Board must have at least 1 column')
    .max(5, 'Board atmost can contain 5 columns'),
});
export const AddBoardModal = () => {
  const { closeModal } = useModal();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof addBoardSchema>>({
    resolver: zodResolver(addBoardSchema),
    defaultValues: {
      name: '',
      columns: [
        {
          columnId: nanoid(),
          title: '',
          taskIds: [],
        },
        {
          columnId: nanoid(),
          title: '',
          taskIds: [],
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'columns',
  });

  function onSubmit(data: z.infer<typeof addBoardSchema>) {
    navigate('/');
    dispatch(boardCreated(data));
    toast.success(`Board ${data.name} create successfully`);
    closeModal();
  }

  function handleAddColumn() {
    const columnId = nanoid();
    const nextColumn = {
      columnId,
      title: '',
      taskIds: [],
    };
    append(nextColumn);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Board</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 flex flex-col gap-4">
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Board Name</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Web Design"
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <FieldSet>
            <FieldLegend variant="label">Board Columns</FieldLegend>
            <FieldDescription>Add upto 5 columns</FieldDescription>
            <FieldGroup>
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
                            id={`form-rhf-array-columns-${index}`}
                            aria-invalid={fieldState.invalid}
                            placeholder="Todo"
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
                onClick={handleAddColumn}
                disabled={fields.length >= 5}
              >
                + Add New Column
              </Button>
            </FieldGroup>
          </FieldSet>
          <Button type="submit">Create New Board</Button>
        </form>
      </CardContent>
    </Card>
  );
};
