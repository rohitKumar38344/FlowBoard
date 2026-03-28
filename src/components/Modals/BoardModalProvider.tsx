import {
  AddBoardModalContext,
  AddTaskModalContext,
} from "@/context/BoardModalContext";
import { useState, type ReactNode } from "react";

interface BoardModalProvider {
  children: ReactNode;
}

export const BoardModalProvider = ({ children }: BoardModalContextProvider) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);
  const showAddTaskForm = () => setIsAddTaskFormOpen(!isAddTaskFormOpen);
  return (
    <AddBoardModalContext.Provider value={{ isOpen, toggleModal }}>
      <AddTaskModalContext.Provider
        value={{ isAddTaskFormOpen, showAddTaskForm }}
      >
        {children}
      </AddTaskModalContext.Provider>
    </AddBoardModalContext.Provider>
  );
};
