import { useEffect, useState } from "react";
import styles from "@/App.module.scss";
import { NOTES } from "@/data/notes.js";
import { ARCHIVED_NOTES } from "@/data/archivedNotes.js";
import { NoteEditor } from "@components/NoteEditor/NoteEditor.jsx";
import { NotesList } from "@components/NotesList/NotesList.jsx";
import { LocalStorageService } from "@/utils/localStorage.js";
import { useUI } from "@/hooks/useUI.js";

export function Notes() {
  const [allNotes, setAllNotes] = useState(
    LocalStorageService.getItem("allNotes") || NOTES
  );
  const [archivedNotes, setArchivedNotes] = useState(
    LocalStorageService.getItem("archivedNotes") || ARCHIVED_NOTES
  );

  const { isEditorOpen } = useUI();

  useEffect(() => {
    isEditorOpen
      ? document.body.classList.add("scrollLocked")
      : document.body.classList.remove("scrollLocked");
  }, [isEditorOpen]);

  useEffect(() => {
    LocalStorageService.setItem("allNotes", allNotes);
  }, [allNotes]);

  useEffect(() => {
    LocalStorageService.setItem("archivedNotes", archivedNotes);
  }, [archivedNotes]);

  return (
    <div>
      <main
        className={`${styles.main} ${isEditorOpen ? styles.moveRight : ""}`}
      >
        <NoteEditor notes={allNotes} setNotes={setAllNotes} />
        <NotesList
          notes={allNotes}
          setNotes={setAllNotes}
          setArchivedNotes={setArchivedNotes}
        />
      </main>
    </div>
  );
}
