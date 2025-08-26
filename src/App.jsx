import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./components/AppRouter.jsx";
import { Sidebar } from "@components/Sidebar/Sidebar.jsx";

export function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <AppRouter />
    </BrowserRouter>
  );
}
