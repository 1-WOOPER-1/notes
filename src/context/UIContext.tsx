import {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { LocalStorageService } from "@/utils/localStorage";
import { Note } from "@/types/note";

interface UILayoutContextType {
  listView: boolean;
  toggleView: () => void;
  openedNote: Note | null;
  setOpenedNote: Dispatch<SetStateAction<Note | null>>;
}

interface SearchContexttType {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

const UILayoutContext = createContext<UILayoutContextType | undefined>(
  undefined,
);
const SearchContext = createContext<SearchContexttType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [listView, setlistView] = useState<boolean>(
    LocalStorageService.getItem("listView") || false,
  );
  const [openedNote, setOpenedNote] = useState<Note | null>(null);

  const toggleView = useCallback(
    () =>
      setlistView((prev: boolean) => {
        const newListView = !prev;
        LocalStorageService.setItem("listView", String(newListView));
        return newListView;
      }),
    [],
  );

  const layoutValue = useMemo(
    () => ({
      listView,
      toggleView,
      openedNote,
      setOpenedNote,
    }),
    [listView, toggleView, openedNote, setOpenedNote],
  );

  const searchValue = useMemo(
    () => ({
      query,
      setQuery,
    }),
    [query],
  );

  return (
    <SearchContext.Provider value={searchValue}>
      <UILayoutContext.Provider value={layoutValue}>
        {children}
      </UILayoutContext.Provider>
    </SearchContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UILayoutContext);
  if (!context) throw new Error("useUI must be used within UIProvider");
  return context;
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used within UIProvider");
  return context;
}
