import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineUnarchive } from "react-icons/md";
import { RiPushpin2Fill, RiPushpin2Line } from "react-icons/ri";
import { Button } from "../Button/Button.jsx";
import styles from "./NoteCard.module.scss";

export function NoteCard({ note, openNote, pinNote, deleteNote }) {
  return (
    <div className={styles.noteCard} onClick={() => openNote(note)}>
      <h2>{note.title}</h2>
      <p>{note.body}</p>
      <div className={styles.noteCardToolbar}>
        <Button note={note} onClick={deleteNote}>
          <FaRegTrashAlt style={{ fontSize: "1rem" }} />
        </Button>
        <Button>
          <MdOutlineUnarchive />
        </Button>
        <Button note={note} onClick={pinNote}>
          {note.isPinned ? <RiPushpin2Fill /> : <RiPushpin2Line />}
        </Button>
      </div>
    </div>
  );
}
