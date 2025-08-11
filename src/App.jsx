import { useState } from "react";
import styles from "./App.module.scss";
import { NoteCard } from "./components/NoteCard/NoteCard.jsx";
import { NOTES } from "./data/notes.js";
import { Header } from "./components/Header/Header.jsx";

export function App() {
  const [allNotes, setAllNotes] = useState(NOTES);
  const [query, setQuery] = useState("");

  const pinnedNotes = allNotes.filter((note) => note.isPinned);
  const otherNotes = allNotes.filter((note) => !note.isPinned);

  const filteredNotes = allNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.body.toLowerCase().includes(query.toLowerCase())
  );

  function pinNote(note) {
    setAllNotes(
      allNotes.map((n) =>
        n.id === note.id ? { ...n, isPinned: !note.isPinned } : n
      )
    );
  }

  function deleteNote(note) {
    setAllNotes(allNotes.filter((n) => n.id !== note.id));
  }

  return (
    <div>
      <Header setQuery={setQuery} />
      <main className={styles.main}>
        {!!query.trim().length ? (
          <div className={styles.notesContainer}>
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                pinNote={pinNote}
                deleteNote={deleteNote}
              />
            ))}
          </div>
        ) : (
          <>
            {!!pinnedNotes.length && (
              <div>
                <h4>Pinned</h4>
                <div className={styles.notesContainer}>
                  {pinnedNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      pinNote={pinNote}
                      deleteNote={deleteNote}
                    />
                  ))}
                </div>
              </div>
            )}
            {!!pinnedNotes.length && !!otherNotes.length && <h4>Others</h4>}
            <div className={styles.notesContainer}>
              {otherNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  pinNote={pinNote}
                  deleteNote={deleteNote}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
