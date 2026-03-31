import { createContext } from 'react';

interface IModalContext {
  showAddBoardModal: boolean;
  showAddTaskModal: boolean;
  showEditBoardModal: boolean;
  toggleShowAddBoardModal?: () => void;
  toggleShowAddTaskModal?: () => void;
  toggleEditBoardModal?: () => void;
}
export const ModalContext = createContext<IModalContext>({
  showAddBoardModal: false,
  showAddTaskModal: false,
  showEditBoardModal: false,
});
