import { useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { IoCloseOutline } from "react-icons/io5";
import { Button } from "@components/Button/Button.jsx";
import styles from "./NoteEditor.module.scss";

export function NoteEditor({ note, isOpen, closeEditor, closeNote, saveNote }) {
  const [value, setValue] = useState("");
  const editorRef = useRef(null);

  useEffect(() => {
    if (note) setValue(note.body);
  }, [note]);

  useEffect(() => {
    if (note) saveNote({ ...note, body: value });
  }, [value]);

  return (
    <CSSTransition
      nodeRef={editorRef}
      in={isOpen}
      timeout={1000}
      classNames={{
        enter: styles.noteEditorEnter,
        enterActive: styles.noteEditorEnterActive,
        enterDone: styles.noteEditorEnterDone,
        exit: styles.noteEditorExit,
        exitActive: styles.noteEditorExitActive,
        exitDone: styles.noteEditorExitDone,
      }}
      // unmountOnExit
      onExited={() => {
        closeNote();
      }}
    >
      <div ref={editorRef} className={styles.noteEditor}>
        <h2>
          {note?.id} {note?.title}
        </h2>
        <textarea
          value={value}
          placeholder="Take a note"
          onChange={(event) => setValue(event.target.value)}
        ></textarea>
        <Button
          className={styles.closeBtn}
          onClick={() => {
            closeEditor(false);
          }}
        >
          <IoCloseOutline />
        </Button>
      </div>
    </CSSTransition>
  );
}
