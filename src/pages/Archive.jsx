import { useState, useEffect } from "react";
import { ARCHIVED_NOTES } from "@/data/archivedNotes.js";
import { NotesList } from "@components/NotesList/NotesList.jsx";
import { NoteEditor } from "@components/NoteEditor/NoteEditor.jsx";
import styles from "@/App.module.scss";
import { LocalStorageService } from "@/utils/localStorage.js";
import { useUI } from "@/hooks/useUI.js";

export function Archive() {
  const [archivedNotes, setArchivedNotes] = useState(
    LocalStorageService.getItem("archivedNotes") || ARCHIVED_NOTES
  );
  const { isEditorOpen } = useUI();

  useEffect(() => {
    LocalStorageService.setItem("archivedNotes", archivedNotes);
  }, [archivedNotes]);

  return (
    <main className={`${styles.main} ${isEditorOpen ? styles.moveRight : ""}`}>
      <NoteEditor notes={archivedNotes} setNotes={setArchivedNotes} />
      <NotesList
        notes={archivedNotes}
        setNotes={setArchivedNotes}
        setArchivedNotes={setArchivedNotes}
      />
    </main>
  );
}
