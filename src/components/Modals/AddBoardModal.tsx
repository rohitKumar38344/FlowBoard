import { useAppDispatch } from '@/app/store/hooks';
import { boardAdded } from '@/features/board/boardSlice';
import { columnsAdded } from '@/features/column/columnsSlice';
import { useState } from 'react';

export const AddBoardModal = () => {
  const [columns, setColumns] = useState([
    {
      id: crypto.randomUUID(),
      title: 'Todo',
      errorMessage: 'column title must contain at least 10 chars',
    },
    {
      id: crypto.randomUUID(),
      title: 'Doing',
      errorMessage: 'column title must contain at least 10 chars',
    },
  ]);
  const dispatch = useAppDispatch();
  function handleFormSubmit(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    console.log('formData', formData);
    const cols = [];
    for (const [key, value] of Object.entries(formData)) {
      if (key.startsWith('column')) {
        cols.push({
          id: key.slice(7),
          title: value,
        });
      }
    }

    const nextColumnIds = Array.from(columns, column => column.id);
    const nextBoard = {
      id: crypto.randomUUID(),
      name: formData.title,
      columnIds: nextColumnIds,
    };

    const nextColumns = cols.map(col => {
      return {
        ...col,
        boardId: nextBoard.id,
        taskIds: [],
      };
    });

    dispatch(boardAdded(nextBoard));
    dispatch(columnsAdded(nextColumns));
  }

  function handleAddColumn(e) {
    const columnId = crypto.randomUUID();
    const nextColumn = {
      id: columnId,
      title: '',
      errorMessage: '',
    };
    setColumns([...columns, nextColumn]);
  }

  function handleRemoveColumn(colId) {
    if (!colId) return;
    setColumns(columns.filter(column => column.id !== colId));
  }
  return (
    <div
      className="w-80 absolute top-1/2 left-1/2 -translate-1/2 cursor-default rounded-md bg-green-500 z-20"
      onClick={e => e.stopPropagation()}
    >
      <form onSubmit={handleFormSubmit} className="p-6 flex flex-col gap-4">
        <h1 className="text-white">Add New Board</h1>
        <div className="flex flex-col mb-1">
          <label htmlFor="title">Board Name</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="e.g. Web Design"
            minLength={5}
            maxLength={20}
            className="p-2 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-4">
          <p className=" text-white">Board Columns</p>
          {columns.map(column => {
            return (
              <div key={column.id} className="flex gap-1 items-center">
                <input
                  type="text"
                  name={`column-${column.id}`}
                  className="rounded-md p-2"
                  defaultValue={column.title}
                />
                <span onClick={() => handleRemoveColumn(column.id)} className="cursor-pointer">
                  ❌
                </span>
              </div>
            );
          })}
          <button type="button" onClick={handleAddColumn}>
            + Add New Column
          </button>
        </div>

        <button type="submit">Create New Board</button>
      </form>
    </div>
  );
};
