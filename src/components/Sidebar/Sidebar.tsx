import { useState } from "react";
import {
  activeBoard,
  addBoard,
  selectBoards,
} from "../../features/board/boardSlice.ts";
import { useAppDispatch, useAppSelector } from "../../types/hooks.ts";
import style from "./Sidebar.module.css";
import { addColumn } from "../../features/column/columnsSlice.ts";

export const Sidebar = () => {
  const boards = useAppSelector(selectBoards);
  const dispatch = useAppDispatch();
  const [boardName, setBoardName] = useState("");
  const [columnNames, setColumnNames] = useState(["Todo", "Doing"]);
  const [showModal, setShowModal] = useState(false);
  function handleAddColumn() {
    setColumnNames([...columnNames, ""]);
  }

  function handleColumnRemove(index: number) {
    setColumnNames(columnNames.filter((_, i) => i !== index));
  }

  function handleChangeColumn(value: string, index: number) {
    const content = value.trim();
    const updatedColNames = [...columnNames];
    updatedColNames[index] = content;
    setColumnNames(updatedColNames);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const boardId = crypto.randomUUID();
    const newBoard = {
      id: boardId,
      title: boardName,
    };

    const newColumns = columnNames.map((colName) => {
      return {
        id: crypto.randomUUID(),
        title: colName,
        boardId: newBoard.id,
      };
    });
    dispatch(addBoard(newBoard));
    newColumns.forEach((col) => dispatch(addColumn(col)));
  }

  return (
    <div className={style.sidebar}>
      <h2>🎅Kanban</h2>
      <p>ALL BOARDS {boards?.length | 0}</p>
      {boards && (
        <div>
          {boards.map((board) => {
            // dispatch an action to mark board active
            return (
              <button
                key={board.id}
                onClick={() => dispatch(activeBoard(board.id))}
              >
                ⬅️ {board.title}
              </button>
            );
          })}
        </div>
      )}

      <div>
        <button onClick={() => setShowModal(true)}>🚩 +Create New Board</button>
      </div>
      {showModal && (
        <form onSubmit={handleFormSubmit}>
          <p>Add New Board</p>
          <div>
            <label htmlFor="boardName">Board Name</label>
            <input
              type="text"
              name="boardName"
              id="boardName"
              placeholder="e.g Web Design"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
            />
          </div>
          <div>
            <p>Board Columns</p>
            <div>
              {columnNames.map((colName, index) => {
                return (
                  <div key={index}>
                    <input
                      type="text"
                      value={colName}
                      onChange={(e) =>
                        handleChangeColumn(e.target.value, index)
                      }
                    />
                    <span onClick={() => handleColumnRemove(index)}>❎</span>
                  </div>
                );
              })}
            </div>
          </div>
          <input
            type="button"
            value="+Add New Column"
            onClick={handleAddColumn}
          />
          <button type="submit">Create New Board</button>
        </form>
      )}
    </div>
  );
};
