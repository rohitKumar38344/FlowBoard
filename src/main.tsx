import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store/store.ts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/Layout/DashboardLayout.tsx";
import { Index } from "./index.tsx";
import { Board } from "./features/board/Board.tsx";
import { AddBoardModalProvider } from "./components/Modals/AddBoardModalProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AddBoardModalProvider>
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
      </AddBoardModalProvider>
    </Provider>
  </StrictMode>,
);
/*
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);
*/
