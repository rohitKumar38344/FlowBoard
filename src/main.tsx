import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store/store.ts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/Layout/DashboardLayout.tsx";
import { Index } from "./index.tsx";
import { Board } from "./features/board/Board.tsx";
// import { BoardModalProvider } from "./components/Modals/BoardModalProvider.tsx";
import { ModalProvider } from "./components/Modals/ModalContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ModalProvider>
         <BrowserRouter>
           <Routes>
             <Route path="/" element={<DashboardLayout />}>
              <Route index={true} element={<Index />} />
                <Route path="board/:boardId" element={<Board />}>
                <Route path="task/:taskId" element={<h2>Task View</h2>} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  </StrictMode>,
);
