import { useState } from "react";
import { useAppSelector } from "../../types/hooks.ts";
import styles from "./Sidebar.module.css";
import { Boards } from "../Board/Board.tsx";
import { AddBoardModal } from "../Modals/AddBoardModal.tsx";
import { selectActiveBoardId, selectAllBoards } from "../../features/board/boardSlice.ts";

export const Sidebar = () => {
  const boards = useAppSelector(selectAllBoards);
  const activeBoardId = useAppSelector(selectActiveBoardId);
  const [showModal, setShowModal] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  

  function handleModal() {
    setShowModal((prev) => !prev);
  }
  function handleOverlay(){
    setShowModal(prev => !prev)
  }
  return (
    <div className={styles.sidebar}>
      <h2>🎅Kanban</h2>
      <p>ALL BOARDS {boards.length}</p>
      {boards && <Boards boards={boards} activeBoardId={activeBoardId}/> }

      <div>
        <button onClick={() => setShowModal(true)}>🚩 +Create New Board</button>
      </div>
      {showModal && <div className={styles.overlay} onClick={handleOverlay}></div>}
      {showModal && <AddBoardModal handleModal={handleModal}/>}
    </div>

  );
};
