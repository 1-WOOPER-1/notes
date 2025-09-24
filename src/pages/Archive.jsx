import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

  const { noteId } = useParams();
  const { setOpenedNote } = useUI();

  useEffect(() => {
    if (noteId) {
      const note = archivedNotes.find((n) => n.id === +noteId);
      if (note) setOpenedNote(note);
    } else {
      setOpenedNote(null);
    }
  }, [noteId]);

  useEffect(() => {
    LocalStorageService.setItem("archivedNotes", archivedNotes);
  }, [archivedNotes]);

  return (
    <div>
      <main className={styles.main}>
        <NoteEditor notes={archivedNotes} setNotes={setArchivedNotes} />
        <NotesList
          notes={archivedNotes}
          setNotes={setArchivedNotes}
          setArchivedNotes={setArchivedNotes}
        />
      </main>
    </div>
  );
}
