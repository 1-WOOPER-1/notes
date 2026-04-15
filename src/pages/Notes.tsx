import styles from "@/App.module.scss";
import { NoteEditor } from "@components/NoteEditor/NoteEditor";
import { NotesList } from "@components/NotesList/NotesList";

export function Notes() {
  return (
    <div>
      <main className={styles.main}>
        <NoteEditor />
        <NotesList category="notes" />
      </main>
    </div>
  );
}
