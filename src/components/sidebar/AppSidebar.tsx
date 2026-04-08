import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { ButtonGroup } from '../ui/button-group';
import { Button } from '../ui/button';
import { boardSelected, selectAllBoards } from '@/features/board/boardSlice';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { SquareKanban, Kanban } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useModal } from '@/hooks/useModal';

export function AppSidebar() {
  const boards = useAppSelector(selectAllBoards);
  const { openModal } = useModal();
  const dispatch = useAppDispatch();
  const renderBoards = Object.values(boards).map((board, index) => (
    <NavLink
      key={index}
      to={`/board/${board.boardId}`}
      className={({ isActive, isPending }) => {
        return isActive ? 'active' : isPending ? 'pending' : '';
      }}
    >
      {({ isActive }) => (
        <Button
          className="w-full flex-row justify-start"
          variant={isActive ? 'default' : 'outline'}
          onClick={() => dispatch(boardSelected(board.boardId))}
        >
          <SquareKanban />
          {board.name}
        </Button>
      )}
    </NavLink>
  ));

  return (
    <Sidebar>
      <NavLink to={'/'}>
        <SidebarHeader className="flex-row">
          <Kanban />
          <p>Flowboard</p>
        </SidebarHeader>
      </NavLink>
      <h2 className="ml-2">
        ALL BOARDS ({renderBoards.length}){' '}
        {/* {activeBoardId === null && <span className="text-red-500"> - No board selected</span>} */}
      </h2>
      <SidebarContent>
        <SidebarGroup>
          <ButtonGroup orientation={'vertical'} className="gap-2">
            {renderBoards.length > 0 ? (
              renderBoards
            ) : (
              <p className="text-sm text-gray-500">No boards available</p>
            )}
            <Button className="w-full" onClick={() => openModal('ADD_BOARD')}>
              + Create New Board
            </Button>
          </ButtonGroup>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
