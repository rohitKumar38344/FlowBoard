import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";
import { boardSelected, selectAllBoards } from "@/features/board/boardSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { SquareKanban, Kanban } from "lucide-react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ModalContext } from "../../context/ModalContext";

export function AppSidebar() {
  const boards = useAppSelector(selectAllBoards);
  const dispatch = useAppDispatch();
  const { toggleShowAddBoardModal } = useContext(ModalContext);
  const renderBoards = Object.values(boards).map((board, index) => (
    <NavLink
      key={index}
      to={`/board/${board.id}`}
      className={({ isActive, isPending }) => {
        return isActive ? "active" : isPending ? "pending" : "";
      }}
    >
      <Button
        className="flex-row"
        onClick={() => dispatch(boardSelected(board.id))}
      >
        <SquareKanban />
        {board.name}
      </Button>
    </NavLink>
  ));

  return (
    <Sidebar>
      <SidebarHeader>
        <Kanban />
        <p>kanban</p>
      </SidebarHeader>
      <p>ALL BOARDS ({renderBoards.length})</p>
      <SidebarContent>
        <SidebarGroup>
          <ButtonGroup orientation={"vertical"}>
            {renderBoards}
            <Button onClick={toggleShowAddBoardModal}>
              + Create New Board
            </Button>
          </ButtonGroup>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
