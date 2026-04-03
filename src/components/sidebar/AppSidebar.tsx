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
  const dispatch = useAppDispatch();
  const { openModal } = useModal();
  const renderBoards = Object.values(boards).map((board, index) => (
    <NavLink
      key={index}
      to={`/board/${board.id}`}
      className={({ isActive, isPending }) => {
        return isActive ? 'active' : isPending ? 'pending' : '';
      }}
    >
      <Button className="flex-row" onClick={() => dispatch(boardSelected(board.id))}>
        <SquareKanban />
        {board.name}
      </Button>
    </NavLink>
  ));

  return (
    <Sidebar>
      <NavLink to={'/'}>
        <SidebarHeader className="flex-row">
          <Kanban />
          <p>kanban</p>
        </SidebarHeader>
      </NavLink>
      <h2 className="ml-2">ALL BOARDS ({renderBoards.length})</h2>
      <SidebarContent>
        <SidebarGroup>
          <ButtonGroup orientation={'vertical'}>
            {renderBoards}
            <Button className="" onClick={() => openModal('ADD_BOARD')}>
              + Create New Board
            </Button>
          </ButtonGroup>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
