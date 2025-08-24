import { NotesContainer } from "@components/NotesContainer/NotesContainer.jsx";
import styles from "./NotesList.module.scss";

export function NotesList({ allNotes, setAllNotes, query, listView }) {
  const pinnedNotes = allNotes.filter((note) => note.isPinned);
  const otherNotes = allNotes.filter((note) => !note.isPinned);
  const filteredNotes = allNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.body.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={`${styles.notesList} ${listView ? styles.listView : ""}`}>
      {!!query.trim().length ? (
        <NotesContainer notes={filteredNotes} listView={listView} />
      ) : (
        <>
          {!!pinnedNotes.length && (
            <div>
              <h4>Pinned</h4>
              <NotesContainer
                notes={pinnedNotes}
                reorderNotes={setAllNotes}
                listView={listView}
              />
            </div>
          )}
          {!!pinnedNotes.length && !!otherNotes.length && <h4>Others</h4>}
          <NotesContainer
            notes={otherNotes}
            reorderNotes={setAllNotes}
            listView={listView}
          />
        </>
      )}
    </div>
  );
}
