import { useEffect, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { Lexical } from "./Lexical.jsx";
import styles from "./NoteEditor.module.scss";
import { useUI } from "@/hooks/useUI.js";
import { getBasePath } from "@/utils/routeUtils.js";

export function NoteEditor({ notes, setNotes }) {
  const editorRef = useRef(null);

  const { noteId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { isEditorOpen, setIsEditorOpen } = useUI();
  const openedNote = notes.find((n) => n.id === +noteId) || null;

  function closeEditor() {
    navigate(getBasePath(location.pathname));
  }

  function saveNote(note) {
    setNotes((prev) => prev.map((n) => (n.id === note.id ? { ...note } : n)));
  }

  useEffect(() => {
    setIsEditorOpen(!!openedNote);
  }, [openedNote]);

  return (
    <CSSTransition
      nodeRef={editorRef}
      in={isEditorOpen}
      timeout={500}
      classNames={{
        enter: styles.noteEditorEnter,
        enterActive: styles.noteEditorEnterActive,
        enterDone: styles.noteEditorEnterDone,
        exit: styles.noteEditorExit,
        exitActive: styles.noteEditorExitActive,
        exitDone: styles.noteEditorExitDone,
      }}
    >
      <div ref={editorRef} className={styles.noteEditor}>
        <Lexical
          note={{ ...openedNote }}
          closeEditor={closeEditor}
          saveNote={saveNote}
        />
      </div>
    </CSSTransition>
  );
}
