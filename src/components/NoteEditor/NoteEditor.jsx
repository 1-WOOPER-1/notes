import { useEffect, useState, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { IoCloseOutline } from "react-icons/io5";
import { Button } from "@components/Button/Button.jsx";
import styles from "./NoteEditor.module.scss";
import { useUI } from "@/hooks/useUI.js";
import { getBasePath } from "@/utils/routeUtils.js";

export function NoteEditor({ notes, setNotes }) {
  const [value, setValue] = useState("");
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
    setNotes((prev) =>
      prev.map((n) => (n.id === note.id ? { ...note, body: value } : n))
    );
  }

  useEffect(() => {
    if (openedNote) {
      setIsEditorOpen(true);
      setValue(openedNote.body);
    } else {
      setIsEditorOpen(false);
    }
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
        <h2>
          {openedNote?.id} {openedNote?.title}
        </h2>
        <textarea
          value={value}
          placeholder="Take a note"
          onChange={(event) => setValue(event.target.value)}
        ></textarea>
        <Button
          className={styles.closeBtn}
          onClick={() => {
            saveNote(openedNote);
            closeEditor();
          }}
        >
          <IoCloseOutline />
        </Button>
      </div>
    </CSSTransition>
  );
}
