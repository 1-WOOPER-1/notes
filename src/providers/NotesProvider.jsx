import { useState, useEffect } from "react";
import { NotesContext } from "@/context/NotesContext.js";
import { NOTES } from "@/data/notes.js";
import { ARCHIVED_NOTES } from "@/data/archivedNotes.js";
import { BIN_NOTES } from "@/data/binNotes.js";
import { LocalStorageService } from "@/utils/localStorage.js";

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState(
    LocalStorageService.getItem("notes") || NOTES
  );
  const [archivedNotes, setArchivedNotes] = useState(
    LocalStorageService.getItem("archivedNotes") || ARCHIVED_NOTES
  );

  const [binNotes, setBinNotes] = useState(() => {
    const storageBinNotes = LocalStorageService.getItem("binNotes");
    return filterBinNotes(storageBinNotes ? storageBinNotes : BIN_NOTES);
  });

  function filterBinNotes(notes) {
    return notes.filter((n) => {
      const deleteDate = new Date(n.deleteDate);
      const now = new Date();
      return deleteDate > now;
    });
  }

  useEffect(() => {
    LocalStorageService.setItem("notes", notes);
  }, [notes]);

  useEffect(() => {
    LocalStorageService.setItem("archivedNotes", archivedNotes);
  }, [archivedNotes]);

  useEffect(() => {
    LocalStorageService.setItem("binNotes", binNotes);
  }, [binNotes]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        archivedNotes,
        setArchivedNotes,
        binNotes,
        setBinNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
