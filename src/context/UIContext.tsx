import {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { LocalStorageService } from "@/utils/localStorage";
import { Note } from "@/types/note";

interface UIContextType {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  listView: boolean;
  toggleView: () => void;
  openedNote: Note | null;
  setOpenedNote: Dispatch<SetStateAction<Note | null>>;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [listView, setlistView] = useState<boolean>(
    LocalStorageService.getItem("listView") || false,
  );
  const [openedNote, setOpenedNote] = useState<Note | null>(null);

  function toggleView() {
    setlistView((prev: boolean) => {
      const newListView = !prev;
      LocalStorageService.setItem("listView", String(newListView));
      return newListView;
    });
  }

  return (
    <UIContext.Provider
      value={{
        query,
        setQuery,
        listView,
        toggleView,
        openedNote,
        setOpenedNote,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within UIProvider");
  return context;
}
