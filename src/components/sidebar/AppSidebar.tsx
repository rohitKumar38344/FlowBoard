import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";
import { selectAllBoards } from "@/features/board/boardSlice";
import { useAppSelector } from "@/app/store/hooks";
import { SquareKanban, Kanban } from "lucide-react";
import { useContext, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { AddBoardModalContext } from "@/context/AddBoardModalContext";

export function AppSidebar() {
  const boards = useAppSelector(selectAllBoards);
  const { toggleModal } = useContext(AddBoardModalContext);
  const renderBoards = useMemo(
    () =>
      Object.values(boards).map((board, index) => (
        <NavLink
          key={index}
          to={`/board/${board.id}`}
          className={({ isActive, isPending }) => {
            return isActive ? "active" : isPending ? "pending" : "";
          }
        }
        >
          <Button className="flex-row">
            <SquareKanban />
            {board.name}
          </Button>
        </NavLink>
      )),
    [boards],
  );
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
            <Button onClick={toggleModal}>+ Create New Board</Button>
          </ButtonGroup>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
