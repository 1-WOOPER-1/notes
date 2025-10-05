import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routerConfig } from "@/router/routes.jsx";

const router = createBrowserRouter(routerConfig);

export function App() {
  return <RouterProvider router={router} />;
}
