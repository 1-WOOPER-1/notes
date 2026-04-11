import {
  useEffect,
  useState,
  useContext,
  ReactNode,
  createContext,
  Dispatch,
  SetStateAction,
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

  function createNewNote() {
    const newNote: Note = {
      id: Date.now(),
      title: "",
      body: createEmptyBody(),
      isPinned: false,
      createdAt: new Date().toISOString(),
      editedAt: new Date().toISOString(),
    };
    setPendingNote(newNote);
    setLocalNotes((prev: Note[]) => [{ ...newNote }, ...prev]);
  }

  function openNote(note: Note) {
    setOpenedNote(note);
    navigate(joinPaths(location.pathname, note.id.toString()));
  }

  function pinNote(note: Note) {
    setLocalNotes((prev: Note[]) =>
      prev.map((n) =>
        n.id === note.id ? { ...n, isPinned: !note.isPinned } : n,
      ),
    );
  }

  function saveNote(note: Note) {
    setLocalNotes((prev: Note[]) =>
      prev.map((n) => (n.id === note.id ? { ...note } : n)),
    );
  }

  function deleteNote(note: Note) {
    const now = new Date();
    const plus30Days = new Date(now);
    plus30Days.setDate(now.getDate() + 30);
    const deleteDate = plus30Days.toISOString();
    setBinNotes((prev) => [
      ...prev,
      { ...note, isPinned: false, deleteDate: deleteDate },
    ]);
    setLocalNotes((prev: Note[]) => prev.filter((n) => n.id !== note.id));
  }

  function archiveNote(note: Note) {
    setArchivedNotes((prev) => [...prev, { ...note, isPinned: false }]);
    setLocalNotes((prev: Note[]) => prev.filter((n) => n.id !== note.id));
  }

  return (
    <NoteActionsContext.Provider
      value={{
        createNewNote,
        openNote,
        pinNote,
        saveNote,
        deleteNote,
        archiveNote,
      }}
    >
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
