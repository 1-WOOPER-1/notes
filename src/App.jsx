import { useState } from "react";
import styles from "./App.module.css";
import { NoteCard } from "./components/NoteCard/NoteCard.jsx";
import { SearchInput } from "./components/SearchInput.jsx";
import { SettingsBtn } from "./components/SettingsBtn/SettingsBtn.jsx";
import { NOTES } from "./data/notes.js";

export function App() {
  const [notes, setNotes] = useState(NOTES.filter((note) => !note.isPinned));
  const [pinnedNotes, setPinnedNotes] = useState(
    NOTES.filter((note) => note.isPinned)
  );

  function pinNote(note) {
    note.isPinned = !note.isPinned;
    if (note.isPinned) {
      setNotes(notes.filter((n) => n.id !== note.id));
      setPinnedNotes([...pinnedNotes, note]);
    } else {
      setPinnedNotes(pinnedNotes.filter((n) => n.id !== note.id));
      setNotes([...notes, note]);
    }
  }

  function deleteNote(note) {
    setNotes(notes.filter((n) => n.id !== note.id));
    setPinnedNotes(pinnedNotes.filter((n) => n.id !== note.id));
  }

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <h1 className={styles.logo}>NOTES</h1>
          <div className={styles.headerSecondary}>
            <SearchInput />
            <SettingsBtn />
          </div>
        </div>
      </header>
      <main className={styles.main}>
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
        {!!pinnedNotes.length && !!notes.length && <h4>Others</h4>}
        <div className={styles.notesContainer}>
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              pinNote={pinNote}
              deleteNote={deleteNote}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
