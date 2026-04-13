import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { NOTES } from "@/data/notes";
import { ARCHIVED_NOTES } from "@/data/archivedNotes";
import { BIN_NOTES } from "@/data/binNotes";
import { LocalStorageService } from "@/utils/localStorage";
import { Note } from "@/types/note";

interface NotesContextType {
  notes: Note[];
  setNotes: Dispatch<SetStateAction<Note[]>>;
  archivedNotes: Note[];
  setArchivedNotes: Dispatch<SetStateAction<Note[]>>;
  binNotes: Note[];
  setBinNotes: Dispatch<SetStateAction<Note[]>>;
  reorderNotes: (
    callback: Dispatch<SetStateAction<Note[]>>,
    activeId: string,
    overId: string,
  ) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>(
    LocalStorageService.getItem("notes") || NOTES,
  );
  const [archivedNotes, setArchivedNotes] = useState(
    LocalStorageService.getItem("archivedNotes") || ARCHIVED_NOTES,
  );

  const [binNotes, setBinNotes] = useState(() => {
    const storageBinNotes = LocalStorageService.getItem("binNotes");
    return filterBinNotes(storageBinNotes ? storageBinNotes : BIN_NOTES);
  });

  function filterBinNotes(notes: Note[]) {
    return notes.filter((n) => {
      if ("deleteDate" in n) {
        const deleteDate = new Date(n.deleteDate);
        const now = new Date();
        return deleteDate > now;
      }
      return false;
    });
  }

  const reorderNotes = useCallback(
    (
      callback: Dispatch<SetStateAction<Note[]>>,
      activeId: string,
      overId: string,
    ) =>
      callback((prev) => {
        const oldIndex = prev.findIndex((n) => n.id === activeId);
        const newIndex = prev.findIndex((n) => n.id === overId);
        return arrayMove(prev, oldIndex, newIndex);
      }),
    [],
  );

  useEffect(() => {
    LocalStorageService.setItem("notes", notes);
  }, [notes]);

  useEffect(() => {
    LocalStorageService.setItem("archivedNotes", archivedNotes);
  }, [archivedNotes]);

  useEffect(() => {
    LocalStorageService.setItem("binNotes", binNotes);
  }, [binNotes]);

  const value = useMemo(
    () => ({
      notes,
      setNotes,
      archivedNotes,
      setArchivedNotes,
      binNotes,
      setBinNotes,
      reorderNotes,
    }),
    [notes, archivedNotes, binNotes, reorderNotes],
  );

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) throw new Error("useNotes must be used within NotesProvider");
  return context;
}
