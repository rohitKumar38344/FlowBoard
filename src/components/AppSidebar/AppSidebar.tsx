import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { selectAllBoards } from "@/features/board/boardSlice";
import { useAppSelector } from "@/types/hooks";
import { BoardList } from "../BoardList";
import { Button } from "../ui/button";
import { useState } from "react";
import { AddBoardModal } from "../Modals/AddBoardModal";

export function AppSidebar() {
  const boards = useAppSelector(selectAllBoards);
  const [showModal, setShowModal] = useState(false);

  function handleShowModal() {
    setShowModal((prev) => !prev);
  }
  return (
    <>
      <Sidebar>
        <SidebarHeader>🚩 Kanban</SidebarHeader>
        <SidebarContent>
          <p className="text-lg">All Boards ({boards.length})</p>
          {boards && <BoardList boards={boards} />}
          <Button onClick={handleShowModal}>Create New Board</Button>
        </SidebarContent>
        <SidebarFooter>
          <p>Switch between dark and light theme</p>
        </SidebarFooter>
      </Sidebar>
      {showModal && <AddBoardModal onShowModal={handleShowModal}/>}
    </>
  );
}
