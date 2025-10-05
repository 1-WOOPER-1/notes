import { useState, useEffect } from "react";
import { NotesContext } from "@/context/NotesContext.js";
import { NOTES } from "@/data/notes.js";
import { ARCHIVED_NOTES } from "@/data/archivedNotes.js";
import { LocalStorageService } from "@/utils/localStorage.js";

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState(
    LocalStorageService.getItem("notes") || NOTES
  );
  const [archivedNotes, setArchivedNotes] = useState(
    LocalStorageService.getItem("archivedNotes") || ARCHIVED_NOTES
  );

  useEffect(() => {
    LocalStorageService.setItem("notes", notes);
  }, [notes]);

  useEffect(() => {
    LocalStorageService.setItem("archivedNotes", archivedNotes);
  }, [archivedNotes]);

  return (
    <NotesContext.Provider
      value={{ notes, setNotes, archivedNotes, setArchivedNotes }}
    >
      {children}
    </NotesContext.Provider>
  );
}
