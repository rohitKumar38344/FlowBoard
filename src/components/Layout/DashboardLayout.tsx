import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { Button } from '../ui/button';
import { EllipsisVertical } from 'lucide-react';
import {
  boardDeleted,
  selectActiveBoard,
  selectActiveBoardColumnIds,
} from '@/features/board/boardSlice';
import { Outlet } from 'react-router-dom';
import { useState, type ReactNode } from 'react';

import { useModal } from '@/hooks/useModal';
import { AddBoardModal } from '../Modals/AddBoardModal';
import { AddTaskForm } from '../Modals/AddTaskForm';
import { Modal } from '../Modals/Modal';
import { EditBoard } from '../Modals/EditBoard';
import { Card } from '../ui/card';
import { EditTaskModal } from '../Modals/EditTaskModal';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { selectTaskEntities } from '@/features/task/tasksSlice';
import { selectAllSubtasks } from '@/features/subtask/subtaskSlice';
import { selectColumnsByActiveBoard } from '@/features/column/columnsSlice';
import type { Task } from '@/types';
import { Toaster } from 'sonner';

export default function Layout() {
  const activeBoard = useAppSelector(selectActiveBoard);
  const columnIds = useAppSelector(selectActiveBoardColumnIds);
  const columnsEntites = useAppSelector(selectColumnsByActiveBoard);
  const allTaskEntities = useAppSelector(selectTaskEntities);
  const allSubtaskEntities = useAppSelector(selectAllSubtasks);

  const { activeModal, closeModal, openModal } = useModal();
  const [showEditBoardOption, setShowEditBoardOption] = useState(false);
  const dispatch = useAppDispatch();

  function handleBoardDelete() {
    const boardId = activeBoard?.id;
    if (!boardId) return;

    const colIds = columnIds ?? [];
    const taskIds: string[] = [];
    const allTasks: Task[] = [];
    const subtaskIds: string[] = [];

    for (let i = 0; i < columnsEntites.length; i++) {
      for (const taskId of columnsEntites[i].taskIds) {
        taskIds.push(allTaskEntities[taskId].id);
        allTasks.push(allTaskEntities[taskId]);
      }
    }
    for (let i = 0; i < allTasks.length; i++) {
      for (const subtaskId of allTasks[i].subtaskIds) {
        subtaskIds.push(allSubtaskEntities[subtaskId].id);
      }
    }
    console.log('taskids', taskIds, subtaskIds);
    if (boardId) {
      dispatch(boardDeleted({ boardId, colIds, taskIds, subtaskIds }));
    }
  }

  const Modal_Components: Record<string, ReactNode> = {
    ADD_BOARD: <AddBoardModal />,
    EDIT_BOARD: <EditBoard />,
    ADD_TASK: <AddTaskForm />,
    EDIT_TASK: <EditTaskModal />,
  };

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
                <Button onClick={() => openModal('ADD_TASK')}>+ Add New Task</Button>
                <EllipsisVertical onClick={() => setShowEditBoardOption(prev => !prev)} />
              </div>
              {showEditBoardOption && (
                <Card className="p-4 absolute right-10 top-20">
                  <Button onClick={() => openModal('EDIT_BOARD')}>Edit Board</Button>
                  <Button onClick={handleBoardDelete}>Delete Board</Button>
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
          <Button onClick={() => openModal('ADD_BOARD')}>+ Create new board</Button>
        </div>
      )}
      {activeModal && <Modal onClose={closeModal}>{Modal_Components[activeModal]}</Modal>}
      <Toaster />
    </div>
  );
}
