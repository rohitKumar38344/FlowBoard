import { type ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <div
      id="overlay"
      className="fixed inset-0  z-10 cursor-pointer bg-[#00000080]"
      onClick={onClose}
    >
      {children}
    </div>
  );
};
