import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "@/App.module.scss";
import { NoteEditor } from "@components/NoteEditor/NoteEditor";
import { NotesList } from "@components/NotesList/NotesList";
import { useUI } from "@/context/UIContext";
import { useNotes } from "@/context/NotesContext";

export function Bin() {
  const { binNotes, setBinNotes } = useNotes();
  const { noteId } = useParams();
  const { setOpenedNote } = useUI();

  useEffect(() => {
    if (noteId) {
      const note = binNotes.find((n) => n.id === +noteId);
      if (note) setOpenedNote(note);
    } else {
      setOpenedNote(null);
    }
  }, [noteId]);

  return (
    <div>
      <main className={styles.main}>
        <NoteEditor />
        <NotesList notes={binNotes} setNotes={setBinNotes} />
      </main>
    </div>
  );
}
