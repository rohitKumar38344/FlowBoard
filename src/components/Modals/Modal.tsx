import { type ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="scrollbar-hide  max-h-[95vh]  max-w-md mx-auto  w-full"
      >
        {children}
      </div>
    </div>
  );
};
