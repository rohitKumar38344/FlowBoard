import { createContext } from 'react';

interface IModalContext {
  showAddBoardModal: boolean;
  showAddTaskModal: boolean;
  toggleShowAddBoardModal?: () => void;
  toggleShowAddTaskModal?: () => void;
}
export const ModalContext = createContext<IModalContext>({
  showAddBoardModal: false,
  showAddTaskModal: false,
});
