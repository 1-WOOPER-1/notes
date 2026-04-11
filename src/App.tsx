import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routerConfig } from "@/router/routes";

const router = createBrowserRouter(routerConfig, { basename: "/notes" });

export function App() {
  return <RouterProvider router={router} />;
}
