import { NotesContainer } from "@components/NotesContainer/NotesContainer.jsx";
import styles from "./NotesList.module.scss";
import { useUI } from "@/hooks/useUI.js";
import { lexicalToPlainText } from "@/utils/lexicalUtils.js";

export function NotesList({ notes, setNotes }) {
  const { query, listView } = useUI();
  const pinnedNotes = notes.filter((note) => note.isPinned);
  const otherNotes = notes.filter((note) => !note.isPinned);
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      lexicalToPlainText(note.body).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={`${styles.notesList} ${listView ? styles.listView : ""}`}>
      {!!query.trim().length ? (
        <NotesContainer notes={filteredNotes} />
      ) : (
        <>
          {!!pinnedNotes.length && (
            <div>
              <h4>Pinned</h4>
              <NotesContainer notes={pinnedNotes} setNotes={setNotes} />
            </div>
          )}
          {!!pinnedNotes.length && !!otherNotes.length && <h4>Others</h4>}
          <NotesContainer notes={otherNotes} setNotes={setNotes} />
        </>
      )}
    </div>
  );
}
