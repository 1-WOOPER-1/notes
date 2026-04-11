import { UIProvider } from "@/context/UIContext";
import { NotesProvider } from "@/context/NotesContext";
import { NoteActionsProvider } from "@/context/NoteActionsContext";

import { Sidebar } from "@components/UI/Sidebar/Sidebar";
import { Header } from "@components/UI/Header/Header";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <NotesProvider>
      <UIProvider>
        <NoteActionsProvider>
          <Header />
          <Sidebar />
          <Outlet />
        </NoteActionsProvider>
      </UIProvider>
    </NotesProvider>
  );
}
