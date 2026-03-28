import { AddBoardModalContext } from "@/context/AddBoardModalContext";
import { useState, type ReactNode } from "react";

interface AddBoardModalProvider {
  children: ReactNode;
}

export const AddBoardModalProvider = ({ children }: AddBoardModalProvider) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);
  return (
    <AddBoardModalContext.Provider value={{ isOpen, toggleModal }}>
      {children}
    </AddBoardModalContext.Provider>
  );
};
