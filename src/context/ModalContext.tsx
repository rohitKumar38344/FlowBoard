import { createContext } from 'react';

export type ModalType = 'ADD_BOARD' | 'EDIT_BOARD' | 'ADD_TASK' | 'EDIT_TASK' | null;

interface IModalContext {
  activeModal: ModalType;
  modalData?: unknown;

  openModal: (type: ModalType, data?: unknown) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<IModalContext | undefined>(undefined);
