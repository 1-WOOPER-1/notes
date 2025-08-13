import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Button } from "../Button/Button";
import styles from "./NoteEditor.module.scss";

export function NoteEditor({ note, closeNote, saveNote }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(note.body);
  }, [note.body]);

  useEffect(() => {
    saveNote({ ...note, body: value });
  }, [value]);

  return (
    <div className={styles.noteEditor}>
      <h2>
        {note.id} {note.title}
      </h2>
      <textarea
        value={value}
        placeholder="Take a note"
        onChange={(event) => setValue(event.target.value)}
      ></textarea>
      <Button
        className={styles.closeBtn}
        onClick={() => {
          closeNote();
        }}
      >
        <IoCloseOutline />
      </Button>
    </div>
  );
}
