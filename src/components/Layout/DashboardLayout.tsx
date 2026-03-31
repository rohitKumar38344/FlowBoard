import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { Button } from '../ui/button';
import { EllipsisVertical } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectActiveBoard } from '@/features/board/boardSlice';
import { Outlet } from 'react-router-dom';
import { useContext, useState } from 'react';

import { ModalContext } from '../../context/ModalContext';
import { AddBoardModal } from '../Modals/AddBoardModal';
import { AddTaskForm } from '../Modals/AddTaskForm';
import { Modal } from '../Modals/Modal';
import { EditBoard } from '../Modals/EditBoard';
import { Card } from '../ui/card';

export default function Layout() {
  const activeBoard = useSelector(selectActiveBoard);
  const {
    showAddBoardModal,
    toggleShowAddBoardModal,
    showAddTaskModal,
    toggleShowAddTaskModal,
    showEditBoardModal,
    toggleEditBoardModal,
  } = useContext(ModalContext);
  const [showEditBoardOption, setShowEditBoardOption] = useState(false);

  return (
    <div>
      {activeBoard ? (
        <SidebarProvider>
          <AppSidebar />
          <div className="flex flex-1 flex-col ">
            <header className="flex items-center justify-between p-4 relative">
              <SidebarTrigger />
              <h1>{activeBoard.name}</h1>
              <div className="flex gap-2">
                <Button onClick={toggleShowAddTaskModal}>+ Add New Task</Button>
                <EllipsisVertical onClick={() => setShowEditBoardOption(prev => !prev)} />
              </div>
              {showEditBoardOption && (
                <Card className="p-4 absolute right-10 top-20">
                  <Button onClick={toggleEditBoardModal}>Edit Board</Button>
                  <Button>Delete Board</Button>
                </Card>
              )}
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
        {showEditBoardModal && (
          <Modal onClose={toggleEditBoardModal}>
            <EditBoard />
          </Modal>
        )}
      </>
    </div>
  );
}
