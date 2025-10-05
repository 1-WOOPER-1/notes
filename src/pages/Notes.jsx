import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "@/App.module.scss";
import { NoteEditor } from "@components/NoteEditor/NoteEditor.jsx";
import { NotesList } from "@components/NotesList/NotesList.jsx";
import { useUI } from "@/hooks/useUI.js";
import { useNotes } from "@/hooks/useNotes.js";

export function Notes() {
  const { notes, setNotes } = useNotes();
  const { noteId } = useParams();
  const { setOpenedNote } = useUI();

  useEffect(() => {
    if (noteId) {
      const note = notes.find((n) => n.id === +noteId);
      if (note) setOpenedNote(note);
    } else {
      setOpenedNote(null);
    }
  }, [noteId]);

  return (
    <div>
      <main className={styles.main}>
        <NoteEditor />
        <NotesList notes={notes} setNotes={setNotes} />
      </main>
    </div>
  );
}
