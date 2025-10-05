import { UIProvider } from "@/providers/UIProvider.jsx";
import { NotesProvider } from "@/providers/NotesProvider.jsx";
import { NoteActionsProvider } from "@/providers/NoteActionsProvider.jsx";

import { Sidebar } from "@components/UI/Sidebar/Sidebar.jsx";
import { Header } from "@components/UI/Header/Header.jsx";
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
