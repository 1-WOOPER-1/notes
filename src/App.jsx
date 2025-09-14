import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./components/AppRouter.jsx";
import { Sidebar } from "@components/UI/Sidebar/Sidebar.jsx";
import { Header } from "@components/UI/Header/Header.jsx";
import { UIProvider } from "@/providers/UIProvider.jsx";

export function App() {
  return (
    <BrowserRouter>
      <UIProvider>
        <Header />
        <Sidebar />
        <AppRouter />
      </UIProvider>
    </BrowserRouter>
  );
}
