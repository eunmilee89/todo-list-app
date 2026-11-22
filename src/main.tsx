import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import TodoList from "./components/TodoList/TodoList.tsx";
import GrapeList from "./components/GrapeList/GrapeList.tsx";
import TodoSkeleton from "./components/TodoSkeleton/TodoSkeleton.tsx";
import GrapeDetail from "./components/GrapeDetail/GrapeDetail.tsx";
import NotFound from "./components/NotFound/NotFound.tsx";
import { DarkModeProvider } from "./components/context/DarkModeContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<TodoSkeleton />}>
        <App />
      </Suspense>
    ),
    children: [
      { index: true, element: <TodoList /> },
      { path: "grape-list", element: <GrapeList /> },
      { path: "/grape-list/:id", element: <GrapeDetail /> },
    ],
  },
  {
    path: "*",
    element: (
      <DarkModeProvider>
        <NotFound />
      </DarkModeProvider>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
