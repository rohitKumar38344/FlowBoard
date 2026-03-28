import { createContext } from "react";

type IAddBoardModalContext = {
  isOpen: boolean;
  toggleModal?: () => void;
}
export const AddBoardModalContext = createContext<IAddBoardModalContext>({
  isOpen: false,
});