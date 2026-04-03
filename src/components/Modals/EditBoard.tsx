import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { boardUpdated, selectActiveBoard } from '@/features/board/boardSlice';
import { columnsUpdated, selectColumnsByActiveBoard } from '@/features/column/columnsSlice';
import { useModal } from '@/hooks/useModal';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Field, FieldContent, FieldGroup, FieldLabel } from '../ui/field';
import { Button } from '../ui/button';
import type { Column } from '@/types';
import { Input } from '../ui/input';
import { XIcon } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '../ui/input-group';

export const EditBoard = () => {
  const { closeModal } = useModal();
  const board = useAppSelector(selectActiveBoard);
  const columns = useAppSelector(selectColumnsByActiveBoard);
  const [name, setName] = useState(board?.name ?? '');
  const [draftColumns, setDraftColumns] = useState<Column[]>(columns);
  const [removedColumnIds, setRemovedColumnIds] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  if (!board) return null;

  function handleColumnTitleChange(colId: string, value: string) {
    setDraftColumns(prevColumns =>
      prevColumns.map(column => (column.id === colId ? { ...column, title: value } : column))
    );
  }

  function handleAddColumn() {
    if (!board) return;
    const colId = crypto.randomUUID();
    setDraftColumns(prevColumns => [
      ...prevColumns,
      {
        id: colId,
        title: '',
        boardId: board.id,
        taskIds: [],
      },
    ]);
  }

  function handleRemoveColumn(colId: string) {
    setDraftColumns(prevColumns => prevColumns.filter(col => col.id !== colId));
    setRemovedColumnIds(prevRemovedColIds => [...prevRemovedColIds, colId]);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const nextBoard = {
      boardId: board?.id,
      name,
      newCols: draftColumns,
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
        <CardDescription>Help us improve by reporting bugs you encounter.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onClick={e => e.stopPropagation()} onSubmit={handleFormSubmit} className="">
          <Field>
            <FieldLabel htmlFor="name">Board Name</FieldLabel>

            <Input
              type="text"
              name="name"
              id="name"
              minLength={5}
              maxLength={20}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Field>
          <FieldLabel>Board Columns</FieldLabel>
          <FieldGroup className="gap-4">
            {columns.map(column => (
              <Field orientation="horizontal" key={column.id}>
                <FieldContent>
                  <InputGroup>
                    <InputGroupInput
                      type="text"
                      name="col-name"
                      value={column.title}
                      onChange={e => handleColumnTitleChange(column.id, e.target.value)}
                    />

                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => handleRemoveColumn(column.id)}
                      >
                        <XIcon />
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                </FieldContent>
              </Field>
            ))}
          </FieldGroup>

          <Button type="button" variant="outline" size="sm">
            + Add New Column
          </Button>

          {
            // <div key={column.id}>
            //   <Input
            //     type="text"
            //     name="col-name"
            //     value={column.title}
            //     onChange={e => handleColumnTitleChange(column.id, e.target.value)}
            //   />
            //   <Button type="button" onClick={() => handleRemoveColumn(column.id)}>
            //     <XIcon />
            //   </Button>
            // </div>
          }

          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

/**
 <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldContent>
                        <InputGroup>
                          <InputGroupInput
                            {...controllerField}
                            id={`form-rhf-array-email-${index}`}
                            aria-invalid={fieldState.invalid}
                            placeholder="name@example.com"
                            type="email"
                            autoComplete="email"
                          />
                          {fields.length > 1 && (
                            <InputGroupAddon align="inline-end">
                              <InputGroupButton
                                type="button"
                                variant="ghost"
                                size="icon-xs"
                                onClick={() => remove(index)}
                                aria-label={`Remove email ${index + 1}`}
                              >
                                <XIcon />
                              </InputGroupButton>
                            </InputGroupAddon>
                          )}
                        </InputGroup>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                    </Field>
 */
