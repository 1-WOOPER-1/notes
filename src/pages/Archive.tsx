import styles from "@/App.module.scss";
import { NoteEditor } from "@components/NoteEditor/NoteEditor";
import { NotesList } from "@components/NotesList/NotesList";

export function Archive() {
  return (
    <main className={styles.main}>
      <NoteEditor />
      <NotesList category="archivedNotes" />
    </main>
  );
}
