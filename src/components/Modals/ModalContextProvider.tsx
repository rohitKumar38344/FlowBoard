import { useState, type ReactNode } from "react";
import { ModalContext } from "../../context/ModalContext";

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [showAddBoardModal, setShowAddBoardModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  const toggleShowAddBoardModal = () => setShowAddBoardModal((prev) => !prev);
  const toggleShowAddTaskModal = () => setShowAddTaskModal((prev) => !prev);
  return (
    <ModalContext.Provider
      value={{
        showAddTaskModal,
        showAddBoardModal,
        toggleShowAddBoardModal,
        toggleShowAddTaskModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
