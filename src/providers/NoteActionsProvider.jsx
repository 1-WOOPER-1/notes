import { useEffect, useState } from "react";
import { useLocation, useNavigate, useMatches } from "react-router-dom";
import { NoteActionsContext } from "@/context/NoteActionsContext.js";
import { getBasePath } from "@/utils/routeUtils.js";
import { useUI } from "@/hooks/useUI.js";
import { useNotes } from "@/hooks/useNotes.js";

export function NoteActionsProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { setOpenedNote } = useUI();
  const [pendingNote, setPendingNote] = useState(null);
  const matches = useMatches();

  const notesType = matches.at(-1).handle.filter;
  const { notes, setNotes, archivedNotes, setArchivedNotes } = useNotes();
  const typeMap = {
    notes: [notes, setNotes],
    archive: [archivedNotes, setArchivedNotes],
  };
  const [localNotes, setLocalNotes] = typeMap[notesType];

  useEffect(() => {
    if (pendingNote && localNotes.find((n) => n.id === pendingNote.id)) {
      setTimeout(() => openNote(pendingNote), 500);
      setPendingNote(null);
    }
  }, [localNotes, pendingNote]);

  function createNewNote() {
    const newNote = {
      id: Date.now(),
      title: "",
      body: {
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
                },
              ],
            },
          ],
        },
      },
      isPinned: false,
    };
    setPendingNote(newNote);
    setLocalNotes((prev) => [{ ...newNote }, ...prev]);
  }

  function openNote(note) {
    setOpenedNote(note);
    const basePath = getBasePath(location.pathname);
    if (basePath === "/") {
      navigate(`${location.pathname}/${note.id}`);
    } else {
      navigate(`${basePath}/${note.id}`);
    }
  }

  function pinNote(note) {
    setLocalNotes((prev) =>
      prev.map((n) =>
        n.id === note.id ? { ...n, isPinned: !note.isPinned } : n
      )
    );
  }

  function saveNote(note) {
    setLocalNotes((prev) =>
      prev.map((n) => (n.id === note.id ? { ...note } : n))
    );
  }

  function deleteNote(note) {
    setLocalNotes((prev) => prev.filter((n) => n.id !== note.id));
  }

  function archiveNote(note) {
    setArchivedNotes((prev) => [...prev, { ...note, isPinned: false }]);
    setLocalNotes((prev) => prev.filter((n) => n.id !== note.id));
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
