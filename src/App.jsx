import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import { NOTES } from "./data/notes.js";
import { Header } from "@components/Header/Header.jsx";
import { NoteEditor } from "@components/NoteEditor/NoteEditor.jsx";
import { UserModal } from "@components/UserModal/UserModal.jsx";
import { NoteActionsContext } from "./context/NoteActionsContext.js";
import { NotesList } from "@components/NotesList/NotesList.jsx";

export function App() {
  const [allNotes, setAllNotes] = useState(NOTES);
  const [query, setQuery] = useState("");

  const [openedNote, setOpenedNote] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listView, setlistView] = useState(false);

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

  function toggleModal() {
    setIsModalOpen((prev) => !prev);
  }

  return (
    <div>
      <Header
        setQuery={setQuery}
        toggleModal={toggleModal}
        listView={listView}
        setlistView={setlistView}
      />
      {isModalOpen && <UserModal toggleModal={toggleModal} />}
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
        <NoteActionsContext.Provider value={{ openNote, pinNote, deleteNote }}>
          <NotesList
            allNotes={allNotes}
            setAllNotes={setAllNotes}
            query={query}
            listView={listView}
          />
        </NoteActionsContext.Provider>
      </main>
    </div>
  );
}
