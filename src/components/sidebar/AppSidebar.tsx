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
import { useMemo } from "react";

export function AppSidebar() {
  const boards = useAppSelector(selectAllBoards);
  const renderBoards = useMemo(
    () =>
      Object.values(boards).map((board) => (
        <Button key={board.id} className="flex-row">
          <SquareKanban />
          {board.name}
        </Button>
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
          <ButtonGroup orientation={"vertical"}>{renderBoards}</ButtonGroup>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
