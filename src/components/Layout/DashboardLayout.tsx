import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { Button } from '../ui/button';
import { EllipsisVertical } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectActiveBoard } from '@/features/board/boardSlice';
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';

import { ModalContext } from '../../context/ModalContext';
import { AddBoardModal } from '../Modals/AddBoardModal';
import { AddTaskForm } from '../Modals/AddTaskForm';
import { Modal } from '../Modals/Modal';

export default function Layout() {
  const activeBoard = useSelector(selectActiveBoard);
  const { showAddBoardModal, toggleShowAddBoardModal, showAddTaskModal, toggleShowAddTaskModal } =
    useContext(ModalContext);

  return (
    <div>
      {activeBoard ? (
        <SidebarProvider>
          <AppSidebar />
          <div className="flex flex-1 flex-col ">
            <header className="flex items-center justify-between p-4">
              <SidebarTrigger />
              <h1>{activeBoard.name}</h1>
              <div className="flex gap-2">
                <Button onClick={toggleShowAddTaskModal}>+ Add New Task</Button>
                <EllipsisVertical />
              </div>
            </header>
            <main className="flex-1">
              <Outlet />
            </main>
          </div>
        </SidebarProvider>
      ) : (
        <div className="w-full h-screen grid place-content-center">
          <Button onClick={toggleShowAddBoardModal}>+ Create new board</Button>
        </div>
      )}
      <>
        {showAddBoardModal && (
          <Modal onClose={toggleShowAddBoardModal}>
            <AddBoardModal />
          </Modal>
        )}
        {showAddTaskModal && (
          <Modal onClose={toggleShowAddTaskModal}>
            <AddTaskForm />
          </Modal>
        )}
      </>
    </div>
  );
}
