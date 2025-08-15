import styles from "./NotesContainer.module.scss";
import { NoteCard } from "../NoteCard/NoteCard.jsx";

export function NotesContainer({ notes, openNote, pinNote, deleteNote }) {
  return (
    <div className={styles.notesContainer}>
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          openNote={openNote}
          pinNote={pinNote}
          deleteNote={deleteNote}
        />
      ))}
    </div>
  );
}
