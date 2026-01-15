import { useState } from "react";
import { useAppSelector } from "../../types/hooks.ts";
import styles from "./Sidebar.module.css";
import { Board } from "../Board/Board.tsx";
import { AddBoardModal } from "../Modals/AddBoardModal.tsx";
import {
  
  selectActiveBoard,
  selectAllBoards,
} from "../../features/board/boardSlice.ts";

export const Sidebar = () => {
  const boards = useAppSelector(selectAllBoards);
  const activeBoard = useAppSelector(selectActiveBoard);
  const [showModal, setShowModal] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
console.log('boards',boards)
  function handleModal() {
    setShowModal((prev) => !prev);
  }
  function handleOverlay() {
    setShowModal((prev) => !prev);
  }
  return (
    <div className={styles.container}>
      <div>
        <h2>🎅Kanban</h2>
        <p>ALL BOARDS {boards.length}</p>
        <div>
          {boards.map((board) => (
            <p key={board.id}>{board.name}</p>
          ))}
        </div>
        <button onClick={() => setShowModal(true)}>🚩 +Create New Board</button>
      </div>
      {/* {boards && <Boards boards={boards} activeBoardId={activeBoardId}/> } */}
      {activeBoard && <Board board={activeBoard}/>}

      {showModal && (
        <div className={styles.overlay} onClick={handleOverlay}></div>
      )}
      {showModal && <AddBoardModal handleModal={handleModal} />}
    </div>
  );
};
