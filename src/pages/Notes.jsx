import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  const { noteId } = useParams();
  const { setOpenedNote } = useUI();

  useEffect(() => {
    if (noteId) {
      const note = allNotes.find((n) => n.id === +noteId);
      if (note) setOpenedNote(note);
    } else {
      setOpenedNote(null);
    }
  }, [noteId]);

  useEffect(() => {
    LocalStorageService.setItem("allNotes", allNotes);
  }, [allNotes]);

  useEffect(() => {
    LocalStorageService.setItem("archivedNotes", archivedNotes);
  }, [archivedNotes]);

  return (
    <div>
      <main className={styles.main}>
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
