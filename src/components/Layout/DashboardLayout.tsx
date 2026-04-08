import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { Button } from '../ui/button';
import { EllipsisVertical, Trash2Icon } from 'lucide-react';
import {
  boardDeleted,
  selectActiveBoard,
  selectActiveBoardColumnIds,
} from '@/features/board/boardSlice';
import { Outlet, useNavigate } from 'react-router-dom';
import { Suspense } from 'react';

import { useModal } from '@/hooks/useModal';
const Modal = lazyLoad(() => import('../Modals/Modal'), 'Modal');

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { selectTaskEntities } from '@/features/task/tasksSlice';
import { selectAllSubtasks } from '@/features/subtask/subtaskSlice';
import { selectColumnsByActiveBoard } from '@/features/column/columnsSlice';
import type { Task } from '@/types';
import { Toaster } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LoadingSpinner } from '../LoadingSpinner';
import { lazyLoad } from '@/utils/lazyLoad';

interface ModalComponentProps {
  onClose: () => void;
}
export default function Layout() {
  const activeBoard = useAppSelector(selectActiveBoard);
  const columnIds = useAppSelector(selectActiveBoardColumnIds);
  const columnsEntites = useAppSelector(selectColumnsByActiveBoard);
  const allTaskEntities = useAppSelector(selectTaskEntities);
  const allSubtaskEntities = useAppSelector(selectAllSubtasks);

  const { activeModal, closeModal, openModal } = useModal();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function handleBoardDelete() {
    const boardId = activeBoard?.boardId;
    if (!boardId) return;

    const colIds = columnIds ?? [];
    const taskIds: string[] = [];
    const allTasks: Task[] = [];
    const subtaskIds: string[] = [];

    for (let i = 0; i < columnsEntites.length; i++) {
      for (const taskId of columnsEntites[i].taskIds) {
        taskIds.push(allTaskEntities[taskId].taskId);
        allTasks.push(allTaskEntities[taskId]);
      }
    }
    for (let i = 0; i < allTasks.length; i++) {
      for (const subtaskId of allTasks[i].subtaskIds) {
        subtaskIds.push(allSubtaskEntities[subtaskId].subtaskId);
      }
    }

    if (boardId) {
      navigate('/');
      dispatch(boardDeleted({ boardId, colIds, taskIds, subtaskIds }));
    }
  }

  const Modal_Components: Record<string, React.ComponentType<ModalComponentProps>> = {
    ADD_BOARD: lazyLoad(() => import('../Modals/AddBoardModal'), 'AddBoardModal'),
    EDIT_BOARD: lazyLoad(() => import('../Modals/EditBoard'), 'EditBoard'),
    ADD_TASK: lazyLoad(() => import('../Modals/AddTaskForm'), 'AddTaskForm'),
    EDIT_TASK: lazyLoad(() => import('../Modals/EditTaskModal'), 'EditTaskModal'),
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

              <div className="mr-12">
                <Button onClick={() => openModal('ADD_TASK')}>+ Add New Task</Button>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="absolute right-5">
                    <EllipsisVertical />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-40">
                  <Button onClick={() => openModal('EDIT_BOARD')}>Edit Board</Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete Board</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent size="sm">
                      <AlertDialogHeader>
                        <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                          <Trash2Icon />
                        </AlertDialogMedia>
                        <AlertDialogTitle>Delete this Board?</AlertDialogTitle>
                        <AlertDialogDescription>
                          {` Are you sure you want to delete the "${activeBoard.name}" task and its subtasks? This action cannot be reversed.`}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" onClick={handleBoardDelete}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </PopoverContent>
              </Popover>
            </header>
            <main className="flex-1">
              <Suspense fallback={<LoadingSpinner />}>
                <Outlet />
              </Suspense>
            </main>
          </div>
        </SidebarProvider>
      ) : (
        <div className="w-full h-screen grid place-content-center">
          <Button onClick={() => openModal('ADD_BOARD')}>+ Create new board</Button>
        </div>
      )}
      {activeModal && (
        <Suspense fallback={<LoadingSpinner />}>
          <Modal onClose={closeModal}>
            {(() => {
              const ModalComponent = Modal_Components[activeModal];
              return ModalComponent ? <ModalComponent onClose={closeModal} /> : null;
            })()}
          </Modal>
        </Suspense>
      )}
      <Toaster />
    </div>
  );
}
