import { type ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div onClick={e => e.stopPropagation()} className="cursor-default w-1/2">
        {children}
      </div>
    </div>
  );
};
