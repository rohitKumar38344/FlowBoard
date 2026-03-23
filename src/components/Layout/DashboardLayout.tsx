import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { Button } from "../ui/button";
import { EllipsisVertical } from "lucide-react";
import { useSelector } from "react-redux";
import { selectActiveBoard } from "@/features/board/boardSlice";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const activeBoard = useSelector(selectActiveBoard);

  return (
    <>
      {activeBoard ? (
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1">
            <SidebarTrigger />
            <header className="flex items-center justify-between p-4">
              <h1>{activeBoard.name}</h1>
              <div className="flex gap-2">
                <Button>+ Add New Task</Button>
                <EllipsisVertical />
              </div>
            </header>
            <Outlet />
          </main>
        </SidebarProvider>
      ) : (
        <div className="w-full h-screen grid place-content-center">
          <Button>+ Create new board</Button>
        </div>
      )}
    </>
  );
}
