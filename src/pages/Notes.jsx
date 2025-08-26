import { useEffect, useState } from "react";
import styles from "@/App.module.scss";
import { NOTES } from "@/data/notes.js";
import { ARCHIVED_NOTES } from "@/data/archivedNotes.js";
import { Header } from "@components/Header/Header.jsx";
import { NoteEditor } from "@components/NoteEditor/NoteEditor.jsx";
import { NoteActionsContext } from "@/context/NoteActionsContext.js";
import { NotesList } from "@components/NotesList/NotesList.jsx";
import { LocalStorageService } from "@/utils/localStorage.js";
import { Sidebar } from "@components/Sidebar/Sidebar.jsx";

export function Notes() {
  const [allNotes, setAllNotes] = useState(
    LocalStorageService.getItem("allNotes") || NOTES
  );
  const [archivedNotes, setArchivedNotes] = useState(
    LocalStorageService.getItem("archivedNotes") || ARCHIVED_NOTES
  );

  const [openedNote, setOpenedNote] = useState(
    LocalStorageService.getItem("openedNote") || null
  );
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    isEditorOpen
      ? document.body.classList.add("scrollLocked")
      : document.body.classList.remove("scrollLocked");
  }, [isEditorOpen]);

  useEffect(() => {
    if (openedNote) {
      openNote(openedNote);
    }
  }, []);

  useEffect(() => {
    LocalStorageService.setItem("allNotes", allNotes);
  }, [allNotes]);

  useEffect(() => {
    LocalStorageService.setItem("archivedNotes", archivedNotes);
  }, [archivedNotes]);

  function openNote(note) {
    setOpenedNote(note);
    setIsEditorOpen(true);
    LocalStorageService.setItem("openedNote", note);
  }

  function closeNote() {
    setOpenedNote(null);
    LocalStorageService.removeItem("openedNote");
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

  function archiveNote(note) {
    setArchivedNotes([...archivedNotes, { ...note, isPinned: false }]);
    setAllNotes(allNotes.filter((n) => n.id !== note.id));
  }

  return (
    <div>
      <Header />
      <Sidebar />
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
        <NoteActionsContext.Provider
          value={{ openNote, pinNote, deleteNote, archiveNote }}
        >
          <NotesList allNotes={allNotes} setAllNotes={setAllNotes} />
        </NoteActionsContext.Provider>
      </main>
    </div>
  );
}
