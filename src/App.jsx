import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routerConfig } from "@/router/routes.jsx";

const router = createBrowserRouter(routerConfig, { basename: "/notes" });

export function App() {
  return <RouterProvider router={router} />;
}
