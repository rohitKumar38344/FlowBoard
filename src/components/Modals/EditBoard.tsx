import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { boardUpdated, selectActiveBoard } from '@/features/board/boardSlice';
import { columnsUpdated, selectColumnsByActiveBoard } from '@/features/column/columnsSlice';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Field, FieldLabel } from '../ui/field';
import { Button } from '../ui/button';
import type { Column } from '@/types';

export const EditBoard = () => {
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
  }
  return (
    <Card className="w-90">
      {' '}
      <CardHeader>
        <CardTitle>Edit Board</CardTitle>
        <CardDescription>Help us improve by reporting bugs you encounter.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onClick={e => e.stopPropagation()} onSubmit={handleFormSubmit}>
          <Field>
            <FieldLabel htmlFor="name">Board Name</FieldLabel>

            <input
              type="text"
              name="name"
              id="name"
              minLength={5}
              maxLength={20}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel>Board Columns</FieldLabel>

            {draftColumns.map(column => (
              <div key={column.id}>
                <input
                  type="text"
                  name="col-name"
                  value={column.title}
                  onChange={e => handleColumnTitleChange(column.id, e.target.value)}
                />
                <Button type="button" onClick={() => handleRemoveColumn(column.id)}>
                  ❌
                </Button>
              </div>
            ))}

            <Button type="button" onClick={handleAddColumn}>
              + Add New Column
            </Button>
          </Field>
          <Button type="submit">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  );
};
