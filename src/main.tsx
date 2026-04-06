import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './app/store/store.ts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/Layout/DashboardLayout.tsx';
import { Index } from './index.tsx';

import { ModalProvider } from './components/Modals/ModalContextProvider.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import { lazyLoad } from './utils/lazyLoad.ts';

const Board = lazyLoad(() => import('./features/board/Board.tsx'), 'Board');
const TaskViewModal = lazyLoad(
  () => import('./components/Modals/TaskViewModal.tsx'),
  'TaskViewModal'
);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardLayout />} errorElement={<ErrorPage />}>
              <Route index={true} element={<Index />} />
              <Route path="board/:boardId" element={<Board />}>
                <Route path="task/:taskId" element={<TaskViewModal />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  </StrictMode>
);

//http://localhost:5173/board/b1?taskId=83434
// function wait(component, time: number){
//   return new Promise((resolve) => setTimeout(() => resolve(component), time))
// }
