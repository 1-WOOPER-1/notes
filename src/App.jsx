import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import { NOTES } from "./data/notes.js";
import { Header } from "./components/Header/Header.jsx";
import { NoteEditor } from "./components/NoteEditor/NoteEditor.jsx";
import { NotesContainer } from "./components/NotesContainer/NotesContainer.jsx";

export function App() {
  const [allNotes, setAllNotes] = useState(NOTES);
  const [query, setQuery] = useState("");

  const pinnedNotes = allNotes.filter((note) => note.isPinned);
  const otherNotes = allNotes.filter((note) => !note.isPinned);

  const [openedNote, setOpenedNote] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    isEditorOpen
      ? document.body.classList.add("scrollLocked")
      : document.body.classList.remove("scrollLocked");
  }, [isEditorOpen]);

  function openNote(note) {
    setOpenedNote(note);
    setIsEditorOpen(true);
  }

  function closeNote() {
    setOpenedNote(null);
  }

  function saveNote(note) {
    setAllNotes(allNotes.map((n) => (n.id === note.id ? { ...note } : n)));
  }

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
      <main
        className={`${styles.main} ${isEditorOpen ? styles.moveRight : ""}`}
      >
        <NoteEditor
          note={openedNote}
          isOpen={isEditorOpen}
          closeEditor={setIsEditorOpen}
          closeNote={closeNote}
          saveNote={saveNote}
        />
        <div className={styles.notesList}>
          {!!query.trim().length ? (
            <NotesContainer
              notes={filteredNotes}
              openNote={openNote}
              pinNote={pinNote}
              deleteNote={deleteNote}
            />
          ) : (
            <>
              {!!pinnedNotes.length && (
                <div>
                  <h4>Pinned</h4>
                  <NotesContainer
                    notes={pinnedNotes}
                    reorderNotes={setAllNotes}
                    openNote={openNote}
                    pinNote={pinNote}
                    deleteNote={deleteNote}
                  />
                </div>
              )}
              {!!pinnedNotes.length && !!otherNotes.length && <h4>Others</h4>}
              <NotesContainer
                notes={otherNotes}
                reorderNotes={setAllNotes}
                openNote={openNote}
                pinNote={pinNote}
                deleteNote={deleteNote}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
