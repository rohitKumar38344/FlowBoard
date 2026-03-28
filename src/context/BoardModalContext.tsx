import { createContext } from "react";

type IAddBoardModalContext = {
  isOpen: boolean;
  toggleModal?: () => void;
}

type AddTaskModalContext = {
  isAddTaskFormOpen: boolean;
  showAddTaskForm?: () => void;
}
export const AddBoardModalContext = createContext<IAddBoardModalContext>({
  isOpen: false,
});

export const AddTaskModalContext = createContext<AddTaskModalContext>({
  isAddTaskFormOpen: false,
})