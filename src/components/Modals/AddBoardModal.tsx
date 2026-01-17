import { useState } from "react";
import styles from "./AddBoard.module.css";

export const AddBoardModal = () => {
  const [boardName, setBoardName] = useState("");
  const [columns, setColumns] = useState(["Todo", "Doing"]);

  function handleFormSubmit(e) {
    e.preventDefault();
  }
  function handleAddColumn() {
    setColumns([...columns, ""]);
  }

  function handleDeleteColumn(col) {
    const nextCols = [...columns].filter((_, i) => i !== col);

    setColumns(nextCols);
  }

  function handleInputChange(colId, value) {
    const nextColumns = [...columns].map((col, id) => {
      if (colId === id) {
        return value;
      } else {
        return col;
      }
    });
    setColumns(nextColumns);
  }
  return (
    <div className={styles.formContainer}>
      <form action="" onSubmit={handleFormSubmit}>
        <p>Add New Board</p>
        <div>
          <label htmlFor="board-name">Board Name</label>
          <input
            type="text"
            name="board-name"
            id="board-name"
            placeholder="e.g Web Design"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />
        </div>
        <div>
          <p>Board Columns</p>
          {columns.map((column, i) => (
            <div key={i}>
              <input
                type="text"
                name={"column"}
                value={column}
                onChange={(e) => handleInputChange(i, e.target.value)}
              />
              <button type="button" onClick={() => handleDeleteColumn(i)}>
                x
              </button>
            </div>
          ))}
        </div>

        <div>
          <button type="button" onClick={handleAddColumn}>
            + Add New Column
          </button>
          <button type="submit">Create New Board</button>
        </div>
      </form>
    </div>
  );
};
