import {
  useEffect,
  useState,
  useContext,
  ReactNode,
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { useLocation, useNavigate, useMatches } from "react-router-dom";
import { SerializedEditorState, SerializedLexicalNode } from "lexical";

import { joinPaths } from "@/utils/routeUtils";
import { useUI } from "./UIContext";
import { useNotes } from "./NotesContext";
import { Note } from "@/types/note";

interface NotesActionsContextType {
  createNewNote: () => void;
  openNote: (note: Note) => void;
  pinNote: (note: Note) => void;
  saveNote: (note: Note) => void;
  deleteNote: (note: Note) => void;
  archiveNote: (note: Note) => void;
}

interface ITypeMap {
  notes: [Note[], Dispatch<SetStateAction<Note[]>>];
  archive: [Note[], Dispatch<SetStateAction<Note[]>>];
  bin: [Note[], Dispatch<SetStateAction<Note[]>>];
}

interface RouteHandle {
  filter: keyof ITypeMap;
}

export function createEmptyBody(): SerializedEditorState {
  return {
    root: {
      type: "root",
      version: 1,
      direction: "ltr",
      format: "",
      indent: 0,
      children: [
        {
          type: "paragraph",
          version: 1,
          direction: "ltr",
          format: "",
          indent: 0,
          children: [
            {
              type: "text",
              version: 1,
              text: "",
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
            } as unknown as SerializedLexicalNode,
          ],
        } as unknown as SerializedLexicalNode,
      ],
    },
  };
}

const NoteActionsContext = createContext<NotesActionsContextType | undefined>(
  undefined,
);

export function NoteActionsProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { setOpenedNote } = useUI();
  const [pendingNote, setPendingNote] = useState<Note | null>(null);
  const matches = useMatches();

  const lastMatch = matches.at(-1);
  const handle = lastMatch?.handle as RouteHandle | undefined;
  const notesType = handle?.filter || "notes";

  const {
    notes,
    setNotes,
    archivedNotes,
    setArchivedNotes,
    binNotes,
    setBinNotes,
  } = useNotes();
  const typeMap: ITypeMap = {
    notes: [notes, setNotes],
    archive: [archivedNotes, setArchivedNotes],
    bin: [binNotes, setBinNotes],
  };
  const [localNotes, setLocalNotes] = typeMap[notesType];

  useEffect(() => {
    if (pendingNote && localNotes.find((n: Note) => n.id === pendingNote.id)) {
      setTimeout(() => openNote(pendingNote), 500);
      setPendingNote(null);
    }
  }, [localNotes, pendingNote]);

  const createNewNote = useCallback(() => {
    const newNote: Note = {
      id: String(Date.now()),
      title: "",
      body: createEmptyBody(),
      isPinned: false,
      createdAt: new Date().toISOString(),
      editedAt: new Date().toISOString(),
    };
    setPendingNote(newNote);
    setLocalNotes((prev) => [{ ...newNote }, ...prev]);
  }, [setLocalNotes]);

  const openNote = useCallback(
    (note: Note) => {
      setOpenedNote(note);
      navigate(joinPaths(location.pathname, note.id));
    },
    [location.pathname, setOpenedNote, navigation],
  );

  const pinNote = useCallback(
    (note: Note) => {
      setLocalNotes((prev) =>
        prev.map((n) =>
          n.id === note.id ? { ...n, isPinned: !note.isPinned } : n,
        ),
      );
    },
    [setLocalNotes],
  );

  const saveNote = useCallback(
    (note: Note) => {
      setLocalNotes((prev) =>
        prev.map((n) => (n.id === note.id ? { ...note } : n)),
      );
    },
    [setLocalNotes],
  );

  const deleteNote = useCallback(
    (note: Note) => {
      const now = new Date();
      const plus30Days = new Date(now);
      plus30Days.setDate(now.getDate() + 30);
      const deleteDate = plus30Days.toISOString();
      setBinNotes((prev) => [
        ...prev,
        { ...note, isPinned: false, deleteDate: deleteDate },
      ]);
      setLocalNotes((prev: Note[]) => prev.filter((n) => n.id !== note.id));
    },
    [setLocalNotes, setBinNotes],
  );

  const archiveNote = useCallback(
    (note: Note) => {
      setArchivedNotes((prev) => [...prev, { ...note, isPinned: false }]);
      setLocalNotes((prev: Note[]) => prev.filter((n) => n.id !== note.id));
    },
    [setLocalNotes, setArchivedNotes],
  );

  const value = useMemo(
    () => ({
      createNewNote,
      openNote,
      pinNote,
      saveNote,
      deleteNote,
      archiveNote,
    }),
    [createNewNote, openNote, pinNote, saveNote, deleteNote, archiveNote],
  );

  return (
    <NoteActionsContext.Provider value={value}>
      {children}
    </NoteActionsContext.Provider>
  );
}

export function useNoteActions() {
  const context = useContext(NoteActionsContext);
  if (!context)
    throw new Error("useNoteActions must be used within NoteActionsProvider");
  return context;
}
