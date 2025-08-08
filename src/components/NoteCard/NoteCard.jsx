import styles from "./NoteCard.module.css";
import { NoteCardToolbar } from "./NoteCardToolbar.";

export function NoteCard({ note }) {
  return (
    <div className={styles.noteCard}>
      <span>{note.title}</span>
      <p>{note.body}</p>
      <NoteCardToolbar />
    </div>
  );
}
